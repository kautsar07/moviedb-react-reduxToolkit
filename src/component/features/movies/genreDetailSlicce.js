import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  genres: [],
  loading: false,
};

export const loadGenreDteatail = createAsyncThunk("movies/loadGenreDteatail", async (genre=false) => {
  try {
    const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=6b4cec3e77943cdafbcaaaead5f55c14&query=${genre}`
    );
    return res.data.results;
  } catch (error) {
    console.error(error);
  }
});
export const postSlice = createSlice({
  name: "genredetail",
  initialState,
  reducers: {},
  extraReducers: {
    [loadGenreDteatail.pending]: (state) => {
      state.loading = true;
    },
    [loadGenreDteatail.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.genres = payload;
    },
    [loadGenreDteatail.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default postSlice.reducer;
