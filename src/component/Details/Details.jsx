import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "antd";
import { BsFillStarFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./Details.css";
import "../Main/Main.css"

export default function Details() {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [genre, setGenre] = useState([]);
  const loadDetail = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=6b4cec3e77943cdafbcaaaead5f55c14`
      );
      console.log(res.data);
      setDetail(res.data);
      setGenre(res.data.genres);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadDetail();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="deta">
        <img
          className="poster-detail"
          src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path || detail.poster_path}`}
        ></img>
      </div>
      <div className="container">
        <div className="detail">
          <h1>{detail.original_title}</h1>
          <div className="genre">
            {genre.map((item) => (
              <p>{item.name}</p>
            ))}
          </div>
          <p>{detail.overview}</p>
          <div >
            <p className="rating">
              <BsFillStarFill style={{ color: "yellow" }} />{" "}
              {detail.vote_average} / 10
            </p>
            <Button
              href={`https://www.youtube.com/results?search_query=${
                detail.original_name || detail.original_title
              }`}
              className="trailer"
            >
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
