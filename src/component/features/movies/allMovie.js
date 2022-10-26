import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  entities:[],
  loadr: false,
};

export const loadAll = createAsyncThunk("movies/loadAll", async () => {
  try {
    const rate = await axios.get(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
    );
    return rate.data.results;
  } catch (error) {
    console.error(error);
  }
});

export const postSlice = createSlice(
  {
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: {
      [loadAll.pending]: (state) => {
        state.loading = true;
      },
      [loadAll.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.entities = payload;
      },
      [loadAll.rejected]: (state) => {
        state.loading = false;
      },
    },
  }
);

export default postSlice.reducer;
