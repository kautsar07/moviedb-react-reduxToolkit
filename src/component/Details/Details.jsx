import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "antd";

import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./Details.css";

export default function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const loadMovie = async () => {
    try {
      const res = await axios.get(
        // "https://api.themoviedb.org/3/movie/550/images?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
        // "https://api.themoviedb.org/3/movie/550?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
        `https://api.themoviedb.org/3/movie/${id}?api_key=6b4cec3e77943cdafbcaaaead5f55c14`
        // `https://api.themoviedb.org/3/movie/550/images?api_key=6b4cec3e77943cdafbcaaaead5f55c14`
      );
      console.log(res.data);
      setMovie(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // loadbc()
    loadMovie();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="detail">
          <div className="poster">
            <img
              className="poster-detail"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            ></img>
          </div>
          <div className="details">
            <h3>Movie Name</h3>
            <h6>{movie.original_title}</h6>
            <h3>Synopsis</h3>
            <h6>{movie.overview}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
