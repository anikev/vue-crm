import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyDvm0zHJmrewtEFKoDZJscOnNryMBFZB5Q",
    authDomain: "prommarket2019.firebaseapp.com",
    databaseURL: "https://prommarket2019.firebaseio.com",
    projectId: "prommarket2019",
    storageBucket: "prommarket2019.appspot.com",
    messagingSenderId: "744451128412",
    appId: "1:744451128412:web:32a13ac44829a741"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;