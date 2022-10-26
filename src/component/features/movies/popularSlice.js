import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  popular: [],
  loadr: false,
};

export const loadPopular = createAsyncThunk("movies/loadPopular", async () => {
  try {
    const gen = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=6b4cec3e77943cdafbcaaaead5f55c14`
    );
    return gen.data.results;
  } catch (error) {
    console.error(error);
  }
});
export const postSlice = createSlice({
  name: "populars",
  initialState,
  reducers: {},
  extraReducers: {
    [loadPopular.pending]: (state) => {
      state.loading = true;
    },
    [loadPopular.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.popular = payload;
    },
    [loadPopular.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default postSlice.reducer;
