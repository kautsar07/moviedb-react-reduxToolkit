import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loginGoogle:[],
  loading: false,
};

export const loadLoginGoogle = createAsyncThunk("movies/loadLoginGoogle", async (credential) => {
    localStorage.setItem("token", JSON.stringify(credential.credential));
    localStorage.setItem("user", JSON.stringify({ first_name: "Google User" }));
    setTimeout(function () {
      window.location.reload(1);
    }, 1500);
});

export const postSlice = createSlice(
  {
    name: "logins",
    initialState,
    reducers: {},
    extraReducers: {
      [loadLoginGoogle.pending]: (state) => {
        state.loading = true;
      },
      [loadLoginGoogle.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.loginGoogle = payload;
      },
      [loadLoginGoogle.rejected]: (state) => {
        state.loading = false;
      },
    },
  }
);

export default postSlice.reducer;
