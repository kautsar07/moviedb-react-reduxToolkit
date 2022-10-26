import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Main.css";
import { Card } from "antd";
import { Autoplay, Pagination, Navigation } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { loadRated, loadGenre, loadMovie } from "../features/movies/genreSlice";
// import { loadMovie } from '../features/movies/popularSlice'

export default function Genre() {
  const dispatch = useDispatch();
  const { entities, load } = useSelector((state) => state.genres);

    useEffect(() => {
      dispatch(loadGenre());
    }, []);
  return (
    <>
      <Swiper
        spaceBetween={10}
        slidesPerView={8}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <div className="genre" >
          {entities.map((item) => (
            <SwiperSlide>
              <Link to={`/genres/${item.name}`}>
                <Button className="btn-genre">{item.name}</Button>
              </Link>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  );
}
