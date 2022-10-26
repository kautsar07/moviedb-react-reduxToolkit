import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  register:[],
  loading: false,
};

export const loadRegister = createAsyncThunk("movies/loadRegister", async (value) => {
    try {
        const res = await axios.post(
          "https://notflixtv.herokuapp.com/api/v1/users",
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
      [loadRegister.pending]: (state) => {
        state.loading = true;
      },
      [loadRegister.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.register = payload;
      },
      [loadRegister.rejected]: (state) => {
        state.loading = false;
      },
    },
  }
);

export default postSlice.reducer;
