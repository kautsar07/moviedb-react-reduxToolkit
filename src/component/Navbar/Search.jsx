import React, { useEffect } from "react";
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
// import "../Main/Main.css";
import { loadSearch } from "../features/movies/searchSlice";
import { useDispatch, useSelector } from "react-redux";

const { Meta } = Card;

export default function Search() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.searchs);

  useEffect(() => {
    dispatch(loadSearch(name));
  }, []);
  return (
    <div>
      <Navbar />
      <div className="header">
        <div className="container">
          <div className="titles">
            <h1 style={{ color: "white" }}>All Movie "{name}"</h1>
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
      </div>
      <Footer />
    </div>
  );
}
