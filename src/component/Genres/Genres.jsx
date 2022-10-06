import React, { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { BsFillStarFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Card } from "antd";
import { Autoplay, Pagination, Navigation } from "swiper";
import "./Genres.css";
import "../Main/Main.css";

const { Meta } = Card;
export default function Horor() {
  const [category, setCategory] = useState([]);
  const [genres, setGenres] = useState([]);
  const {genre} = useParams()
  const loadCategory = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=6b4cec3e77943cdafbcaaaead5f55c14&query=${genre}`
      );
      console.log(res.data);
      setCategory(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const loadGenres = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
      );
      console.log(res.data);
      setGenres(res.data.genres);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCategory();
    loadGenres();
  }, []);
  return (
    <div>
      <Navbar />
      <header className="header"></header>
      <div className="container">
        <div className="kategori">
        <div style={{ marginBottom: "50px" }}>
            <h1>Results Movie Genre "{genre}"</h1>
          </div>
       
          <div className="movie-popular">
            {category &&
              category.map((item) => (
                <Link to={`/Details/${item.id}`}>
                  <Card
                    className="card"
                    hoverable
                    cover={
                      <img
                        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                      />
                    }
                  >
                    <div className="title">
                      <Meta title={item.original_title} />
                      <p>
                        <BsFillStarFill style={{ color: "yellow" }} />{" "}
                        {item.vote_average} / 10
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
