import React, { useState } from "react";
import { UilSetting, UilUser } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { Link ,useNavigate} from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png"

const NavIcons = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const navigate = useNavigate();

  const navigateToProfile = (profileUserId) => {
    navigate("/profile", { state : { profileUserId } });
  };
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuOptionClick = (option) => {
    if(option==="Change Password"){

    }
    else if(option === "Deactivate"){
      
    }

    // Close the menu after handling the click
    handleMenuClose();
  };

  return (
    <div className="navIcons">
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>
      
        <UilUser 
        style = {{cursor:"pointer"}}
         onClick={ ()=>navigateToProfile(user._id)} 
        />
      <IconButton
        aria-label="settings"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        style={{ marginTop: "-.5rem" }} // Adjust the margin as per your needs
      
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
          <b>Change Password</b>
        </MenuItem>
        <MenuItem onClick={() => handleMenuOptionClick("Deactivate")}>
          <b style={{color:"red"}}>Deactivate Account</b>
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
