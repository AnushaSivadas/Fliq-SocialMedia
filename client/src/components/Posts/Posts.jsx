import React, { useEffect } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));

  }, []);
  posts = posts.filter((post) => post.status);

  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  // else posts = posts.filter((post) => !post.isReported);
  
  if (posts.length === 0) {
    return (
      <div className="Posts">
        <div className="no-posts-message">No Posts</div>
      </div>
    );
  }

  return (
    <div className="Posts">
      {loading
        ? "Fetching posts...."
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
};

export default Posts;
