import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import FollowersCard from "../FollowersCard/FollowersCard";

const FollowersModal = ({ modalOpened, setModalOpened }) => {
  const theme = useMantineTheme();
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      // size="50%"
      fullscreen    
      
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >

    <FollowersCard location='modal'/>
    <br/>
    <br/>
    </Modal>
  );
};

export default FollowersModal;
