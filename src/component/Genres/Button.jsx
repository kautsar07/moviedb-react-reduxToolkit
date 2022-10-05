import React from "react";
import { Link} from "react-router-dom";
import { Button } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Genres.css";
import "../Main/Main.css";


export default function Horor(props) {
  return (
  
      <Link name="button" to={`/${props.button}`}>
        <Button className="btn-genre" name="button">
          {props.button}
        </Button>
      </Link>
    
  );
}
