import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  useEffect(() => {
    if(user._id===person._id) setVisible(false);
    // setFollowing(person.followers.includes(user._id));
  }, [user]);

  const navigateToProfile = (profileUserId) => {
    navigate("/profile", { state : { profileUserId } });
  };
  
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  return (
    <div className="follower">
      <div 
         onClick={ ()=>navigateToProfile(person._id)}
         style={{cursor:"pointer"}}>
        <img
          src={
            person.profilePicture
              ? person.profilePicture
              : publicFolder + "defaultProfilee.png"
          }
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          
            {person.username}
          {/* <span></span> */}
          {/* <span>@{person.username}</span> */}
        </div>
      </div>
    
      {visible && (
              <button
              className={
                following ? "button fc-button UnfollowButton" : "button fc-button"
              }
              onClick={handleFollow}
            >
              {following ? "Unfollow" : "Follow"}
             
            </button>
          )}
    </div>
  );
};

export default User;
