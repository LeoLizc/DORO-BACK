module.exports = function(io, sender){
    let username = sender.handshake.query.username;

    // creating handling functions
    // const onMessage = ({message, to}) => {
    //     console.log(message);
    //     let receiver = io.sockets.sockets[io.directory[to]];
    //     if (receiver) {
    //         receiver.emit('message', {
    //             from: username,
    //             message,
    //         });
    //         sender.emit('received', {user: to});
    //     }else{
    //         console.log(`${to} is not online`);
    //     };
        
    // };

    const onMessage = ([mensaje]) => {
        sender.broadcast.emit('message', [mensaje]);
    };

    // const onWriting = ({to}) => {
    //     console.log(username, 'is writing');
    //     let receiver = io.sockets.sockets[io.directory[to]];
    //     if (receiver) {
    //         receiver.emit('writing', {
    //             from: username,
    //         });
    //     }else{
    //         console.log(`${to} is not online`);
    //     };
    // };

    // const onStopWriting = ({to}) => {
    //     console.log(username, 'is stop writing');
    //     let receiver = io.sockets.sockets[io.directory[to]];
    //     if (receiver) {
    //         receiver.emit('stopWriting', {
    //             from: username,
    //         });
    //     }else{
    //         console.log(`${to} is not online`);
    //     };
    // };

    // const onReadMessage = ({to}) => {
    //     console.log(username, 'read a message from', to);
    //     let receiver = io.sockets.sockets[io.directory[to]];
    //     if (receiver) {
    //         receiver.emit('readMessage', {
    //             from: username,
    //         });
    //     }else{
    //         console.log(`${to} is not online`);
    //     };
    // };


    // setting up sender socket events
    sender.on('message', onMessage);
    // sender.on('writing', onWriting);
    // sender.on('stopWriting', onStopWriting);
    // sender.on('readMessage', onReadMessage);
};