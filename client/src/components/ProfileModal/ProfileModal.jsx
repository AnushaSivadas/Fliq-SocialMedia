import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../actions/UploadAction";
import * as UploadApi from "../../api/UploadRequest";

import { updateUser } from "../../actions/UserAction";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let UserData = formData;
    UserData.id=user._id;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      try {
        // dispatch(uploadImage(data));
        const ImageUrl = await UploadApi.uploadImage(data);
        UserData.profilePicture = ImageUrl.data;
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      UserData.coverPicture = fileName;
      try {
        // dispatch(uploadImage(data));
        const ImageUrl = await UploadApi.uploadImage(data);
        UserData.coverPicture = ImageUrl.data;
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser( UserData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="35%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      {/* <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your Info</h3>
        <div>
         <label for="firstname"> Firstname : </label>
          <input
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            id="firstname"
            placeholder="First Name"
            name="firstname"
            className="infoInput"
          />
                  <label for="firstname"> Firstname : </label>

          <input
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            name="lastname"
            className="infoInput"
          />
        </div>

        <div>
        <label for="firstname"> Firstname : </label>

          <input
            value={formData.worksAt}
            onChange={handleChange}
            type="text"
            placeholder="Works at"
            name="worksAt"
            className="infoInput"
          />
        </div>

        <div>
        <label for="firstname"> Firstname : </label>

          <input
            value={formData.livesIn}
            onChange={handleChange}
            type="text"
            placeholder="Lives in"
            name="livesIn"
            className="infoInput"
          />
                  <label for="firstname"> Firstname : </label>

          <input
            value={formData.country}
            onChange={handleChange}
            type="text"
            placeholder="Country"
            name="country"
            className="infoInput"
          />
        </div>

        <div>
        <label for="firstname"> Firstname : </label>

          <input
            value={formData.relationship}
            onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="Relationship status"
            name="relationship"
          />
        </div>

        <div>
          Profile image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button className="button infoButton" type="submit">
          Update
        </button>
      </form> */}
      <div className="editingForm">
      <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your Info</h3>
        
        <div>
          <div className="form-group ">
            <label htmlFor="firstname">First Name:</label>
            <input
              value={formData.firstname}
              onChange={handleChange}
              type="text"
              id="firstname"
              placeholder="First Name"
              name="firstname"
              className="infoInput"
            />
          </div>
          <div className="form-group side">
            <label htmlFor="lastname">Last Name:</label>
            <input
              value={formData.lastname}
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              name="lastname"
              className="infoInput"
            />
          </div>
        </div>
        <div className="group">
          <div className="form-group">
            <label htmlFor="worksAt">Works at:</label>
            <input
              value={formData.worksAt}
              onChange={handleChange}
              type="text"
              placeholder="Works at"
              name="worksAt"
              className="infoInput"
            />
          </div>
          <div className="form-group side">
            <label htmlFor="relationship">Relationship status:</label>
            <input
              value={formData.relationship}
              onChange={handleChange}
              type="text"
              className="infoInput"
              placeholder="Relationship status"
              name="relationship"
            />
          </div>
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="livesIn">Lives in:</label>
            <input
              value={formData.livesIn}
              onChange={handleChange}
              type="text"
              placeholder="Lives in"
              name="livesIn"
              className="infoInput"
            />
          </div>
          <div className="form-group side">
            <label htmlFor="country">Country:</label>
            <input
              value={formData.country}
              onChange={handleChange}
              type="text"
              placeholder="Country"
              name="country"
              className="infoInput"
            />
          </div>
        </div>

        <div>
          <div className="form-group">
            <label htmlFor="profileImage">Profile Image:</label>
            <input type="file" name="profileImage" onChange={onImageChange} />
          </div>
          <div className="form-group">
            <label htmlFor="coverImage">Cover Image:</label>
            <input type="file" name="coverImage" onChange={onImageChange} />
          </div>
        </div>
        <button className="button infoButton" type="submit">
          Update
        </button>
      </form>
      </div>
    </Modal>
  );
};

export default ProfileModal;
