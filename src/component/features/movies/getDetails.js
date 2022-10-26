import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  popular: [],
  loadr: false,
};

export const loadDetails = createAsyncThunk("movies/loadDetails", async (id=false) => {
  try {
    const gen = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=6b4cec3e77943cdafbcaaaead5f55c14`
    );
    return gen.data;
  } catch (error) {
    console.error(error);
  }
});
export const postSlice = createSlice({
  name: "details",
  initialState,
  reducers: {},
  extraReducers: {
    [loadDetails.pending]: (state) => {
      state.loading = true;
    },
    [loadDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.popular = payload;
    },
    [loadDetails.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default postSlice.reducer;
