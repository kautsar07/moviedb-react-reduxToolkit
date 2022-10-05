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
  
      <Link name="button" to={`/${props.button}`}>
        <Button className="btn-genre" name="button">
          {props.button}
        </Button>
      </Link>
    
  );
}
