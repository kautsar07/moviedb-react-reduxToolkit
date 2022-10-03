import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Navbar.css";

export default function Navbar() {
  const [search, setSearch] = useState([]);
  const handleChange = async (e) => {
    // e.preventDefault()
    try {
      const res = await axios.get(
        // "https://api.themoviedb.org/3/movie/550/images?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
        `https://api.themoviedb.org/3/search/movie?api_key=6b4cec3e77943cdafbcaaaead5f55c14${`&${search}`}`
        // "https://api.themoviedb.org/3/movie/popular?api_key=6b4cec3e77943cdafbcaaaead5f55c14"
      );
      console.log(res.data);
      setSearch(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleChange();
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
            <input
              type="text"
              className="input-all"
              placeholder="Masukan judul film"
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </div>
    </nav>
  );
}
