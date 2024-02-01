/* 
  服务
*/
const cors = require('cors');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(cors())

const PORT = 9170

/* 
  client.emit 发送
  client.on 接收

  io.client.emit 发送所有client
  client.broadcast.emit 给其他client发送
*/
io.on('connection', client => {
  /** 上线 */
  client.on('login', data => { 
    console.log(data)
  });

  client.on('test', data => { 
    console.log(data)
  });

  client.on('disconnect', () => { 
    console.log('退出')
  });
});

server.listen(PORT);

console.log('server listen at: ' + `ws://localhost:${PORT}`)