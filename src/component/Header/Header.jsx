import React, { useState, useEffect } from "react";
import { Carousel, Button } from "react-bootstrap";
import axios from "axios";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import Main from "../Main/Main";
import PropagateLoader from "react-spinners/PropagateLoader";
import Footer from "../Footer/Footer";

export default function Header() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadTrending = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
      );

      setTrending(res.data.results.slice(0,3));
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
                  <div className="container">
                    <Carousel.Caption className="caption">
                      <h1 style={{color:"white"}}>{item.original_title || item.original_name}</h1>
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
      <Footer/>
    </div>
  );
}
