
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')

socket.on('chat-message', data => {
  console.log(data)
})