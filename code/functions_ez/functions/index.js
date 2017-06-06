// Import the Firebase SDK for Google Cloud Functions.
const functions = require('firebase-functions');
// Import and initialize the Firebase Admin SDK.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.userObj = functions.database.ref('/users/')
.onWrite(event => {
    var objData = {
        ID : "A123456789",
        IDphoto : "id photo url",
        name : "firebase.user.name",
        personalPhoto : "http://www.google.com",
        profile : "profile"
        // appsource : "1", //1:學生, 2:老師
        // gender : "1",
        // bath : "2017/06/05",
        // phone : "0912345678",
        // email : "email@gmail.com",
        // learnlocal : "台北市",
        // habbit : "英文",
        // creaditcard : "1234432112344321",
        // status : "Y",
        // createdate : "2017/06/05",
        // lastmodydate : "2017/06/05",
        // bankcode : "822",
        // bankaccount : "123123",
        // bankphoto : "photo url",
        // expertise : "專長",
        // introduction : "自我介紹",
        // experience : "經驗",
        // teacherclassroomaddress : "老師教室詳細地址",
        // facetofacelocation : "指定可以面對面上課的縣市區域",
        // ad : "true",
        // verify : "pass",
        // pumpingout : "20%"
    };

    
    var database = admin.database.ref();

    console.log("DB : ", database);
});

exports.createUserObj = functions.auth.user().onCreate(event => {

    console.log("使用者 onCreate : " , event);

    var user = event.data;
    console.log("user : ", user);
    console.log("email : " + user.email);
    console.log("name : " + user.displayName);

   

    // var database = firebase.database().ref("/users/" + objData.ID);
        
    // user.updateProfile({
    //     displayName: "Weihao"
    //     }).then(function() {
    //         console.log("Update successful.");
    //     }, function(error) {
    //         console.log("error : ", error);
    // });

    //database.set(objData);

    console.log("Done.");
});

exports.createUserProfile = functions.https.onRequest((request, response) => {
    console.log("request : ", request);
    //createUser(request);
    response.send("createUserProfile");
});


function createUser(model){
    console.log("token : ", model.token);

    admin.auth().verifyIdToken(model.token)
      .then(function(decodedToken) {
        var uid = decodedToken.uid;
        console.log("uid : ", uid);
        var ref = admin.database().ref('/functionsWrite/a');
        var obj = {someAttribute: false};
        ref.push(obj); 

        console.log("server Write done.");

      }).catch(function(error) {
        // Handle error
        console.log("verifyIdToken Error : ", error);
      });

}


