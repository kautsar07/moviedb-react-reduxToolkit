import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { BsFillStarFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Card } from "antd";
import { Autoplay, Pagination, Navigation } from "swiper";
import "./Genres.css";
import "../Main/Main.css";

const { Meta } = Card;
export default function Horor(props) {
  return (


      <Card
        className="card"
        name="poster"
        hoverable
        cover={
          <img src={`https://image.tmdb.org/t/p/original/${props.poster}`} />
        }
      >
        <Meta name="title" title={props.title} />
        <p>
          <BsFillStarFill name="vote" style={{ color: "yellow" }} />{" "}
          {props.vote} / 10
        </p>
      </Card>
    
  );
}
