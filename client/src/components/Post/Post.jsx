import React, { useState, useRef } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import PostModal from "../PostModal/PostModal.jsx";
import { likePost } from "../../api/PostsRequests";
import { useSelector, useDispatch } from "react-redux";
import { uploadComment } from "../../actions/UploadAction";
import { UilEllipsisV } from '@iconscout/react-unicons';
import OptionsModal from "../OptionsModal/OptionsModal";


const Post = ({ data }) => {
  const dispatch = useDispatch();

  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);

  const [modalOpened, setModalOpened] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  
  const iconRef=useRef(null);

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const desc = useRef();


  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
    const newComment = {
      userId: user._id,
      comment: desc.current.value,
      postId: data._id,
    };

    dispatch(uploadComment(newComment));
    resetShare();
  };
  const resetShare = () => {
    desc.current.value = "";
  };

  // Current time
  var now = new Date();

  // Specific time (May 11, 2023, 06:49:03 UTC)
  var specificTime = new Date(data.createdAt);

  // Calculate the difference in milliseconds
  var difference = now.getTime() - specificTime.getTime();

  // Convert milliseconds to seconds
  var seconds = Math.floor(difference / 1000);

  // Convert seconds to minutes
  var minutes = Math.floor(seconds / 60);

  // Convert minutes to hours
  var hours = Math.floor(minutes / 60);

  //Convert hours to day
  var days = Math.floor(hours / 24);
  let timeDifference;
  if (seconds < 60) {
    timeDifference = seconds + " seconds";
  } else if (minutes < 60) {
    timeDifference = minutes + " minutes";
  } else if (hours < 24) {
    timeDifference = hours + " hours";
  } else {
    timeDifference = days + " days";
  }
  // console.log("time"+timeDifference)
  // console.log("Difference in seconds: " + seconds);
  // console.log("Difference in minutes: " + minutes);
  // console.log("Difference in hours: " + hours);
  // console.log("Difference in days: " + days);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText = isExpanded ? data.desc : data.desc.slice(0, 86);
  const shouldShowSeeMore = !isExpanded && data.desc.length > 86;

  return (
    <div className="Post">
      <div className="follower">
        <div>
          <img
            src={
              data.userInfo.profilePicture
                ?  data.userInfo.profilePicture
                : publicFolder + "defaultProfilee.png"
            }
            alt="profile"
            className="followerImage"
          />
          <div className="name">
            <span>{data.userInfo.username}</span>
            <span style={{color:"gray",fontSize:"0.7rem"}}>{timeDifference} ago</span>
          </div>
        </div>
            <div className="options" ref={iconRef} onClick={() => setModalOpen(true)}>
              <UilEllipsisV size="20"/>
            </div>
            <OptionsModal 
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            iconRef={iconRef}
            post={data}
            userId={data.userId}/>

      </div>
      
    

      <img
        src={data.image ? data.image : ""}
        alt=""
      />
       {!data.image && <span style={{fontWeight:"bold"}}>
        {truncatedText}
        {shouldShowSeeMore && (
          <span onClick={toggleText} className="seeMore">
            ...more
          </span>
        )}
      </span>}

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

     {data.image && <span>
        <b>{data.userInfo.username} </b>
        {truncatedText}
        {shouldShowSeeMore && (
          <span onClick={toggleText} className="seeMore">
            ...more
          </span>
        )}
      </span>}

      <div className="detail" style={{fontSize:"0.8rem"}}>
        {data.comments.slice(0, 2).map((comment, id) => {
          return (
            <span>
              
              <b>{comment.username}</b> {comment.comment}
              <br></br>
            </span>
          );
        })}
      </div>
      <div onClick={() => setModalOpened(true)} style={{fontSize:"smaller",cursor:"pointer"}}>
        View All {data.comments.length} comments
      </div>
      <PostModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        data={data} time={timeDifference}
      />
      <div className="addcomment">
        <input type="text" placeholder="Add comment..." required ref={desc} />
        <span onClick={handleUpload}>Post</span>
      </div>
    </div>
  );
};

export default Post;
