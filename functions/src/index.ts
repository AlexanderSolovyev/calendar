import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp(functions.config().firebase);

exports.newSpilNotification = functions.firestore
    .document('events/{eventId}')
    .onCreate(async e => {
        const topic = "note"
        const message = {
            notification: {
                title: 'ЛАВЭ ПОПЕРЛО!',
                body: `У нас есть новый спил!`
            },
                topic: topic
        }

        return admin.messaging().send(message)
            .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
            })
            .catch((error) => {
            console.log('Error sending message:', error);
            });
    });