const functions = require('firebase-functions');
const cust = require('cust');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});


exports.createAccount = cust.https.onRequest((request, response) => {
    sendCreateAccount();
});

