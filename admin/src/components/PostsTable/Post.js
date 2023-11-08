import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import defaultProfile from '../../img/defaultProfile.png'

const makeStyle=(status)=>{
  if(!status)
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else{
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
}

const Post = ({data,index}) => {

  return (
    <TableRow
      key={data._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
       {index}.
      </TableCell>
      <TableCell align="left">{data.userInfo.username || data.userInfo.firstname }</TableCell>
      <TableCell align="left" >
      <img
            src={
              data.image
                ? data.image
                : defaultProfile
            }
            alt="post"
            className="postImage"
          />
      </TableCell>
      <TableCell align="left">{data.desc}</TableCell>
      <TableCell align="left">{data.likes?.length}</TableCell>
      <TableCell align="left">
        <span className="status" 
        style={makeStyle(!data.status)}
        >
        {data.status ? "Active" : "Reported"}
        </span>
      </TableCell>
      
    </TableRow>
  );
};

export default Post;
