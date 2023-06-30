import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";


import "./ReportedPostModal.css";
function ReportedPostModal({ reportModalOpened, setReportModalOpened, data }) {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const theme = useMantineTheme();

data.reports.map((report)=>{
  const createdAt = new Date(report.createdAt);
const date = createdAt.getDate();
const month = createdAt.getMonth() + 1; 
const year = createdAt.getFullYear();

report.formattedDate = `${date}/${month}/${year}`;
})
  return (
    <Modal
      size={"75%"}
      centered
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={reportModalOpened}
      onClose={() => setReportModalOpened(false)}
    >
      <div className="PostModal">
      {data.post.video ? 
       <video src={data.post.video} controls  className="postModalImage"/> : <img
          src={data.post.image ? data.post.image : ""}
          alt=""
          className="postModalImage"
        />
      }
        <div className="followers">
          <div>
            <img
              src={
                data.user.profilePicture
                  ? data.user.profilePicture
                  : publicFolder + "defaultProfilee.png"}
              alt="profile"
              className="followerImage"
            />
              
          </div>
            <div className="name">
            <span><b>{data.user.username}</b></span>
            </div>
          <div>{data.post.desc}</div>
          <div>
            <div className="detail">
              

        <div className="Table">
          <TableContainer
            component={Paper}
            style={{
              boxShadow: "0px 13px 20px 0px #80808029",
              maxHeight: "500px",
            }}
          >
            <Table
              sx={{ minWidth: 500 }}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Reason</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.reports.map((post) => {
                  return (
                    <TableRow>
                      <TableCell>{post.user.username}</TableCell>
                      <TableCell>{post.formattedDate}</TableCell>
                      <TableCell>{post.reason}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

            </div>
          </div>
        </div>
      </div>

      
    </Modal>
  );
}

export default ReportedPostModal;
