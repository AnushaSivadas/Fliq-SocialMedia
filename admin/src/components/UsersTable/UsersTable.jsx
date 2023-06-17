import * as React from "react";
import { useEffect,useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllUser } from "../../api/UserRequests";
import User from "./User";
import TablePagination from "@mui/material/TablePagination";


export default function BasicTable() {
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchPersons = async () => {
      console.log("here")
      try {
        const { data } = await getAllUser();
        console.log(data,"data")
      setPersons(data);

      } catch (error) {
        console.log(error.response.data.message)
        
      }
     
    };
    fetchPersons();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, persons.length - page * rowsPerPage);


  return (
      <div className="Table">
      {/* <h3>All Users</h3> */}
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029",maxHeight: '500px'  }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell align="left">Profile Pic</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Firstname</TableCell>
                <TableCell align="left">Lastname</TableCell>
                <TableCell align="left">Started</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {(rowsPerPage > 0
                  ? persons.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : persons
                ).map((person,index) =>{
                 return(
                <User person={person} index={page*rowsPerPage+index+1} key={person._id}/>
              )})}
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
        count={persons.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </div>
  );
}
