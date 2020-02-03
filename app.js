const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;

const server = app.listen(port, () => console.log(`Running on port: ${port}`));
const io = require('socket.io')(server);

// app.use(express.static(__dirname + '/'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//Initial Console Output
io.on('connection', (socket) => {
    console.log("User connected");
});

//Listen to user name input event
io.on('connection', (socket) => {
    socket.on('connect', () => {
        io.emit('connect');
    });
});

//Listen to any user disconnection 
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        io.emit('disconnect', "User disconnected");
        console.log('User disconnected');
    });
});

//Message event and console display
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => console.log('message: ' + msg));
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
});