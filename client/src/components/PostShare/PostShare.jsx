import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost,uploadVideo } from "../../actions/UploadAction";
import * as UploadApi from "../../api/UploadRequest";
import InputEmoji from "react-input-emoji";
import defaultProfile from '../../img/defaultProfile.png'
import Swal from "sweetalert2";

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const desc = useRef();
  const [inputValue, setInputValue] = useState("");
  const MAX_INPUT_LENGTH = 25;
  
  // handle Video Change
  const onVideoChange = (event) => {
    const file = event.target.files[0];
    setVideo(file);
  };

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      // Add image validation here
      if (validateImage(img)) {
        setImage(img);
      } else {
        // Show an error message or perform any other action for invalid image
        Swal.fire({
          icon: "error",
          title: "Invalid Image",
          text: "Please select a valid image file (JPEG, PNG, or GIF).",
        });
      }
    }
  };

  // Image validation function
  const validateImage = (img) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(img.type)) {
      return true;
    }
    return false;
  };

  const imageRef = useRef();
  const videoRef = useRef();

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Empty Description",
        text: "Please enter a description before sharing.",
      });
      return;
    }

    //post data
    const newPost = {
      userId: user._id,
      desc: inputValue,
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      try {
        // dispatch(uploadImage(data));
        const ImageUrl = await UploadApi.uploadImage(data);
        newPost.image = ImageUrl.data;
      } catch (err) {
        console.log(err);
      }
    }

    if (video) {
      const data = new FormData();
      const fileName = Date.now() + video.name;
      data.append("name", fileName);
      data.append("file", video);
      try {
        // dispatch(uploadVideo(data));
        const videoUrl = await UploadApi.uploadVideo(data); // Replace with your video upload API call
       newPost.video = videoUrl.data; // Assign the video URL/key to the newPost object
      console.log("aftervideo",newPost)
      } catch (err) {
        console.log(err);
      }
    }

    dispatch(uploadPost(newPost));
    resetShare();
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    setVideo(null);
    // desc.current.value = "";
    setInputValue("");
    setInputValue("");
  };

  // handle input change
  const handleInputChange = (inputValue) => {
    // const value = event.target.value;
    const value = inputValue
    if (value.length <= MAX_INPUT_LENGTH) {
      setInputValue(value);
    }
  };
  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? user.profilePicture
            : defaultProfile
        }
        alt="Profile"
      />
      <div>
        {/* <input
          type="text"
          placeholder="What's happening?"
          required
          ref={desc}
          value={inputValue}
          maxLength={MAX_INPUT_LENGTH}
          onChange={handleInputChange}
        /> */}
        <InputEmoji 
          placeholder="What's happening?"
          required
          ref={desc}
          value={inputValue}
          maxLength={MAX_INPUT_LENGTH}
          onChange={handleInputChange}
          position="below"
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <div
            className="option"
            style={{ color: "var(--video)" }}
            onClick={() => videoRef.current.click()}
          >
            <UilPlayCircle />
            Video
          </div>

          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={loading || inputValue.trim() === ""}
          >
            {loading ? "uploading" : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file"
              accept="image/*"
             ref={imageRef} 
             onChange={onImageChange} />
          </div>
          <div style={{ display: "none" }}>
            <input
              type="file"
              ref={videoRef}
              accept="video/*"
              onChange={onVideoChange}
            />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}

        {video && (
          <div className="previewImage">
            <UilTimes onClick={() => setVideo(null)} />
            <video src={URL.createObjectURL(video)} controls />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
