const chatServer = (io) => {

    console.log("Chat Server Started!");
 
    io.on('connection', function(socket){
        console.log(`a user connected with id ${socket.conn.id}`);
        
        // Receive the message
        socket.on('FreackMessage', data => {
            console.log(data)
            console.log("siuuuuu");
            socket.broadcast.emit('FreackMessage',data);
        });
        
        socket.on('messageto', data => {
            console.log(data)
            console.log("-------------------------")
            console.log("siuuuuu");
            socket.broadcast.emit(data.idbueno, data);
            socket.emit(data.me._id, data)
        });
        
    });
 
 };
 
 module.exports = chatServer;