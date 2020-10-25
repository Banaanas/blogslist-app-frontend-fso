import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import React from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

const StyledTableCell = styled(TableCell)`
  font-weight: bolder;
  background-color: lightgoldenrodyellow;
`;

const AllUsersTable = () => {
  // ALL BLOGS ALL USERS - REDUX STATE
  const allUsers = useSelector((state) => state.allUsers);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User</StyledTableCell>
            <StyledTableCell align="center">Username</StyledTableCell>
            <StyledTableCell align="center">Blogs Created</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                <Typography component={Link} to={`/users/${user.id}`}>
                  {user.name}
                </Typography>
              </TableCell>
              <TableCell align="center">{user.username}</TableCell>
              <TableCell align="center">{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllUsersTable;
