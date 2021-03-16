
var ws = require('nodejs-websocket');
var port = 3000
const TYPE_ENTER = 0
const TYPE_LEAVE = 1
const TYPE_MSG = 2

/*
    分析：
    消息不应该是简单的字符串
    这个消息应该是一个对象
    type：消息的类型 0：表示进入聊天室的消息，1：用户离开聊天室的消息，2：用户正在聊天时
    msg：消息的内容
    time：聊天的具体时间
*/
let count = 0
var server = ws.createServer(function (conn) {
    count++
    conn.userName = `用户${count}`
    // 进入了聊天室
    boardcast({
        type: TYPE_ENTER,
        msg: '进入了聊天室',
        time: new Date().toLocaleTimeString(),
        userName: `${conn.userName}：`
    })
    console.log('new connection');
    conn.on("text", data => {
        console.log("received" + data)
        // 聊天的消息
        boardcast({
            type: TYPE_MSG,
            msg: data,
            time: new Date().toLocaleTimeString(),
            userName: `${conn.userName}：`
        })
    })
    conn.on("close", data => {
        console.log("connection closed")
        // 离开了聊天室
        boardcast({
            type: TYPE_LEAVE,
            msg: '离开了聊天室',
            time: new Date().toLocaleTimeString(),
            userName: `${conn.userName}：`
        })
    })
    conn.on("error", function (err) {
        console.log("header err")
        console.log(err)
    })
    function boardcast(msg) {
        server.connections.forEach(item => {
            item.send(JSON.stringify(msg))
        })
    }
}).listen(port)
console.log("websocket server listen port is" + port)