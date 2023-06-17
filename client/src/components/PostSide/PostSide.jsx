import React from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";

const PostSide = ({flag}) => {
  return (
    <div className="PostSide">
      {flag && <PostShare/>}
      <Posts/>
    </div>
  );
};

export default PostSide;
