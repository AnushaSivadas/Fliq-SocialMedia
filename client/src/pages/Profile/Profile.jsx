import React from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import PostSide from "../../components/PostSide/PostSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";


const Profile = () => {
const params = useParams()

  const { user } = useSelector((state) => state.authReducer.authData)
  const flag = (user._id === params.id)?true:false;
  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="Profile-center">
        <ProfileCard location = 'profilePage'/>
         <PostSide flag={flag}/>
       
      </div>
      <RightSide/>
    </div>
  );
};

export default Profile;
