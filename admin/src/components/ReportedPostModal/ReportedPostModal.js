import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";


import './ReportedPostModal.css'
function ReportedPostModal({ reportModalOpened, setReportModalOpened,data }) {
  const theme = useMantineTheme();
  console.log("mwonu",data)
   
  data.map((post)=>{

  // const createdAt = new Date(post.createdAt);
  //   const date = createdAt.getDate();
  //   const month = createdAt.getMonth() + 1;  
  //   const year = createdAt.getFullYear();    
  //   data.formattedDate = `${date}/${month}/${year}`;
  })
  
  return (
    <Modal
      size={"50%"}
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
      <div className="ReportedPostModal">
   
     <div className="Table">
     <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029", maxHeight: "500px" }}
      >
      <Table  sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
      <TableHead>
        <TableRow>
            <TableCell>Reported User</TableCell>
            <TableCell>Reported Date</TableCell>
            <TableCell>Reported Reason</TableCell>
        </TableRow>
      </TableHead>
      <TableBody >
          {data.map((post)=>{
            return(
        <TableRow>
            <TableCell>{post.user.username}</TableCell>
            <TableCell>{post.formattedDate}</TableCell>
            <TableCell>{post.reason}</TableCell>
        </TableRow>
          )})}
      </TableBody>
      </Table>
      </TableContainer>
      </div>
   
      </div>
    </Modal>
  );
}

export default ReportedPostModal;
