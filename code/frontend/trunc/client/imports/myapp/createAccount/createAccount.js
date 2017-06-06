
import './createAccount.html';
import { Session } from 'meteor/session'

// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: './sccuss.js',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: 'http://tw.yahoo.com'
};
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);


Template.body.events({
    'click #btnVerify' (event, instance){
        sendverfiedEmail();
    },
    'click #btnUserProfile' (event, instance){
        createAccount();
    },
    'click #btnLoginGoogle' (event, instance){
        loginGoogle();
    },
    'click #btnCreateUserProfile' (event, instance){
        
        firebase.auth().currentUser.getToken(/* forceRefresh */ true)
        .then(function(idToken) {
            console.log("get Token.");
            var obj = {
                token : idToken
            };

            Meteor.call('https://us-central1-ezteacher-ed8dc.cloudfunctions.net/createUserProfile', obj, function(err, response){
            //Meteor.call('createUserProfile', obj, function(err, response){
                console.log('client call createUserProfile');
                console.log(response);
            });

        }).catch(function(error) {
            console.log("getToken error : " , error);
        });
        
    }
});

firebase.auth().onAuthStateChanged(userObj => {
    console.log("onAuthStateChanged");

    if(userObj.emailVerified){
        console.log("Email is verified : " + userObj.emailVerified);
    }

    if(userObj){
        console.log("is login")
        //createAccount();
        
        sendverfiedEmail();
        
    }else{
        console.log("not login.");
    }
        
});

function sendverfiedEmail(){
    var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function() {
            // Email send.
            console.log("Email send");
            //createAccount();
        }, function(error) {
            // An error happened.
            console.log("sent email error :" + error);
        });
}

function createAccount(){
    console.log("使用者資料填寫");
    
    var objData = {
        ID : "A123456789",
        IDphoto : "id photo url",
        name : "firebase.user.name",
        personalPhoto : "http://www.google.com",
        appsource : "1", //1:學生, 2:老師
        gender : "1",
        bath : "2017/06/05",
        phone : "0912345678",
        email : "email@gmail.com",
        learnlocal : "台北市",
        habbit : "英文",
        creaditcard : "1234432112344321",
        status : "Y",
        createdate : "2017/06/05",
        lastmodydate : "2017/06/05",
        bankcode : "822",
        bankaccount : "123123",
        bankphoto : "photo url",
        expertise : "專長",
        introduction : "自我介紹",
        experience : "經驗",
        teacherclassroomaddress : "老師教室詳細地址",
        facetofacelocation : "指定可以面對面上課的縣市區域",
        ad : "true",
        verify : "pass",
        pumpingout : "20%"
    };
    var database = firebase.database().ref("/users/" + objData.ID);

    var user = firebase.auth().currentUser.getToken(true).then(function(idToken) {

        database.set(objData);
        
    });


}

function loginGoogle(){
    debugger;
    var provider = new firebase.auth.GoogleAuthProvider(); 
        firebase.auth().signInWithPopup(provider).then(function(result) {  
          var token         = result.credential.accessToken;      
          var user          = result.user;      // 使用者資訊

          console.log("token : ", token);
          console.log("user :", user);
          
        }).catch(function(error) {
          // 處理錯誤
          var errorCode     = error.code;
          var errorMessage  = error.message;     
          var email         = error.email;      // 使用者所使用的 Email
          var credential    = error.credential;      
          console.log("error :", errorMessage)
        });       
}

function signCheck(){
    var user = firebase.auth().currentUser;
    if (user) {
        return true;
    } else {
        return false;
    }
}