import React from "react";
import "./Footer.css";
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";

export default function Footer() {
  return (
    <div className="background">
      <div className="container">
        <div className="wrap">
          <div className="social-media">
            <ul className="list-media">
              <li style={{color:"blue"}}><BsFacebook style={{size:"50px"}}/></li>
              <li style={{color:"blue"}}><BsTwitter/></li>
              <li style={{color:"red"}}><BsInstagram/></li>
              <li style={{color:"red"}}><BsYoutube/></li>
            </ul>
          </div>
          <div className="info">
            <p>Conditions of Use</p>
            <p>Privacy & Policy</p>
            <p>Press Room</p>
          </div>
          <div className="year">
            <p>© 2022 MovieBox by Kautsar Elwarbi. All Right Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
