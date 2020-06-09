const admin = require('firebase-admin');
const telegram = require('telegram-bot-api');
const serviceAccount = require('./serviceAccountKey.json');
const key = require('./keys')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: key.URL
});

const db = admin.firestore();

const ADD_USER_MSG_PREFIX = "/add_user";

const api = new telegram({
          token: key.TOKEN,
          updates: {
        	enabled: true
            }
  });

api.on('message', (message) => {
    
    const chat_id = message.chat.id;
    const chat_text = message.text;

    if (!chat_text.startsWith(ADD_USER_MSG_PREFIX)) {
        api.sendMessage({
            chat_id: chat_id,
            text: chat_text === '/start' ? 'type command /add_user email@gmail.com' : 'Write /start correct'
        })
        .catch(function(err)
        {
            console.log(err);
        });
    }    
});

api.on('message', (message) => {
    if (message.text.startsWith(ADD_USER_MSG_PREFIX)) {

        const [,email] = message.text.split(' ');

        db.collection('users').where('email', '==', email).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    const docRef = db.collection('users').doc(doc.id);
                    docRef.update({tg: message.chat.id})
                });
            })
            .catch((err) => {
                console.log('Error getting documents', err);
            });
                }
})

const users = db.collection('users')
users.onSnapshot(querySnapshot => { let changes = querySnapshot.docChanges(); 
    for (let change of changes) {
        const user = change._document._fieldsProto;
        const tgId = user.tg && user.tg.integerValue;
        const userName = user.name && user.name.stringValue;
        
        if (change.type === 'modified' && tgId) {
            api.sendMessage({
                chat_id: tgId,
                text: `${userName || 'User'} your profile is updated !`
            })
        } 
    } 
});
