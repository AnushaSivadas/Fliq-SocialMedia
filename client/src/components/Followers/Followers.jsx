import React, { useEffect, useState } from "react";
import "./Followers.css";
import { Modal, useMantineTheme } from "@mantine/core";
import User from "../User/User";



const Followers = ({ modalOpened, setModalOpened, persons }) => {
  const theme = useMantineTheme();

  useEffect(() => {}, []);

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      fullscreen
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div
        className="FollowersCard"
        style={{ maxHeight: "80vh", overflow: "auto" }}
      >
        <h3>Followers List</h3>

        {persons.map((person, id) => {
           return <User person={person} key={id} />;
        })}
      </div>
      <br />
      <br />
    </Modal>
  );
};

export default Followers;
