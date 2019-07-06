import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyAlKD1sebSl5mvT0HgFu2Nsy1GNPRDjCho",
  authDomain: "zist-90c81.firebaseapp.com",
  databaseURL: "https://zist-90c81.firebaseio.com",
  projectId: "zist-90c81",
  storageBucket: "zist-90c81.appspot.com",
  messagingSenderId: "65347563740",
  appId: "1:65347563740:web:cfeb4d4deea7e7c4"
};


export const lists = () => {
  firebase.initializeApp(config);
  return firebase.firestore().collection("lists");
};
