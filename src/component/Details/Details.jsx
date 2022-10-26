import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import { BsFillStarFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import { loadDetails } from "../features/movies/getDetails";
import { loadCast } from "../features/movies/castSlice";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Details.css";
import "../Main/Main.css";
import Genre from "../Main/Genre";

const { Meta } = Card;

export default function Details() {
  const { id } = useParams();
  const {detail } = useSelector((state) => state.details);
  const {cast } = useSelector((state) => state.casts);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadDetails(id))
    dispatch(loadCast(id))
  }, []);

  return (
    <div>
      <Navbar />
      <div className="deta">
      <img
          className="poster-detail"
          src={`https://image.tmdb.org/t/p/original/${
            detail.backdrop_path || detail.poster_path
          }`}
        ></img>
      </div>
      <div className="container">
        <div className="detail">
          <h1 style={{color:"white"}}>{detail.original_title}</h1>
          <div className="genre">
          </div>
          <p>{detail.overview}</p>
          <div>
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
      <div className="container">
        <div style={{ margin: "50px 0 50px 0" }}>
          <h1>Cast and Crew</h1>
        </div>
        <Genre />
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
            {cast.map((item) => (
              <SwiperSlide>
                <Card
                  className="ant-card-cover"
                  hoverable
                  cover={
                    <img
                      src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                    />
                  }
                >
                  <div className="ant-card-body">

                  <div className="title">
                    <Meta title={item.name} />
                    <p>Character: {item.character}</p>
                  </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
      <Footer />
    </div>
  );
}
