import React from "react";
import defaultProfile from '../../img/defaultProfile.png'

const SearchedUsers = ({userData,toggleVisibility}) => {
  
  return (
    <>
      <div
        className="follower conversation"
        onClick={() => {
          toggleVisibility();
        }}
      >
        <div>
          <img
            src={
              userData?.profilePicture
                ? userData.profilePicture
                : defaultProfile
            }
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            <span style={{ fontSize: "0.8rem" }}>{userData?.username} </span>
          </div>
        </div>
        
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default SearchedUsers;
