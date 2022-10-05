import React, { useState} from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import "./Navbar.css";

export default function Navbar() {
  const [search, setSearch] = useState([]);
  const navigate = useNavigate();
  const submit = (e) => {
    navigate(`/Search/${search}`);
  };

  return (
    <nav>
      <div className="container">
        <div className="nav-main">
          <div className="nav-logo">
            <Link to="/">
              <img
                src={
                  "https://movielist-react-app.netlify.app/static/media/Logo.eeba5c17ddf85f2145e83dd963662921.svg"
                }
              ></img>
            </Link>
          </div>
          <div className="nav-menu">
            <div>
              <form onSubmit={submit}>
                <input
                  type="text"
                  className="input-all"
                  placeholder="What do you want to watch"
                  onChange={(e) => setSearch(e.target.value)}
                ></input>
                <BsSearch  className="srch" />
              </form>
            </div>
          </div>
          <div className="login-regis">
            <Button className="btn-log">Login</Button>
            <Button className="btn-reg">Register</Button>
          </div>
        </div>
      </div>
      {/* {search && search.map((item) => <h1 style={{color:"white"}}>{item.title}</h1>)} */}
    </nav>
  );
}
