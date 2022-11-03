import { configureStore } from "@reduxjs/toolkit";
import popular from "../component/features/movies/popularSlice";
import genre from "../component/features/movies/genreSlice";
import genres from "../component/features/movies/genreDetailSlicce";
import rated from "../component/features/movies/allMovie";
import detail from "../component/features/movies/getDetails";
import cast from "../component/features/movies/castSlice";
import search from "../component/features/movies/searchSlice";
import trending from "../component/features/movies/trendingSlice";
import login from "../component/features/auth/authSlice";
import loginGoogle from "../component/features/auth/authSlice";
import register from "../component/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    trendings: trending,
    genres: genre,
    populars: popular,
    movies: rated,
    details: detail,
    searchs: search,
    casts: cast,
    genredetail: genres,
    loginGoogle: loginGoogle,
    logins: login,
    registers: register,
  },
});
