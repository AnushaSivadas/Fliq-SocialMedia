import React, { useState } from "react";
import "./RightSide.css";
import { useSelector } from "react-redux";
import ShareModal from "../ShareModal/ShareModal";
import NavIcons from "../NavIcons/NavIcons";
import FollowersCard from "../FollowersCard/FollowersCard";
import { UilSearch } from "@iconscout/react-unicons";
import { searchAllUsers } from "../../api/UserRequests";
import SearchedUsers from "../SearchedUsers/SearchedUsers";
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";


const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [search, setSearch] = useState(null);
  let [searchUsers, setSearchUsers] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setShowSearch(false);
  };
const navigateToProfile = (profileUserId) => {
    navigate("/profile", { state : { profileUserId } });
    setSearch("")
  };
  async function handleSubmit() {
    try {
      if (search) {
        let response = await searchAllUsers(search,user._id);
        setSearchUsers(response.data);
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    } catch (error) {
      if (error.response) {
        console.log(error.message);
      } else {
        console.log(error.messag, "error connection");
      }
    }
  }

  return (
    <div className="RightSide hidden">
      {/* Side Navbar */}

      <NavIcons />

      {/* SearchBar */}
      <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }} 
      >
        <div className="Search ">
          <input
            type="text"
            placeholder="#Explore"
            id="search"
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="s-icon">
            <UilSearch />
          </button>
        </div>
        {showSearch &&
        <div className="" style={{display:"flex",justifyContent:"end",paddingRight:"10px",paddingTop:"5px"}}
        onClick={()=>toggleVisibility()}><AiOutlineClose/>
        </div>}
      </form>

      <div className="Chat-list ">
        {showSearch &&
          searchUsers.map((user, index) => (
            <div
              key={index}
              onClick={()=>navigateToProfile(user._id)}
            >
              <SearchedUsers
                toggleVisibility={toggleVisibility}
                userData={user}
              />
            </div>
          ))}
      </div>

<FollowersCard />



      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
