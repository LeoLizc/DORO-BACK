//import database handlers
const {registerMessage, getMessagesBetweenUsers} = require('./databaseHandlers');

module.exports = function(io, sender){
    // let username = sender.handshake.query.username;

    // creating handling functions
    const onMessage = async (message, to) => {
        console.log('message',message, to);
        let receiver = io.directory[to];
        if (receiver) {
            receiver.emit('message', message, sender.userId);
            // sender.emit('received', {user: to});
        }else{
            console.log(`${to} is not online`);
        };
        
        registerMessage(message, sender.userId, to);

    };

    onAskForMessages = async (to, saveMessages) => {
        console.log('ask for messages from', sender.userId, to);
        getMessagesBetweenUsers(sender.userId, to, saveMessages)
        console.log('save Messages', saveMessages);
        // saveMessages(['nok']);
    };

    // const onMessage = (mensaje) => {
    //     console.log('message', mensaje);
    //     sender.broadcast.emit('message', mensaje);
    // };

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
    sender.on('askForMessages', onAskForMessages);
    // sender.on('writing', onWriting);
    // sender.on('stopWriting', onStopWriting);
    // sender.on('readMessage', onReadMessage);
};