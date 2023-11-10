import React from "react";
// import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";
import { useLocation } from "react-router-dom";
import NavIcons from "../../components/NavIcons/NavIcons";

const Profile = () => {
  // const params = useParams()
  const location = useLocation();

  const { user } = useSelector((state) => state.authReducer.authData)
  const profileUserId = location.state?.profileUserId || null;

  const flag = (user._id === profileUserId) ? true : false;
  return (
    <div className="Profile">
      <div className="Profile-elements">
        <ProfileLeft />
        <div className="Profile-center">
          <ProfileCard location='profilePage' />
          <PostSide flag={flag} />
        </div>
        <RightSide />
      </div>
      <div className="bottom-nav">
        <NavIcons />
      </div>
    </div>

  );
};

export default Profile;
