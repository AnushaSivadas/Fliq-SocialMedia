import React, { useState } from 'react';

const Accordion = () => {
  const [showComment, setShowComment] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);

  const toggleComment = () => {
    setShowComment(!showComment);
  };

  const toggleReplyInput = () => {
    setShowReplyInput(!showReplyInput);
  };

  return (
    <div>
      <h2>Accordion</h2>

      <button className="accordion" onClick={toggleComment}>
        <div className="top">
          <div className="name">
            <div className="avatar">
              <h2 className="">2</h2>
            </div>
            <h4>Username</h4>
          </div>
          <div className="options">
            <span>...</span>
            <div className="options-content">
              <h6 className="delete-option">Delete</h6>
              <h6 className="reply-option" onClick={toggleReplyInput}>
                Reply
              </h6>
            </div>
          </div>
        </div>
        <div className="comment-text">
          <p>Loremadsdsdasdddddddddddddddd</p>
        </div>
        <div className="show-comment">
          <h6>{showComment ? 'Hide Comment' : 'Show Comment'}</h6>
        </div>
      </button>

      {showComment && (
        <div className="panel">
          <div className="reply">
            <div className="name">
              <div className="avatar">
                <h2 className="">2</h2>
              </div>
              <h4>Reply user</h4>
            </div>
            <div className="">
              <p>Loremadsdsdasdddddddddddddddd</p>
            </div>
          </div>
          {showReplyInput && (
            <div className="panel-input">
              <input type="text" placeholder="Enter your reply" />
              <button className="submit-reply">Submit</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Accordion;

