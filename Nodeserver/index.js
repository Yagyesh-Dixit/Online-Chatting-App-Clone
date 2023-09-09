
// Node server which will handle socket io connections
const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
    }
});

const user = {};

// socket.io instance which will listen to many connections
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        // console.log("New user joined:", name);
        // Store user information in the 'user' object with socket ID as the key
        user[socket.id] = name;
        
        // Emit the 'user-joined' event to inform other users about the new user
        io.emit('user-joined', name); // Use 'io.emit' to send to all connected clients
    });

    // If 'send' event is received, broadcast the message to all other users
    socket.on('send', message => {
        // Use 'io.emit' to broadcast to all connected clients
        io.emit('receive', {message: message, name: user[socket.id] });
    });
    socket.on('disconnect', message => {
        // Use 'io.emit' to broadcast to all connected clients
        io.emit('leave', user[socket.id]);
    });
});