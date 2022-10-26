import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cast: [],
  loading: false,
};

export const loadCast = createAsyncThunk(
  "movies/loadCast",
  async (id = false) => {
    try {
      const item = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=6b4cec3e77943cdafbcaaaead5f55c14`
      );
      return item.data.cast;
    } catch (error) {
      console.error(error);
    }
  }
);
export const postSlice = createSlice({
  name: "casts",
  initialState,
  reducers: {},
  extraReducers: {
    [loadCast.pending]: (state) => {
      state.loading = true;
    },
    [loadCast.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.cast = payload;
    },
    [loadCast.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export default postSlice.reducer;
