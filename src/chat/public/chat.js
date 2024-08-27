$(function() {
    var socket = io.connect("https://api.qiwi.loc:3001");

    var message = $("#message");
    var username = $("#username");
    var send_message = $("#send_message");
    var send_username = $("#send_username");
    var chatroom = $("#chatroom");
    var feedback = $("#feedback");
    var auth = $("#auth");
    var register = $("#register");

    send_message.click(() => {
        socket.emit("new_message", {
            message: message.val(),
            className: alertClass
        });
    });
    auth.click(()=>{
        socket.emit("auth",{
            username: $("#username").val(),
            password: $("#password").val()
        })
    })
    register.click(()=>{
        socket.emit("register",{
            username: $("#username").val(),
            password: $("#password").val()
        })
    })
    var min = 1;
    var max = 6;
    var random = Math.floor(Math.random() * (max - min)) + min;
    function getCookie() {
        return document.cookie.split('; ').reduce((acc, item) => {
            const [name, value] = item.split('=')
            acc[name] = value
            return acc
        }, {})
    }

    const cookie = getCookie()

    // Устаналиваем класс в переменную в зависимости от случайного числа
    // Эти классы взяты из Bootstrap стилей
    var alertClass;
    switch (random) {
        case 1:
            alertClass = "secondary";
            break;
        case 2:
            alertClass = "danger";
            break;
        case 3:
            alertClass = "success";
            break;
        case 4:
            alertClass = "warning";
            break;
        case 5:
            alertClass = "info";
            break;
        case 6:
            alertClass = "light";
            break;
    }

    socket.on("add_mess", data => {
        feedback.html("");
        message.val("");
        chatroom.append(
            "<div class='alert alert-" +
            data.className +
            "'<b>" +
            data.username +
            "</b>: " +
            data.message +
            "</div>"
        );
    });

    send_username.click(() => {
        socket.emit("change_username", { username: username.val() });
    });

    message.bind("keypress", () => {
        socket.emit("typing");
    });

    socket.on("typing", data => {
        feedback.html(
            "<p><i>" + data.username + " печатает сообщение..." + "</i></p>"
        );
    });
    socket.on('eventClient', function (data) {
        console.log(data);
    });
    socket.on('eventClientAlert', function (data) {
        feedback.html(alert(data));
    });
    socket.emit('eventServer', { data: 'Hello Server' });
    socket.on("adminRedirect",function () {
        window.location.href = "/admin";
    })
});