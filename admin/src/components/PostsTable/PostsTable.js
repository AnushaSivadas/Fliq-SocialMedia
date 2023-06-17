import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getTimelinePosts } from "../../actions/PostActions";
import Post from "./Post";
import TablePagination from "@mui/material/TablePagination";

export default function BasicTable() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.postReducer);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getTimelinePosts());
  }, []);

  if (!posts) return "No Posts";

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, posts.length - page * rowsPerPage);

  return (
    <div className="Table">
      {/* <h3>All Posts</h3> */}
      {loading
              ? "Fetching posts..."
              :""}
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029", maxHeight: "500px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="left">User</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left" style={{width:"60%"}}>Description</TableCell>
              <TableCell align="left">Likes</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
         
            { (rowsPerPage > 0
                  ? posts.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : posts
                ).map((post, index) => {
                  return <Post data={post} index={page*rowsPerPage+index+1} key={post._id} />;
                })}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={posts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
