import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./component/Header/Header";


function App() {
  const baseUrlPoster = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
