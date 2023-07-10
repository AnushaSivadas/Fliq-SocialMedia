import React, { useState, useRef } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { UilEllipsisV,UilTrash } from "@iconscout/react-unicons";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment, deleteCommentReply } from "../../actions/PostsAction";
import { uploadComment, uploadCommentReply } from "../../actions/UploadAction";
import "./PostModal.css";
import { Modal, useMantineTheme } from "@mantine/core";
// import InputEmoji from "react-input-emoji";

function PostModal({ modalOpened, setModalOpened, data, time }) {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const commentDesc = useRef();
  const replyDesc = useRef(null);

  const [anchorEls, setAnchorEls] = useState(
    Array(data.comments.length).fill(null)
  );

  const [showReplies, setShowReplies] = useState([]);
  const [replyIndex, setReplyIndex] = useState(null);
  const [commentIndex, setCommentIndex] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(null);


  const handleIconClick = (event, index) => {
    
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleMenuItemClick = (comment, index, option) => {
    setAnchorEls((prevAnchorEls) =>
      prevAnchorEls.map((_, i) => (i === index ? null : _))
    );
    if (option === "delete") handleCommentDeletion(comment);
    else if (option === "reply") {
      setReplyIndex(index);
      setHighlightedIndex(index);
     setTimeout(() => {
      replyDesc.current.focus(); // Focus the input field after a small delay
    }, 0);
    } else if (option === "edit"){
      setCommentIndex(index);
      setTimeout(() => {
        commentDesc.current.focus(); // Focus the input field after a small delay
      }, 0);
    }
  };

  const handleIconTrashClick = (event, reply) => {
    // event.stopPropagation();
    handleReplyDeletion(reply);
  };

  const handleUploadReply = () => {
    const replyComment = {
      userId: user._id,
      reply: replyDesc.current.value,
      commentId: data.comments[replyIndex]._id,
    };
    dispatch(uploadCommentReply(replyComment))
    resetReplyShare();
    setReplyIndex(null);
    setHighlightedIndex(null);
    setShowReplies((prevShowReplies) => {
      const updatedShowReplies = [...prevShowReplies];
      updatedShowReplies[replyIndex] = true; // Open the "View Replies" section
      return updatedShowReplies;
    });
  };

  const cancelReply = () => {
    setReplyIndex(null);
    setHighlightedIndex(null);

  };

  const handleCommentDeletion = (comment) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteComment(comment, user._id));
        Swal.fire("Deleted!", "The comment has been deleted.", "success");
      }
    });
  };
  const handleReplyDeletion = (reply) => {
    console.log("deletion", reply);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCommentReply(reply, user._id));
        Swal.fire("Deleted!", "The reply has been deleted.", "success");
      }
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const newComment = {
      userId: user._id,
      comment: commentDesc.current.value,
      postId: data._id,
    };
    dispatch(uploadComment(newComment));
    resetCommentShare();
  };

  const resetCommentShare = () => {
    commentDesc.current.value = "";
  };
  const resetReplyShare = () => {
    replyDesc.current.value = "";
  };

  const handleToggleReplies = (index) => {
    setShowReplies((prevShowReplies) => {
      const updatedShowReplies = [...prevShowReplies];
      updatedShowReplies[index] = !prevShowReplies[index];
      return updatedShowReplies;
    });
  };

  return (
    <Modal
      size={"80%"}
      centered
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={1}
      overlayBlur={3}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div className="PostModal">
        <div>
          <div className="profileSection">
            <img
              src={
                data.userInfo.profilePicture
                  ? data.userInfo.profilePicture
                  : publicFolder + "defaultProfilee.png"
              }
              alt="profile"
              className="profilePicture"
            />
            <div className="ownerInfo">
              <span className="username">{data.userInfo.username}</span>
              <span className="time">{time} ago</span>
            </div>
          </div>
          <div className="postCaption">{data.desc}</div>

          <div className="postDetails">
            <div className="postContent">
              {data.video ? (
                <video src={data.video} controls className="postMedia" />
              ) : (
                <img
                  src={data.image ? data.image : ""}
                  alt=""
                  className="postMedia"
                />
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="commentsSection">
          <h2 className="sectionTitle">Comments</h2>
          <div className="commentsList">
            {data.comments.map((comment, index) => (
              <div className={`comment ${highlightedIndex === index ? "highlighted" : ""}`}
              key={index}>
                <div className="commentDetails">
                  <div className="commentOwner">
                    <img
                      src={
                        comment.commentUser.profilePicture ||
                        publicFolder + "defaultProfilee.png"
                      }
                      alt="profile"
                      className="profilePicture"
                    />
                    <span className="username">
                      {comment.commentUser.username}
                    </span>
                  </div>
                  <div className="commentText">{comment.comment}</div>

                  {comment.commentReplies.length !== 0 && (
                    <>
                      <div
                        className="replyText"
                        onClick={() => handleToggleReplies(index)}
                      >
                        {showReplies[index] ? "Hide Replies" : "View Replies"}
                      </div>
                      {showReplies[index] && (
                        <div className="replyComments">
                          {comment.commentReplies.map((reply, replyIndex) => (
                            <div className="comment" key={replyIndex}>
                              <div className="commentDetails">
                                <div className="commentOwner">
                                  <img
                                    src={
                                      reply.replyUser.profilePicture ||
                                      publicFolder + "defaultProfilee.png"
                                    }
                                    alt="profile"
                                    className="profilePicture"
                                  />
                                  <span className="username">
                                    {reply.replyUser.username}
                                  </span>
                                </div>
                                <div className="commentText">{reply.reply}</div>
                              </div>
                              {reply.replyUser._id === user._id && <div
                                className="commentOptions"
                                
                              >
                                <div style={{padding:"1rem"}}
                                onClick={(event) =>
                                  handleIconTrashClick(event, reply)
                                }
                                >
                                <UilTrash size="13" />
                                </div>  
                              </div>}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div
                  className="commentOptions"
                >
                  <div onClick={(event) => handleIconClick(event, index)} 
>
                  <UilEllipsisV size="20" />
                  </div>
                </div>
                <Menu
                  anchorEl={anchorEls[index]}
                  open={Boolean(anchorEls[index])}
                  onClose={() =>
                    setAnchorEls((prevAnchorEls) =>
                      prevAnchorEls.map((_, i) => (i === index ? null : _))
                    )
                  }
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    elevation: 0,
                    style: {
                      boxShadow: "1px 1px 3px black",
                      border: "none",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => handleMenuItemClick(comment, index, "reply")}
                  >
                    Reply
                  </MenuItem>
                  {comment.userId === user._id && (
                    <>
                      <MenuItem
                        onClick={() =>
                          handleMenuItemClick(comment, index, "edit")
                        }
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          handleMenuItemClick(comment, index, "delete")
                        }
                      >
                        Delete
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </div>
            ))}
          </div>
          {user && (
            <>
              {replyIndex === null ? (
                <>
                  <div className="commentInput">
                    <input
                      type="text"
                      ref={commentDesc}
                      maxLength={20}
                      placeholder="Add a comment..."
                    />
                    <button onClick={handleUpload}>Post</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="commentInput">
                    <input
                      type="text"
                      ref={replyDesc}
                      maxLength={20}
                      placeholder="Add a reply..."
                    />
                    <button onClick={handleUploadReply}>Reply</button>
                  </div>
                  <div className="commentInput cancelBtn">

                    <button  onClick={cancelReply}>Cancel</button>
                    </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default PostModal;
