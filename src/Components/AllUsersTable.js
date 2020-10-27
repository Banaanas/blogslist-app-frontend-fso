import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import React from "react";
import { useTable } from "react-table";
import list from "../List";

const StyledTable = styled.table`
  width: 95%;
  min-width: 333px;
  max-width: 750px;
  border-collapse: collapse;

  th {
    color: ${({ theme }) => theme.palette.primary.light};
    text-transform: uppercase;
    background-color: ${({ theme }) => theme.palette.secondary.dark};
  }

  th,
  td {
    padding: 0.8rem;
    text-align: left;
    text-overflow: ellipsis;
  }

  tr:nth-of-type(odd) {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }

  tr:nth-of-type(even) {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }

  td {
    width: 33%;
    text-overflow: ellipsis;
    word-break: break-word;
  }

 
`;

const AllUsersTable = () => {
  // ALL BLOGS ALL USERS - REDUX STATE
  const data = useSelector((state) => state.allUsers);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // Accessor is the "key" in the data
      },
      {
        Header: "Username",
        accessor: "username",
        Cell: ({ row }) => {
          // ID is accessed through row.original id
          // Other values are through row.values.[nameofthevalue]
          return (
            <Link to={`/users/${row.original.id}`}>{row.values.username}</Link>
          );
        },
      },
      {
        Header: "Blogs Created",
        accessor: "blogs.length",
      },
    ],
    [],
  );
  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <StyledTable {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default AllUsersTable;
