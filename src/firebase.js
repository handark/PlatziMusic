import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyDL788U_I2qujuMMXkT7rqOHHJcZMmQLhU",
    authDomain: "platzimusic-2729e.firebaseapp.com",
    databaseURL: "https://platzimusic-2729e.firebaseio.com",
    projectId: "platzimusic-2729e",
    storageBucket: "",
    messagingSenderId: "106256692260"
};

firebase.initializeApp(config);

export const firebaseAut = firebase.auth()

export default firebase