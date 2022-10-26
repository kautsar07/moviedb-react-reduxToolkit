import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  search: [],
  loadr: false,
};

export const loadSearch = createAsyncThunk("movies/loadSearch", async (name = false) => {
  try {
    const srch = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=6b4cec3e77943cdafbcaaaead5f55c14&query=${name}`
    );
    return srch.data.results;
  } catch (error) {
    console.error(error);
  }
});
export const postSlice = createSlice({
  name: "searchs",
  initialState,
  reducers: {},
  extraReducers: {
    [loadSearch.pending]: (state) => {
      state.loading = true;
    },
    [loadSearch.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.search = payload;
    },
    [loadSearch.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default postSlice.reducer;
