import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  login:[],
  loading: false,
};

export const loadLogin = createAsyncThunk("movies/loadLogin", async (value) => {
    try {
        const res = await axios.post(
          "https://notflixtv.herokuapp.com/api/v1/users/login",
          value
        );
        localStorage.setItem("user", JSON.stringify(res.data.data));
        localStorage.setItem("token", JSON.stringify(res.data.data.token));
      } catch (error) {}
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
      [loadLogin.pending]: (state) => {
        state.loading = true;
      },
      [loadLogin.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.login = payload;
      },
      [loadLogin.rejected]: (state) => {
        state.loading = false;
      },
    },
  }
);

export default postSlice.reducer;
