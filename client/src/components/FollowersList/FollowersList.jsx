import React, { useState, useEffect, useRef } from "react";
import API from "../../utils/axios";

const UsersList = () => {
  const [users, setusers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const response = await API.get(
          `/user/users/userslist?page=${page}&limit=10`
        );
        setusers((prevusers) => [...prevusers, ...response.data]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchusers();
  }, [page]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleClick = () => {
    console.log("page", page);
    console.log("loading", loading);
    console.log("users", users);
  };

  useEffect(() => {
    if (!loading) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (!loading) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
     
      <button onClick={handleClick}>Click me</button>
      <div ref={containerRef} style={{ height: "200px", overflow: "auto" }}>
        {users.map((user) => (
          <div key={user._id}>{user.username}</div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
