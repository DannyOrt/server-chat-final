const { createServer } = require('http')
const { Server } = require('socket.io')

const server = createServer((req, res) => {
  // se instancia el servidor
})

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
// se escucha el evento connection
  console.log('a user connected', socket.id);

  // crear una sala de chat
    socket.on('join', (room) => {
      // se escucha el evento join
      console.log(`user ${socket.id} joined ${room}`);
      socket.join(room);
    }); 

    // enviar un mensaje a una sala de chat
    socket.on('message', (room, msg) => {
      // se escucha el evento message
      io.to(room).emit('message', msg); // se emite el evento message
      console.log('message:', msg);
      console.log('room:', room);
    });


  socket.on('disconnect', () => {
    // se escucha el evento disconnect
    console.log('user disconnected');
  });
})

//obtener el puerto del entorno, de lo contrario, use 3001
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    // se inicia el servidor
    console.log(`listening on *: ${PORT}`);
});
