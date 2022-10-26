import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "react-bootstrap";
import { BsFillStarFill } from "react-icons/bs";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Main.css";
import { Card } from "antd";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { loadAll, loadGenre, loadMovie } from "../features/movies/allMovie";

const { Meta } = Card;

export default function AllMovie() {
  const dispatch = useDispatch();

  const { entities, load } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(loadAll());
  }, []);
  return (
    <div>
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
          {entities.map((item) => (
            <SwiperSlide>
              <Link to={`/Details/${item.id}`}>
                <Card
                  className="ant-card-cover"
                  hoverable
                  cover={
                    <img
                      src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    />
                  }
                >
                  <div className="ant-card-body">
                    <div className="title">
                      <Meta title={item.original_title} />
                      <p>
                        <BsFillStarFill style={{ color: "yellow" }} />{" "}
                        {item.vote_average} / 10
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
