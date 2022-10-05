import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Coba() {
  const [genres, setGenres] = useState([])
  const loadGenres = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=6b4cec3e77943cdafbcaaaead5f55c14&query=horror"
      );
      console.log(res.data);
      setGenres(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadGenres();
  }, []);
  return (
    <div>coba</div>
  )
}
