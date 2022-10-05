import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "react-bootstrap";
import { BsFillStarFill } from "react-icons/bs";
import axios from "axios";
import PacmanLoader from "react-spinners/PacmanLoader";

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Main.css";
import { Card } from "antd";
import { Autoplay, Pagination, Navigation } from "swiper";
import { FallingLines } from "react-loader-spinner";
const { Meta } = Card;

export default function Main() {
  const [popular, setpopular] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadPopular = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
      );
      console.log(res.data.results);
      setpopular(res.data.results);
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
    loadGenres();
    loadPopular();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      <section>
        <div className="container">
          <div style={{ marginBottom: "50px" }}>
            <h1>Populars</h1>
          </div>
          {loading ? (
            <PacmanLoader className="loader" size={30} color={"#F37A24"} loading={loading} />
          ) : (
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
                  {popular.map((item) => (
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
          )}
          <div style={{ marginBottom: "50px" }}>
            <h1>Browses by Category</h1>
          </div>
          {loading ? (
            <PacmanLoader className="loader" size={30} color={"#F37A24"} loading={loading} />
          ) : (
            <div>
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
                <div className="movie-popular">
                  {genres &&
                    genres.map((item) => (
                      <SwiperSlide>
                        <Link to={`/${item.name}`}>
                          <Button className="btn-genre">{item.name}</Button>
                        </Link>
                      </SwiperSlide>
                    ))}
                </div>
              </Swiper>

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
                  {popular.map((item) => (
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
          )}
        </div>
      </section>
    </>
  );
}
