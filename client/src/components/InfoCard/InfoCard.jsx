import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { logout } from "../../actions/AuthActions";
import { useLocation } from "react-router-dom";

const InfoCard = () => {
  const dispatch = useDispatch();
  // const params = useParams();
  const location = useLocation();
  const [modalOpened, setModalOpened] = useState(false);
  // const profileUserId = params.id;
  const profileUserId = location.state?.profileUserId || null;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleLogOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser.data);
      }
    };
    fetchProfileUser();
  }, [user, profileUserId]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="infoData">
        <div className="info">
          <span>
            <b>Lives in </b>
          </span>
          <span className="data">{profileUser.livesIn}</span>
        </div>
        <div className="info">
          <span>
            <b>Status </b>
          </span>
          <span className="data">{profileUser.relationship}</span>
        </div>
        <div className="info">
          <span>
            <b>Works at </b>
          </span>
          <span className="data">{profileUser.worksAt}</span>
        </div>
        
      </div>
      {profileUser.email && (<div className="email">
        <span>
          <b><u>Email</u></b>
        </span>
        <span>
        {profileUser.email}
        </span>
      </div>)}

      <button className="button logout-button" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default InfoCard;
