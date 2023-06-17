import React, { useState } from "react";
import "./RightSide.css";

import ShareModal from "../ShareModal/ShareModal";
import NavIcons from "../NavIcons/NavIcons";
import FollowersCard from '../FollowersCard/FollowersCard'
const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="RightSide">
      {/* Side Navbar */}

      <NavIcons />
    
      <FollowersCard/>
      {/* Share buttong */}
      {/* <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button> */}
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
