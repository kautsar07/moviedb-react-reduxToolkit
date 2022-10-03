import React,{useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Card } from "antd";
const { Meta } = Card;


export default function Main() {
    const [popular, setpopular] = useState([]);
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
  useEffect(() => {
    loadPopular();
  }, []);
  return (
    <section>
    <div className="container">
      <h1>Populars</h1>
      <div className="movie-popular">
        {popular.map((item) => (
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
              <Meta title={item.original_title} />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </section>
  )
}
