import React, { useState } from "react";
import "./Sidebar.css";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { logout } from "../actions/AuthActions";

const Sidebar = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const handleLogout = () => {
      dispatch(logout())    
  };

  const location = useLocation()
  const [selected,setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>
          Fl<span>i</span>q
        </span>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div style={{textDecoration:"none",color:"black"}} className={ location.pathname === item.path ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => {
                navigate(item.path)
                setSelected(index)}}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem" onClick={handleLogout}>
          <UilSignOutAlt /> Logout
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
