import React from "react";
import PostSide from "../components/PostSide/PostSide";
import ProfileSide from "../components/profileSide/ProfileSide";
import RightSide from "../components/RightSide/RightSide";
import "./Home.css";
import NavIcons from "../components/NavIcons/NavIcons";

const Home = () => {
  return (
    <div className="Home">
      <div className="Home-elements">
        <ProfileSide className="profileSide" />
        <PostSide flag={true} />
        <RightSide />
      </div>      
      <div className="bottom-nav">
        <NavIcons />
      </div>
    </div>

  );
};

export default Home;
