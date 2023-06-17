import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";
import * as UploadApi from "../../api/UploadRequest";

import Swal from "sweetalert2";

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const desc = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

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

    //post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      console.log(newPost);
      try {
        // dispatch(uploadImage(data));
    const ImageUrl=await UploadApi.uploadImage(data);
    newPost.image = ImageUrl.data;

console.log(ImageUrl);
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
    desc.current.value = "";
  };
  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ?  user.profilePicture
            : serverPublic + "defaultProfilee.png"
        }
        alt="Profile"
      />
      <div>
        <input
          type="text"
          placeholder="What's happening?"
          required
          ref={desc}
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

          <div className="option" style={{ color: "var(--video)" }}
          onClick={() => videoRef.current.click()}>
            <UilPlayCircle />
            Video
          </div>
          {/* <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div> */}
          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "uploading" : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
          <div style={{ display: "none" }}>
            <input type="file" ref={videoRef} accept="video/*" onChange={onVideoChange} />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}

      {video &&( 
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
