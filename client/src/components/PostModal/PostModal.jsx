import { Modal, useMantineTheme } from "@mantine/core";
import "./PostModal.css";
import { UilTrash } from "@iconscout/react-unicons";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../actions/PostsAction";

function PostModal({ modalOpened, setModalOpened, data, time }) {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleCommentDeletion = (comment) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteComment(comment, user._id));
        setModalOpened(false);
        Swal.fire("Deleted!", "The comment has been deleted.", "success");
      }
    });
  };
  return (
    <Modal
      size={data.image ? "75%" : "30%"}
      centered
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div className="PostModal">
        <img
          src={data.image ? data.image : ""}
          alt=""
          className="postModalImage"
        />
        <div className="followers">
          <div>
            <img
              src={
                data.userInfo.profilePicture
                  ? data.userInfo.profilePicture
                  : publicFolder + "defaultProfilee.png"
              }
              alt="profile"
              className="followerImage"
            />
            <div className="name">
              <span>{data.userInfo.username}</span>
              <span>{time} ago</span>
            </div>
          </div>
          <div>{data.desc}</div>
          <div>
            <div className="detail">
              {data.comments.map((comment, id) => {
                return (
                  <div className="singleComment">
                    <div>
                      <b>{comment.username}</b> {comment.comment}
                    </div>
                    {
                      comment.userId === user._id ? (
                        <div onClick={() => handleCommentDeletion(comment)}>
                          <UilTrash size="20" />
                        </div>
                      ) : (
                        <div style={{ display: "none" }}>
                          <UilTrash size="20" />
                        </div>
                      ) // or any other content you want to display when the condition is false
                    }
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default PostModal;
