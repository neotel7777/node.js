const mysql = require("mysql2");

const connection = mysql.createPool({
    host: "127.0.0.1",
    user: "ilab_qiwi",
    database: "ilab_qiwi",
    password: "11111",
    port: 3310,
    keepAliveInitialDelay: 10000, // 0 by default.
    enableKeepAlive: true, // false by default.
});


module.exports = connection;