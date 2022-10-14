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

const { Meta } = Card;

export default function Main() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadMovie = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
      );
      const rated = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
      );
      const gen = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
      );
      setGenres(gen.data.genres);
      setPopular(res.data.results);
      setTopRated(rated.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadMovie();
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
                        style={{color:"white"}}
                          className="card"
                          hoverable
                          cover={
                            <img
                              src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                            />
                          }
                        >
                          <div  className="title">
                            <Meta className="ant-card-meta-title" title={item.original_title} />
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
                        <Link to={`/genres/${item.name}`}>
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
                  {topRated.map((item) => (
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
