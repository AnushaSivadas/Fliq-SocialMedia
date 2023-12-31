import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector } from "react-redux";
const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, [user]);
 
  return (
    <div
    className="FollowersCard"
    style={{ maxHeight: "80vh", overflow: "auto" }}
  >
      
      <h3>People you may know</h3>

      
      {!location?(persons.slice(0,7).map((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} />;
      }))
      :
      (persons.map((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} />;
      }))
      }
      {!location ? (
        <span onClick={() => setModalOpened(true)}>Show more</span>
      ) : (
        ""
      )}

      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
};

export default FollowersCard;
