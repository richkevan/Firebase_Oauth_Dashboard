import { auth } from "../server";
// Client Side
import app from "../client";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Server Functions
const getUser = async (cookie) => {
  try {
    const decodedIdToken = auth.verifySessionCookie(cookie, true)
    const user = await auth.getUser(decodedIdToken.uid);
    return user;
  } catch (error) {
    console.log(error);
  }
};


// Client Functions
const firebaseAuth = getAuth(app);

const signInUser = async (email, password) => {
  try {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    console.log(error);
  }
};

const signOutUser = async () => {
  try {
    await signOut(firebaseAuth);
  } catch (error) {
    console.log(error);
  }
};

const onAuth = () => {
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      console.log("User is signed in", user);
      return user;
    }
    else {
      console.log("User is signed out");
      window.location.href = "/login";
    }
  });
};

const user = firebaseAuth.currentUser;


export {
  getUser,
  user,
  signInUser,
  signOutUser,
  onAuth,
}