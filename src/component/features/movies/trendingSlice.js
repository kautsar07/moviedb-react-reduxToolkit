import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  trending:[],
  loadr: false,
};

export const loadTren = createAsyncThunk("movies/loadTren", async () => {
  try {
    const rate = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
    );
    return rate.data.results.slice(0,3)
  } catch (error) {
    console.error(error);
  }
});

export const postSlice = createSlice(
  {
    name: "trendings",
    initialState,
    reducers: {},
    extraReducers: {
      [loadTren.pending]: (state) => {
        state.loading = true;
      },
      [loadTren.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.trending = payload;
      },
      [loadTren.rejected]: (state) => {
        state.loading = false;
      },
    },
  }
);

export default postSlice.reducer;
