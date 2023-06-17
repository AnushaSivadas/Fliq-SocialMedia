import { Modal, useMantineTheme } from "@mantine/core";
import Swal from 'sweetalert2';
import './OptionsModal.css'
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import ReportModal from "../ReportModal/ReportModal.jsx";
import { deletePost} from "../../actions/PostsAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {updatePost} from '../../api/PostsRequests.js'




function OptionsModal({ modalOpen, setModalOpen, iconRef,post,userId }) {
  const dispatch = useDispatch();

  const theme = useMantineTheme();
  const [reportModalOpened,setReportModalOpened]=useState(false)
  const { user } = useSelector((state) => state.authReducer.authData);
  let isUsersPost=false

 if(userId===user._id){
   isUsersPost=true
 }
  const handleReportClick = () => {
   // setModalOpen(false); // Close the current modal
   setReportModalOpened(true); // Open the report modal
  };

  const handlePostDeletion = async() => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deletePost(post._id,user._id));
        setModalOpen(false);
        Swal.fire('Deleted!', 'The item has been deleted.', 'success');
      }
    });
    
    
  };


  const [opens, setOpens] = useState(false);
  const [desc, setDesc] = useState(post.desc);

  const handlePostEdit = () => {
    setOpens(true);
  };

  const handleCloses = () => {
    setOpens(false);
  };

  const handleClose = () => {
    setModalOpen(false)
  };

  const handleChangepost = () => {
    let postData = {
      userId: user._id,
      desc: desc,
    };
    updatePost(post._id, postData);
    setOpens(false);
  };

  return (
    <Modal
      size={"10%"}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.3}
      overlayBlur={0}
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
      style={{
        position: "fixed",
        top: iconRef.current
          ? iconRef.current.getBoundingClientRect().top - 30
          : 0,
        right: iconRef.current
          ? iconRef.current.getBoundingClientRect().right - 1730
          : 0,
      }}
    >
      <div className="options">
      {isUsersPost && (
        <div>
       <div onClick={handlePostEdit} >Edit</div>

       <Dialog open={opens} onClose={handleCloses}>
                  <DialogTitle>Edit Post</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <p className="text-red-500">
                        *Publishing this revision wil overwrite its orginal
                      </p>
                    </DialogContentText>
                    <TextField
                      autoFocus
                      defaultValue={post.desc}
                      margin="dense"
                      id="name"
                      type="text"
                      fullWidth
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleChangepost}>Confirm</Button>
                  </DialogActions>
               
               
         </Dialog>

       <hr/>
       <div onClick={handlePostDeletion}>Delete</div>
       </div>
      )}
        
        {!isUsersPost && (
          <div>
        <div style={{color:"red"}} onClick={handleReportClick}>Report</div>
        <ReportModal
        reportModalOpened={reportModalOpened}
        setReportModalOpened={setReportModalOpened}
        post={post}/>
        </div>
        )}
      </div>
      
    </Modal>
  );
}

export default OptionsModal;
