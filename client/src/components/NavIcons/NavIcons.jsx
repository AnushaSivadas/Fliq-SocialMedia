import React, { useState } from "react";
import { UilSetting, UilUser } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { changePassword } from "../../api/UserRequests";
import Swal from "sweetalert2";


const NavIcons = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [formData, setFormData] = useState(null);
  const [opens, setOpens] = useState(false);
  const [existingPass, setExistingPass] = useState(true);
  const [newPass, setNewPass] = useState(true);
  const [confirmPass, setConfirmPass] = useState(true);

  const handleCloses = () => {
    setOpens(false);
    handleMenuClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const navigateToProfile = (profileUserId) => {
    navigate("/profile", { state: { profileUserId } });
  };
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuOptionClick = (option) => {
    if (option === "Change Password") {
      setOpens(true);
    } else if (option === "Deactivate") {
    }
    // Close the menu after handling the click
    // handleMenuClose();
  };
  const handlePasswordChange = async () => {
    setExistingPass(true);
    setConfirmPass(true);
    setNewPass(true)
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if(formData.newPass.match(regex)){
    if (formData.newPass === formData.confirm) {
      let userData = formData;
      userData.userId = user._id;
      const response = await changePassword(userData);
      if (response.data === "Incorrect password") {
        setExistingPass(false);
      } else if (response.data === "Successfully Changed") {
        setExistingPass(true);
        handleCloses();
        Swal.fire({
          title: "Success",
          text: "Password changed successfully",
          icon: "success",
        });
      }
      else if (response.data === "Successfully Created") {
        handleCloses();
        Swal.fire({
          title: "Success",
          text: "Password created successfully",
          icon: "success",
        });
      }
    } else {
      setConfirmPass(false);
    }
  }else{
    setNewPass(false)
  }
  };

  return (
    <div className="navIcons">
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>

      <UilUser
        style={{ cursor: "pointer" }}
        onClick={() => navigateToProfile(user._id)}
      />
      <IconButton
        aria-label="settings"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        style={{ marginTop: "-.5rem", color: "black" }} // Adjust the margin as per your needs
      >
        <UilSetting />
      </IconButton>
      <Menu
        id="menu"
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuOptionClick("Change Password")}>
          <b>Password & Security</b>
        </MenuItem>
        <Dialog open={opens} onClose={handleCloses} maxWidth="xs" fullWidth>
          <DialogTitle>{user.password?"Change Password":"Create Password"}</DialogTitle>

          <DialogContent>
            <div className="editingForm" style={{ marginRight: "1rem" }}>
              {user.password && <div className="form-group ">
                <label htmlFor="existing">Enter the existing password</label>
                <input
                  type="password"
                  onChange={handleChange}
                  id="existing"
                  placeholder="Existing password"
                  name="existing"
                  className="infoInput"
                />
                <span
                  style={{
                    color: "red",
                    fontSize: "12px",
                    alignSelf: "flex-end",
                    marginRight: "5px",
                    display: existingPass ? "none" : "block",
                  }}
                >
                  *Incorrect Password
                </span>
              </div>}
              <div className="form-group ">
                <label htmlFor="newPass">Enter the new password</label>
                <input
                  type="password"
                  onChange={handleChange}
                  id="newPass"
                  placeholder="New password"
                  name="newPass"
                  className="infoInput"
                />
                <span
                  style={{
                    color: "red",
                    fontSize: "12px",
                    alignSelf: "flex-end",
                    marginRight: "5px",
                    display: newPass ? "none" : "block",
                  }}
                >
                  *Must contain 8-16 letters,a special\ncharacter,a capital letter
                </span>
              </div>
              <div className="form-group ">
                <label htmlFor="confirm">Confirm the new password</label>
                <input
                  type="password"
                  onChange={handleChange}
                  id="confirm"
                  placeholder="Confirm password"
                  name="confirm"
                  className="infoInput"
                />
              </div>
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  alignSelf: "flex-end",
                  marginRight: "5px",
                  display: confirmPass ? "none" : "block",
                }}
              >
                *Confirm password is not same
              </span>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloses}>Cancel</Button>
            <Button onClick={handlePasswordChange}>Confirm</Button>
          </DialogActions>
        </Dialog>

        <MenuItem onClick={() => handleMenuOptionClick("Deactivate")}>
          <b style={{ color: "red" }}>Deactivate Account</b>
        </MenuItem>
      </Menu>
      <img src={Noti} alt="" />
      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>
    </div>
  );
};

export default NavIcons;
