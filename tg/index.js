const admin = require('firebase-admin');
const telegram = require('telegram-bot-api');
const util = require('util');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
});

const db = admin.database()

const ref = db.ref('users');

ref.on('value', function(snapshot) {
   
    snapshot.forEach(function(childSnapshot) {

        let data = childSnapshot.val()

        console.log(data)
    })
    });

const api = new telegram({
          token: '',
          updates: {
        	enabled: true
            }
  });

api.on('message', (message) => {
    console.log(message);
    console.log(message.chat.id);
    console.log(message.text); 
    
    const chat_id = message.chat.id;
    const chat_text = message.text;

    api.sendMessage({
        chat_id: chat_id,
        text: chat_text === '/start' ? 'Write your e-mail' : 'Write /start correct'
    })
    .then(data => {
        console.log(message.text);
        console.log(util.inspect(data, false, null));
        const email = message.text;

        if(email == ref) {
            ref.child(email).set({'tg': chat_id})
            console.log(true)
        }
    })
    .catch(function(err)
    {
        console.log(err);
    });
});

