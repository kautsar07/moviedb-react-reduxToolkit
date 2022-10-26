import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  entities: [],
  loadr: false,
};

export const loadGenre = createAsyncThunk("movies/loadGenre", async () => {
  try {
    const gen = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
    );
    return gen.data.genres;
  } catch (error) {
    console.error(error);
  }
});
export const postSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: {
    [loadGenre.pending]: (state) => {
      state.loading = true;
    },
    [loadGenre.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.entities = payload;
    },
    [loadGenre.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default postSlice.reducer;
