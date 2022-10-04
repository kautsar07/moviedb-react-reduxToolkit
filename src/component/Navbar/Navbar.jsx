import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import "./Navbar.css";

export default function Navbar() {
  const [search, setSearch] = useState([]);
  const navigate = useNavigate();
  // const loadPopular = async () => {
  //   try {
  //     const res = await axios.get(
  //       "https://api.themoviedb.org/3/movie/popular?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
  //     );
  //     console.log(res.data.results);
  //     setSearch(res.data.results);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleChange = async (e) => {
    // e.preventDefault();
    try {
      const res = await axios.get(
        // "https://api.themoviedb.org/3/movie/550/images?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
        `https://api.themoviedb.org/3/search/movie?api_key=6b4cec3e77943cdafbcaaaead5f55c14&query=${e.target.value}`
        // "https://api.themoviedb.org/3/movie/popular?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
      );
      console.log(res.data.results);
      setSearch(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // loadPopular()
    handleChange()
  }, []);
 
  return (
    <nav>
      <div className="container">
        <div className="nav-main">
          <div className="nav-logo">
            <img
              src={
                "https://movielist-react-app.netlify.app/static/media/Logo.eeba5c17ddf85f2145e83dd963662921.svg"
              }
            ></img>
          </div>
          <div className="nav-menu">
            <form >
              <span className="input-all">
                <input
                  type="text"
                  className="search"
                  placeholder="What do you want to watch"
                  onChange={(e) => handleChange(e)}
                ></input>
                <BsSearch className="srch" />
              </span>
            </form>
          </div>
          <div className="login-regis">
            <Button className="btn-log">Login</Button>
            <Button className="btn-reg">Register</Button>
          </div>
        </div>
      </div>
      {search && search.map((item)=>(
        <h1>
          {item.title}
        </h1>
      ))}
      
    </nav>
  );
}
