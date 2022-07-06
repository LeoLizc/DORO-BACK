// requiring database
const databaseConnection = require('../databaseConnection');

registerMessage = async (message, senderId, receiverId) => {
    // save message in database if the chat exists, otherwise create a new chat
    databaseConnection.query('SELECT * FROM Chat WHERE (id_user1 = ? AND id_user2 = ?) OR (id_user1 = ? AND id_user2 = ?)', [senderId, receiverId, receiverId, senderId], (err, result) => {
        if (err) {
            console.log('error', err);
        }else{
            if (result.length > 0) {
                // chat exists, so save message in database with chat id
                databaseConnection.query('INSERT INTO mensaje (id_chat, content, id_user) VALUES (?, ?, ?)', [result[0].id_chat, message, senderId], (err, result) => {
                    if (err) {
                        console.log('error', err);
                    }else{
                        console.log('message saved');
                    }
                });
            }else{
                databaseConnection.query('INSERT INTO Chat (id_user1, id_user2) VALUES (?, ?)', [senderId, receiverId], (err, result) => {
                    if (err) {
                        console.log('error', err);
                    }else{
                        let chatId = result.insertId;
                        databaseConnection.query('INSERT INTO mensaje (id_chat, content, id_user) VALUES (?, ?, ?)', [chatId, message, senderId], (err, result) => {
                            if (err) {
                                console.log('error', err);
                            }else{
                                console.log('message saved');
                            }
                        });
                    }
                });
            }
        }
    });
}

getMessagesBetweenUsers = async (senderId, receiverId, callBack=Null) => {
    // get all messages between two users
    databaseConnection.query('SELECT * FROM Chat WHERE (id_user1 = ? AND id_user2 = ?) OR (id_user1 = ? AND id_user2 = ?)', [senderId, receiverId, receiverId, senderId], (err, result) => {
        if (err) {
            console.log('error', err);
            if (callBack != null) {
                callBack(['nok']);
            }
        }else{
            if (result.length > 0) {
                // chat exists, so get all messages from chat
                databaseConnection.query('SELECT * FROM mensaje WHERE id_chat = ?', [result[0].id_chat], (err, result) => {
                    if (err) {
                        console.log('error', err);
                        if (callBack != null) {
                            callBack(['nok']);
                        }
                    }else{
                        //extract content and id_user==sender from result
                        let messages = [];
                        for (let i = 0; i < result.length; i++) {
                            messages.push([
                                result[i].content, 
                                result[i].id_user == senderId
                            ]);
                        }
                        console.log('messages', messages);
                        if (callBack != null) {
                            callBack(['ok',...messages]);
                        }
                    }
                });
            }else{
                console.log('no messages');
                if (callBack != null) {
                    callBack(['nok']);
                }
            }
        }
    });
}
//exporting
module.exports = {registerMessage, getMessagesBetweenUsers};