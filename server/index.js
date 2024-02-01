/* 
  服务
*/
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://127.0.0.1:5174',
  }
});

const PORT = 9170

// 用户列表，会广播给所有人
let userList = []

/* 
  client.emit 发送
  client.on 接收

  io.client.emit 发送所有client
  client.broadcast.emit 给其他client发送
*/
io.on('connection', client => {
  /** 上线 */
  client.on('login', data => {
    // 触发进入详情页的事件
    client.emit('success', data)
    // 广播给其他用户 已上线
    client.broadcast.emit("join", data);
    userList.push(data.user)
    io.emit('userChange', userList)
  });

  /** 刷新后退出 */
  client.on('reload', data => {
    // 触发离开详情页的事件
    client.emit('error', data)
    // 广播给其他用户 已离线
    client.broadcast.emit("leave", data);
    userList = userList.filter(item => item !== data.user)
    io.emit('userChange', userList)
  })

  client.on('disconnect', data => {
    // // 触发离开详情页的事件
    // client.emit('error', data)
    // // 广播给其他用户 已离线
    // client.broadcast.emit("leave", data);
    // userList = userList.filter(item => item.user !== data.user)
    // io.emit('userChange', userList)
    userList = []
  });


});

server.listen(PORT);

console.log('server listen at: ' + `ws://localhost:${PORT}`)