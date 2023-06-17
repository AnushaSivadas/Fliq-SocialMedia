import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link, useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { getFollowers,getFollowing } from "../../api/UserRequests";
import Followers from "../Followers/Followers";

const ProfileCard = ({ location }) => {
  let { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [profileUser, setProfileUser] = useState(user);
  const [following, setFollowing] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  

  useEffect(() => {
    const fetchProfileUser = async () => {
      console.log("fetching");
      const profile = await UserApi.getUser(params.id);
      setProfileUser(profile.data);
      setFollowing(profile.data.followers.includes(user._id));
    };
    if (params.id && params.id !== user._id) {
      fetchProfileUser();
    }
  }, [user,params]);

  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(profileUser._id, user))
      : dispatch(followUser(profileUser._id, user));
    setFollowing((prev) => !prev);
  };
  const handleFollowersList =async () => {
  const followers=await getFollowers(profileUser._id)
  setPersons(followers.data)
  setModalOpened(true)
  };
  const handleFollowingList =async () => {
    const following=await getFollowing(profileUser._id)
  setPersons(following.data)
  setModalOpened(true)


    };

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            profileUser.coverPicture
              ? profileUser.coverPicture
              : serverPublic + "defaultCoverr.jpg"
          }
          alt="CoverImage"
        />
        <img
          src={
            profileUser.profilePicture
              ? profileUser.profilePicture
              : serverPublic + "defaultProfilee.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>
          {profileUser.firstname} {profileUser.lastname}
        </span>
        <span>
          {profileUser.worksAt
            ? profileUser.worksAt
            : user._id === params.id
            ? "Write about yourself"
            : " "}
        </span>

        {user._id !== params.id && location === "profilePage" ? (
          <button
            className={
              following ? "button fc-button UnfollowButton" : "button fc-button"
            }
            onClick={handleFollow}
          >
            {following ? "Unfollow" : "Follow"}
          </button>
        ) : (
          ""
        )}
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span onClick={handleFollowersList}>{profileUser.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            {location === "homepage" && (
              <>
                <span onClick={handleFollowingList}>{user.following.length}</span>
              </>
            )}
            {location === "profilePage" && (
              <>
                <span onClick={handleFollowingList}>{profileUser.following.length}</span>
              </>
            )}
            
            <span>Following</span>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {
                    posts.filter((post) => post.userId === profileUser._id)
                      .length
                  }
                </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            to={`/profile/${profileUser._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
      <Followers  modalOpened={modalOpened}
        setModalOpened={setModalOpened} persons={persons}/>
    </div>
  );
};

export default ProfileCard;
