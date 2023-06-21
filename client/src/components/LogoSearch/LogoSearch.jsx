import React from "react";
import Logo from "../../img/logo.png";
import Home from "../../img/home.png";
import { Link } from "react-router-dom";


import './LogoSearch.css'
import { UilSearch } from '@iconscout/react-unicons'
const LogoSearch = () => {
  return (
    <div className="LogoSearch">
    <Link to="../home">

      <img src={Home} alt="" />
    </Link>

      {/* <div className="Search">
          <input type="text" placeholder="#Explore"/>
          <div className="s-icon">
                <UilSearch/>
          </div>
      </div> */}
      <div class="logo">
  <span class="text">Fliq</span>
  <span class="text media">Media</span>
</div>


    </div>

  );
};

export default LogoSearch;
