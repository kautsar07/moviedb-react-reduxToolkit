import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const initialState = {
  register: [],
  loginGoogle: [],
  login: [],
  loading: false,
};
export { auth };

//REGISTER

export const registerWithEmailAndPassword = createAsyncThunk(
  "movies/loadRegister",
  async (values) => {
    console.log(values);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      await updateProfile(auth.currentUser, { displayName: values.name }).catch(
        (err) => console.log(err)
      );
      const user = res.user;
      localStorage.setItem("token", JSON.stringify(user.accessToken));
      localStorage.setItem("user", JSON.stringify(user));
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: values.name,
        authProvider: "local",
        email: values.email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    setTimeout(function () {
      window.location.reload(1);
    }, 500);
  }
);

//LOGIN GOOGLE

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = createAsyncThunk(
  "movies/loadGoogleLogin",
  async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      console.log(user);
      localStorage.setItem("token", JSON.stringify(user.accessToken));
      localStorage.setItem("user", JSON.stringify(user));
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    setTimeout(function () {
      window.location.reload(1);
    }, 500);
  }
);

//LOGIN

export const logInWithEmailAndPassword = createAsyncThunk(
  "movies/login",
  async (value) => {
    console.log(value);
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      const user = res.user;
      console.log(user);
      localStorage.setItem("token", JSON.stringify(user.accessToken));
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    setTimeout(function () {
      window.location.reload(1);
    }, 500);
  }
);
export const postSlice = createSlice(
  {
    name: "registers",
    initialState,
    reducers: {},
    extraReducers: {
      [registerWithEmailAndPassword.pending]: (state) => {
        state.loading = true;
      },
      [registerWithEmailAndPassword.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.register = payload;
      },
      [registerWithEmailAndPassword.rejected]: (state) => {
        state.loading = false;
      },
    },
  },
  {
    name: "loginGoogle",
    initialState,
    reducers: {},
    extraReducers: {
      [signInWithGoogle.pending]: (state) => {
        state.loading = true;
      },
      [signInWithGoogle.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.loginGoole = payload;
      },
      [signInWithGoogle.rejected]: (state) => {
        state.loading = false;
      },
    },
  },
  {
    name: "login",
    initialState,
    reducers: {},
    extraReducers: {
      [logInWithEmailAndPassword.pending]: (state) => {
        state.loading = true;
      },
      [logInWithEmailAndPassword.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.login = payload;
      },
      [logInWithEmailAndPassword.rejected]: (state) => {
        state.loading = false;
      },
    },
  }
);

export default postSlice.reducer;
