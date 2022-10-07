import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "antd";
import { Autoplay, Pagination, Navigation } from "swiper";
import Footer from "../Footer/Footer";
import { BsFillStarFill } from "react-icons/bs";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Search.css";

const { Meta } = Card;

export default function Search() {
  const { name } = useParams();
  const [search, setSearch] = useState([]);
  const handleChange = async (e) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=6b4cec3e77943cdafbcaaaead5f55c14&query=${name}`
      );
      console.log(res.data.results);
      setSearch(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleChange();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="header">
        <div className="container">
          <div className="titles">
            <h1>All Movie "{name}"</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="movie">
          <div style={{ marginBottom: "50px" }}>
            <h1>Search Result "{name}"</h1>
          </div>
          <Swiper
            spaceBetween={30}
            slidesPerView={4}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <div className="movie-popular">
              {search.map((item) => (
                <SwiperSlide>
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
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
      <Footer />
    </div>
  );
}
