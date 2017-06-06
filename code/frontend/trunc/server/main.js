import { Meteor } from 'meteor/meteor';


Meteor.startup(() => {
  // code to run on server at startup
  console.log("code to run on server at startup");

  Meteor.methods({
    createUserProfile: function(request){
      console.log("on server , createUserProfile casll");
      console.log("client obj : ", request);
      createUser(request);
      return "server ok.";
    }
  });

});

var admin = require("firebase-admin");
var serviceAccount = {
  "type": "service_account",
  "project_id": "ezteacher-ed8dc",
  "private_key_id": "13f55ff58b83ae60b41a9fad8cdfc6b0439d54ae",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDNLMBM5eVPESU3\nSmePyPYaq2d/63qt3xX8VKRre1XstYlcXnhOOnSFQA2saoP0PpO61yUGc1T1Ggu2\nwX78nVs2J7Vg4VRZz+pF5F6o55c0nzFg14DFqw8pmlX6xdvUDOpVbfxvgX0xFguw\n3ePegY9mnbJYWjB4+rBGi5MvUpwuc4k75mL3+V6rcmcXIYKVR71NbUt3I+ZN8Jtu\noNCTWn/2YzfiiO97kCnjQHBvgsOV8w9nYA8jvgnEOkya0GI6o4Kt6FyOg1FRZnnw\nZcEzxEOueiZTT4rAiW+Yf6mmN9pkT81RaxSVb5c6z+xzsEFtQtlLbR1PtHM1s48n\nBV2+y6AfAgMBAAECggEAF3Kbe25JLtMKdMTSYbKZZYzceYMDdHwVOs7AMkRYb9fY\nndocrPFYlaMvV4VIv+X9jhG+T9FoY9EZMPFGE5U2x6acFOP2IYQgWuJxavjPOpqi\n0wAYiFPh72Li8T4haZzG6a0gd0HOI95IHGtkpO4bjEz4r8jcLJyW/p4+24lOWK8e\nbQlESDqf4f8kaJ49kx/1+ISyDrYkp2MVsHRPy6K8R4bj98Mj/69lnbkwbqh5sZX6\ncwRbOksPM07Q4r/Z2zBL+MwOUDqHfzzOYlj1Zftdm6kYC815H3VGx/lVh88QUMuu\ndKRK3hhUQyuv2Ss0KdjKwQyVZToz3fzBWYE9CFtd2QKBgQDr75h3XNIEXlvHkrUj\nuz3Knf6gFxErAyRUVxLedriz6lGmYbSp7t9E2khHh9t4/Mfl2ii/lj+xJB+88jWt\nMSbi25N7EWQKlSoEOd3e34FSqB07+H2qlKSoKthhA2S3IgBNpgrCTKSVl3UOKNbK\nphq86+qR2OvRxithQh8KilxodQKBgQDen3nR5ZcqG7g23XDuxeNmjUwmerFfjnvw\nkBvatiEq6WGOc0RqGCr0PcAn0PvOvN060Bo3ABc35vWPV9J69pGDswV26nWXXQ5d\nBKH73SxuPP5TUKOb+94vdwmpGYZC/qImWE27jubW/37nvhTQCF/cgbaHhz/n2i0o\nG9d71h3zwwKBgE+TSAE6NTtz99CgEqgyhuzHzRGBtjCjpqUrmRmfQTytU0yit6R5\nBKTcWnSFxehQmbtUkVnM+z5ryKiZqLD5Wvw4ws1HWE6ZcMpsGgEJsTyHpxSLAxd9\neuudR82wr091EFUgI5DU+M3bf4d/DrLawznk+ACpASCHjioHeyC6+d/hAoGBAKiF\nPCghjf54IUiW9EgrUGpvB3gRZHebWkLOM+ep+w2KwSieJOnTBaEBpZX+Yr8qxKUi\nptV/ohPVJ4msx04BnEF/oOFVtlIwRREw0pXf5SRF05ep8U/Ap35ys8Nn6PSJ4KD6\nM02JbUDPA3fVsdeQn1BCeLO7NCsEQy6bdNDvUpkVAoGBAKlJaLcmFcWsEMUOQgVs\nmWzgV/d/hMBrl+zVNBdHwyzrpCHuGcyE8HY/mD8v5rfnn185cCy3h+41PHGRxI59\nBL0FEPblt+4X7+j7k9G52BPEleLOPHLORGEtGT4eAwXPTM0zOKgnsj3NO2paqBep\n/Fc+1gnx2s8FqrOV20xASjUw\n-----END PRIVATE KEY-----\n",
  "client_email": "ezteacher-ed8dc@appspot.gserviceaccount.com",
  "client_id": "102959176799492926920",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/ezteacher-ed8dc%40appspot.gserviceaccount.com"
};

var firebase = require("firebase");
var config = {
              apiKey: "AIzaSyBTsdUnTG2iVdDna_VmIR6HScmRfkQGvso",
              authDomain: "ezteacher-ed8dc.firebaseapp.com",
              databaseURL: "https://ezteacher-ed8dc.firebaseio.com",
              projectId: "ezteacher-ed8dc",
              storageBucket: "ezteacher-ed8dc.appspot.com",
              messagingSenderId: "37631175318"
          };
firebase.initializeApp(config);

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ezteacher-ed8dc.firebaseio.com"
});

function createUser(model){
    
    admin.auth().verifyIdToken(model.token)
      .then(function(decodedToken) {
        var uid = decodedToken.uid;
        console.log("uid : ", uid);
        var ref = admin.database().ref('/serverWrite/a');
        var obj = {someAttribute: false};
        ref.push(obj); 

        console.log("server Write done.");

      }).catch(function(error) {
        // Handle error
      });

      var auth = firebase.auth();
      // auth.signInWithEmailAndPassword("back123@gmail.com", "password").catch(error => {
      //             // Handle Errors here.
      //             var errorCode = error.code;
      //             var errorMsg = error.message;
      //             console.log("errorMsg : " + errorMsg);
      //         });
      console.log("onAuthStateChanged init");

      var user = firebase.auth().currentUser;

      console.log("user : ", user);

      if(user){
        console.log("// User is signed in.");
      }else{
        console.log(" // No user is signed in.");
      }

      auth.onAuthStateChanged(userObj => {
        console.log("auth... ", userObj);
        if(userObj){
            console.log("user data :" + userObj);    
            console.log("sign In");

            var ref = firebase.database().ref('/local2/start');
            var obj = {someAttribute: false};
            ref.push(obj);   // Creates a new ref with a new "push key"

            //auth.signOut();
            //
        }else{
            console.log("user not login");
        }
      });
}