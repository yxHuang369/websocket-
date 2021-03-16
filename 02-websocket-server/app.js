const { connect } = require('http2')
// 1.导入nodejs-websocket包
const ws = require('nodejs-websocket')

const PORT = 3000

// 2.创建一个server
const server = ws.createServer(connect => {
    console.log('有用户连接上来')

    connect.on('text', data => {
        console.log("接受到数据了用户的数据", data)
        connect.send(data)
    })

    connect.on('close', () => {
        console.log("连接断开")
    })

    connect.on('error', () => {
        console.log("用户连接异常");
    })
})
server.listen(PORT, () => {
    console.log("websocket服务启动成功了，监听了端口", PORT)
})
