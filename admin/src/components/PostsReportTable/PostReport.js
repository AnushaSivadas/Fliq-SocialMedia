import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { UilInfoCircle } from "@iconscout/react-unicons";
import ReportedPostModal from "../ReportedPostModal/ReportedPostModal.js";
import Swal from "sweetalert2";
import * as PostsApi from "../../api/PostsRequests";

const makeStyle = (status) => {
  if (!status) {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  }
};

const Post = ({ data, index }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const [reportedPostInfoOpen, setReportedPostInfoOpened] = useState(false);
  const [status, setStatus] = useState(data.post.status);

  const handleClick = () => {
    setReportedPostInfoOpened(true);
  };
  const handleButtonClick = () => {
    Swal.fire({
      title: status ? "Do you want to report?" : "Do you want to activate?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // User clicked "Yes"
        const res = await PostsApi.blockPost(data.post._id, { status: status });
        setStatus(!status);
        status
          ? Swal.fire("Reported!", "The post has been reported.", "success")
          : Swal.fire("Activated!", "The post has been activated.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked "No" or closed the dialog
        console.log('User clicked "No"');
      }
    });
  };
  return (
    <TableRow
      key={data._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {index}.
      </TableCell>
      <TableCell align="left">
        <b>{data.user.username}</b>
      </TableCell>

      <TableCell align="left">
       {data.post.video ? 
       <video src={data.post.video} controls  className="postImage"/> : 
       <img src={
            data.post.image
              ? data.post.image
              : publicFolder + "defaultProfilee.png"
          }
          alt="post"
          className="postImage"
        />}
      </TableCell>

      <TableCell align="left">{data.post.desc}</TableCell>
      <TableCell>{data.reports.length}</TableCell>

      <TableCell align="center">
        <div onClick={handleClick}>{<UilInfoCircle fill="gray" />}</div>
        <ReportedPostModal
          reportModalOpened={reportedPostInfoOpen}
          setReportModalOpened={setReportedPostInfoOpened}
          data={data}
        />
      </TableCell>

      <TableCell align="left">
        <span
          className="status"
          style={{ ...makeStyle(!status), cursor: "pointer" }}
          onClick={handleButtonClick}
        >
          {!status ? "Reported" : "Active"}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default Post;
