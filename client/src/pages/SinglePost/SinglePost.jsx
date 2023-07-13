import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./SinglePost.css";
import PostModal from "../../components/PostModal/PostModal";

const Posts = () => {
  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;
  let { posts } = useSelector((state) => state.postReducer);
  const [modalOpened, setModalOpened] = useState(true);

  posts = posts.filter((post) => post._id === postId);

  var now = new Date();

  // Specific time (May 11, 2023, 06:49:03 UTC)
  var specificTime = new Date(posts[0].createdAt);

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

 const handleCloseModal = () => {
    setModalOpened(false);
    navigate(-1); // Go back to the previous page
  };

  return (
    <PostModal
      modalOpened={modalOpened}
      setModalOpened={handleCloseModal}
      data={posts[0]}
      time={timeDifference}
    />
  );
};

export default Posts;

