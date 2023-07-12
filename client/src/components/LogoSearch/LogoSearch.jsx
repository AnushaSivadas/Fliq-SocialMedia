import React from "react";
import Logo from "../../img/logo.png";
import Home from "../../img/home.png";
import { Link } from "react-router-dom";


import './LogoSearch.css'
const LogoSearch = () => {
  return (
    <div className="LogoSearch">
    <Link to="../home">

      <img src={Logo} alt="" />
    </Link>

      
      <div class="logo">
  <span class="text">Fliq</span>
  <span class="text media">Media</span>
</div>


    </div>

  );
};

export default LogoSearch;
