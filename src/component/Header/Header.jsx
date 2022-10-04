import React, { useState, useEffect } from "react";


import {Carousel,Button} from "react-bootstrap";
import axios from "axios";
import logo from "./header1.jpg";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import Main from "../Main/Main";



export default function Header(props) {
  
  const [trending, setTrending] = useState([]);
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
  }, []);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  console.log(typeof trending.filter((item)=> item.name===item[0]));
  return (
    <div>
      {/* ================= Navbar ============== */}
      <Navbar />

      <header>
        {/* <div className="head"></div> */}

        <Carousel activeIndex={index} onSelect={handleSelect}>
          {trending &&
            trending.map((item) => (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                />
                <div className="container">
                  <Carousel.Caption className="caption">
                    <h1>{item.original_title || item.original_name}</h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Impedit autem ad at, aliquid id sequi expedita nemo
                      architecto voluptates ducimus et numquam dignissimos
                      laudantium tenetur obcaecati quas, rerum aliquam sunt.
                    </p>

                    <Button href={`https://www.youtube.com/results?search_query=`} className="trailer">Watch Trailer</Button>

                  </Carousel.Caption>
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
      </header>
      <Main/>
     
    </div>
  );
}
