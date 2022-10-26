import React, { useEffect, useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Main.css";
import Genress from "./Genre"
import AllMovie from "./AllMovie";
import Popular from "./Popular";




export default function Main() {
  const [loadings, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      <section>
        <div className="container">
          <div style={{ marginBottom: "50px" }}>
            <h1>Populars</h1>
          </div>
          {loadings ? (
            <PacmanLoader
              className="loader"
              size={30}
              color={"#F37A24"}
              loading={loadings}
            />
          ) : (
            <AllMovie/>
          )}
          <div style={{ marginBottom: "50px" }}>
            <h1>Browses by Category</h1>
          </div>
          {loadings ? (
            <PacmanLoader
              className="loader"
              size={30}
              color={"#F37A24"}
              loading={loadings}
            />
          ) : (
            <div>
              <Genress/>
              <Popular/>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
