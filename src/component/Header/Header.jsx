import React, { useState, useEffect } from "react";
import { Carousel, Button } from "react-bootstrap";
import axios from "axios";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import Main from "../Main/Main";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Card } from "antd";

const { Meta } = Card;

export default function Header(props) {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadTrending = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
      );
      console.log(res.data.results);
      setTrending(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTrending();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  console.log(typeof trending.filter((item) => item.name === item[0]));
  return (
    <div>
      {/* ================= Navbar ============== */}
      <Navbar />
      {loading ? (
        <PropagateLoader
          className="load"
          size={30}
          color={"#F37A24"}
          loading={loading}
        />
      ) : (
        <header>
          {/* <div className="head"></div> */}
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {trending &&
              trending.map((item) => (
                <Carousel.Item className="mm">
                  <img
                    className="d-block w-100"
                    src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                  />
                  <div className="contai">
                    <Carousel.Caption className="caption">
                      <h1>{item.original_title || item.original_name}</h1>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Impedit autem ad at, aliquid id sequi expedita nemo
                        architecto voluptates ducimus et numquam dignissimos
                        laudantium tenetur obcaecati quas, rerum aliquam sunt.
                      </p>

                      <Button
                        href={`https://www.youtube.com/results?search_query=${
                          item.original_name || item.original_title
                        }`}
                        className="trailer"
                      >
                        Watch Trailer
                      </Button>
                    </Carousel.Caption>
                  </div>
                </Carousel.Item>
              ))}
          </Carousel>
        </header>
      )}
      <Main />
    </div>
  );
}
