import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { getFollowers, getFollowing } from "../../api/UserRequests";
import Followers from "../Followers/Followers";
import { UilPen } from "@iconscout/react-unicons"
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { changeUsername } from "../../actions/UserAction";
import defaultProfile from '../../img/defaultProfile.png'
import defaultCover from '../../img/defaultCover.jpg'
import { logout } from "../../actions/AuthActions";


const ProfileCard = ({ location }) => {
  let { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const [profileUser, setProfileUser] = useState(user);
  const [following, setFollowing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const loc = useLocation();
  const profileUserId = loc.state?.profileUserId || null;
  useEffect(() => {
    const fetchProfileUser = async () => {
      const profile = await UserApi.getUser(profileUserId);
      setProfileUser(profile.data);
      setFollowing(profile.data.followers.includes(user._id));
    };
    // if (params.id && params.id !== user._id) {
    fetchProfileUser();
    // }
  }, [user, profileUserId]);

  const handleLogOut = () => {
    dispatch(logout());
  };

  const handleFollow = () => {
    if (following) {
      dispatch(unfollowUser(profileUser._id, user))
    } else {
      dispatch(followUser(profileUser._id, user));
    }
    setFollowing((prev) => prev = !prev);
  };

  const navigateToChat = (userId) => {
    navigate("/chat", { state: { userId } });
  };

  const navigateToProfile = (profileUserId) => {
    navigate("/profile", { state: { profileUserId } });
  };

  const handleFollowersList = async () => {
    const followers = await getFollowers(profileUser._id);
    setPersons(followers.data);
    setModalOpened(true);
  };
  const handleFollowingList = async () => {
    const following = await getFollowing(profileUser._id);
    setPersons(following.data);
    setModalOpened(true);
  };
  const [opens, setOpens] = useState(false);
  const [desc, setDesc] = useState(profileUser.username ? profileUser.username : "");

  const handleUsernameEdit = () => {
    setOpens(true);
  };

  const handleCloses = () => {
    setDesc(profileUser.username ? profileUser.username : "");
    setOpens(false);
  };

  const handleChangeUsername = async () => {
    handleCloses(false)
    const regex = /^[a-z0-9_.]+$/;
    if (desc.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Empty",
        text: "Please create a username",
      });
      return;
    }
    else if (!desc.match(regex)) {
      Swal.fire({
        icon: "error",
        title: "Wrong Format",
        text: "Only lowercase alphabets, digits, underscore, and dot are allowed",
      });
      return;
    }
    else if (desc.length > 15) {
      Swal.fire({
        icon: "error",
        title: "Wrong Format",
        text: "Maximum username length is 15 characters",
      });
      return;
    }
    else if (!desc.match(/[a-z]/i)) {
      Swal.fire({
        icon: "error",
        title: "Wrong Format",
        text: "Username must contain at least one alphabet",
      });
      return;
    }
    else if (desc === profileUser.username) {
      return;
    }

    else {
      let userData = {
        userId: user._id,
        username: desc
      }
      dispatch(changeUsername(userData))
      Swal.fire({
        title: "Success",
        text: "Username changed successfully",
        icon: "success",
      });
    }
  };

  const MAX_INPUT_LENGTH = 50;
  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value.length <= MAX_INPUT_LENGTH) {
      setDesc(event.target.value);
    }
  };

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            profileUser.coverPicture
              ? profileUser.coverPicture
              : defaultCover
          }
          alt="CoverImage"
        />
        <img className="ProfilePicture"
          src={
            profileUser.profilePicture
              ? profileUser.profilePicture
              : defaultProfile
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        {location === "profilePage" && user._id === profileUserId ? (
          <span className="username">
            {profileUser.username ? profileUser.username : "Create a username"}
            <UilPen
              width="2rem"
              height="1rem"
              onClick={handleUsernameEdit}
              className="UilPen"
            />
            <Dialog open={opens} onClose={handleCloses}>
              <DialogTitle>Edit Username</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <p className="text-red-500">
                    *only lowercase alphabets,numbers,dot and underscore
                  </p>
                </DialogContentText>
                <TextField
                  autoFocus
                  defaultValue={profileUser.username ? profileUser.username : ""}
                  value={desc}
                  margin="dense"
                  id="name"
                  type="text"
                  fullWidth
                  // maxlength={MAX_INPUT_LENGTH}
                  onChange={handleInputChange}
                // onChange={(e) => setDesc(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloses}>Cancel</Button>
                <Button
                  onClick={handleChangeUsername}
                  disabled={desc.trim() === ""}
                >
                  Confirm
                </Button>

              </DialogActions>
            </Dialog>
           
          </span>
          
        ) : ""}
        <span>
          
          {profileUser.firstname} {profileUser.lastname}
        </span>
        {location === "profilePage" && user._id === profileUserId ? (
        <button className="button  pcard-logout-button" onClick={handleLogOut}>
        Log Out
      </button>):("")}
        {/* <span>
          {profileUser.worksAt
            ? profileUser.worksAt
            : user._id === params.id
            ? "Write about yourself"
            : " "}
        </span> */}

        {user._id !== profileUserId && location === "profilePage" ? (
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
        {user._id !== profileUserId && location === "profilePage" && following ? (
          <button
            className="button fc-button"
            onClick={() => navigateToChat(profileUser._id)}
          >
            Message
          </button>
        ) : (
          ""
        )}
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span onClick={handleFollowersList}>
              {profileUser.followers.length}
            </span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            {location === "homepage" && (
              <>
                <span onClick={handleFollowingList}>
                  {user.following.length}
                </span>
              </>
            )}
            {location === "profilePage" && (
              <>
                <span onClick={handleFollowingList}>
                  {profileUser.following.length}
                </span>
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
        <span
          onClick={() => navigateToProfile(profileUser._id)}
        >
          My Profile
        </span>
      )}
      <Followers
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        persons={persons}
      />
    </div>
  );
};

export default ProfileCard;
