

const io = require('socket.io')(3001, {
  cors: {
    origin: ["http://localhost:8000"]
  }
})

io.on('connection', socket => {
  socket.emit('chat-message', 'Hello World')
})

// console.log('hi')