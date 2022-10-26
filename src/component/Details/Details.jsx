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
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Details.css";
import "../Main/Main.css";

const { Meta } = Card;

export default function Details() {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [genre, setGenre] = useState([]);
  const [cast, setCast] = useState([]);
  const {popular, loadr } = useSelector((state) => state.details);
  const dispatch = useDispatch()
  // const loadDetail = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://api.themoviedb.org/3/movie/${id}?api_key=6b4cec3e77943cdafbcaaaead5f55c14`
  //     );
  //     const item = await axios.get(
  //       `https://api.themoviedb.org/3/movie/${id}/credits?api_key=6b4cec3e77943cdafbcaaaead5f55c14`
  //     );
  //     setDetail(res.data);
  //     setCast(item.data.cast.slice(0, 7));
  //     setGenre(res.data.genres);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(() => {
    dispatch(loadDetails(id))
  }, []);

  return (
    <div>
      <Navbar />
      <div className="deta">
      <img
          className="poster-detail"
          src={`https://image.tmdb.org/t/p/original/${
            popular.backdrop_path || popular.poster_path
          }`}
        ></img>
      </div>
      <div className="container">
        <div className="detail">
          <h1 style={{color:"white"}}>{popular.original_title}</h1>
          <div className="genre">
            {/* {genre.map((item) => (
              <p>{item.name}</p>
            ))} */}
          </div>
          <p>{popular.overview}</p>
          <div>
            <p className="rating">
              <BsFillStarFill style={{ color: "yellow" }} />{" "}
              {popular.vote_average} / 10
            </p>
            <Button
              href={`https://www.youtube.com/results?search_query=${
                popular.original_name || popular.original_title
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
