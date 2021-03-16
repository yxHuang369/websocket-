
var ws = require('nodejs-websocket');
var port = 3000
let count = 0
var server = ws.createServer(function (conn) {
    //受到连接触发//
    //在服务端cmd安装npm install nodejs-websocket//
    count++
    conn.userName = `用户${count}`
    boardcast(`${conn.userName}进入了聊天室`) // 广播消息 //
    console.log('new connection');
    conn.on("text", data => {
        // 收到信息触发     接收 //
        console.log("received" + data)
        // conn.send(data) // 发送 数据 //
        boardcast(data) // 广播消息 //

    })
    conn.on("close", function (code, reason) {
        // 断开连接触发 //
        console.log("connection closed")
        boardcast(`${conn.userName}离开了聊天室`) // 广播消息 //
    })
    conn.on("error", function (err) {
        // 出错触发 //
        console.log("header err")
        console.log(err)
    })
    function boardcast(msg) {  // 广播 //
        // server.connections  保存每个连接进来的用户 //
        server.connections.forEach(item => {   //  .forEach 是调用数组里每个元素  //
            // conn.sendText(str)
            item.send(msg)
        })
    }
}).listen(port)
console.log("websocket server listen port is" + port)