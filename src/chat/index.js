const express = require("express");
const https = require('node:https');
const app = express();
const { v4: uuid } = require('uuid');
const DB = require('./database/connect');
const fs = require("fs");
var sessionId = '';
app.set('view engine', 'ejs');
app.set('views', 'src/chat/views');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};
app.use(express.static(__dirname + '/public'));
app.use(express.static("src/chat/public"));

app.get('/', (req, res) => {
    sessionId = req.sessionID;
    let data = {
            title: "chat nodejs test",
            user: "None"
        }
        res.render('index', {data: data});

})
app.get('/login', (req, res) => {

    sessionId = req.cookies.userSid;
    res.render('login');
});
app.get('/register', (req, res) => {
    sessionId = req.cookies.userSid;
    res.render('register',{'title':"Регистрания пользователя"});
    });
app.get('/admin', (req, res) => {
    getCurrentUser(req.cookies.userSid)
        .then(function (row) {
            if(row.length === 0){
                res.redirect('/login');
            } else {
                //console.log(row[0].name);
                res.render('admin', {
                    'title': "CHAT Admin panel",
                    'username': row[0].name,
                    'sid': req.cookies.userSid
                });
            }
        })
        .catch((err) => setImmediate(() => { throw err; }))
});
var server = https.createServer(options, app)
    .listen(3001,'api.qiwi.loc', function (req, res) {
        console.log("Server is running...<a href='http://api.qiwi.loc:3001/'>site</a>");
    });
/*server = app.listen("3001",
    'api.qiwi.loc',
    () => console.log("Server is running...<a href='http://api.qiwi.loc:3001/'>site</a>"));
*/
const io = require("socket.io")(server,{
     allowEIO3: true
});

io.on('connection', (socket,session) => {
    socket.username = "Anonymous";
    socket.sid = getSid();
   // console.log(socket);
    socket.on('change_username', (data) => {
        socket.username = data.username
        console.log(socket);
    });

    socket.on('new_message', (data) => {
        io.sockets.emit('add_mess', {message : data.message, username : socket.username, className:data.className});
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username : socket.username})
    })
    socket.on('eventServer', function (data) {
        console.log(data);
        socket.emit('eventClient', { data: 'Hello Client' });

    });
    socket.on('disconnect', function () {
        console.log('user disconnected'); 
    });
    socket.on('auth', function (data) {
        console.log(socket.sid  + "," + socket.id);
        getUser(data.username,data.password)
            .then(function(row){
                console.log(row.length);
                if(row.length === 0){
                    registerUser(data.username,data.password,socket.sid,socket.id)
                        .then(function(row)
                        {
                            socket.adminname = row.name;
                            socket.emit('adminRedirect');
                        })
                        .catch((err) => setImmediate(() => { throw err; }))
                } else {
                    updateUser(data.username,data.password,socket.sid,socket.id)
                        .then(function(row)
                        {
                            console.log(row);
                            socket.adminname = row.name;
                            socket.emit('adminRedirect');
                        })
                        .catch((err) => setImmediate(() => { throw err; }))
                }
            })
            .catch((err) => setImmediate(() => { throw err; }))
    });
    socket.on('register', function (data) {
        getUser(data.username,data.password)
            .then(function(row){
                console.log(row.length);
                if(row.length === 0){
                    registerUser(data.username,data.password,socket.sid,socket.id)
                        .then(function(row)
                        {
                            socket.adminname = row.name;
                            socket.emit('adminRedirect');
                        })
                        .catch((err) => setImmediate(() => { throw err; }))
                    }
            })
            .catch((err) => setImmediate(() => { throw err; }))
    });
})

function getUser(name,pass){
    return new Promise(function(resolve,reject){
        let query = "select * from chat_managers where name=? and password = ?";
        var data = [name,pass];
        DB.query(query, data, function (err, row, fields) {
            // Call reject on error states,
            // call resolve with results
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    })
}
function getSid(){
 return sessionId;
}
function getCurrentUser(sid){
    return new Promise(function(resolve,reject){
        let query = "select * from chat_managers where sid=?";
        var data = [sid];
        DB.query(query, data, function (err, row, fields) {
            // Call reject on error states,
            // call resolve with results
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    })
}

function registerUser(name,pass,sid,id){
    return new Promise(function(resolve,reject){
        let query = "insert into chat_managers set name=?, password = ?, sid = ?, socketId = ? ";

        var data = [name,pass,sid,id];
        DB.query(query, data, function (err, row, fields) {
            // Call reject on error states,
            // call resolve with results
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    })
}
function updateUser(name,pass,sid,id){
    return new Promise(function(resolve,reject){
        let query = "UPDATE chat_managers set sid = ?, socketId = ? " +
            "where name=? AND password =? ";

        var data = [sid,id,name,pass];
        DB.query(query, data, function (err, row, fields) {
            // Call reject on error states,
            // call resolve with results
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    })
}