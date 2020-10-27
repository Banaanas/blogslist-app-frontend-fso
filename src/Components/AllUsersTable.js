import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useTable } from "react-table";

const StyledTable = styled.table`
  width: 95%;
  min-width: 333px;
  max-width: 750px;
  border-collapse: collapse;

  th {
    color: ${({ theme }) => theme.colors.secondary.dark};
    text-transform: uppercase;
    background-color: ${({ theme }) => theme.colors.primary.dark};
  }

  th,
  td {
    padding: 0.8rem;
    text-align: left;
    text-overflow: ellipsis;
  }

  tr:nth-of-type(odd) {
    background-color: ${({ theme }) => theme.colors.secondary.light};
  }

  tr:nth-of-type(even) {
    background-color: ${({ theme }) => theme.colors.secondary.main};
  }

  td {
    width: 33%;
    color: ${({ theme }) => theme.colors.primary.dark};
    font-weight: bolder;
    text-overflow: ellipsis;
    word-break: break-word;
  }

  a {
    font-weight: bolder;
    text-decoration-line: underline;
  }

  a:visited {
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: bolder;
    text-decoration-line: underline;
  }
`;

const AllUsersTable = () => {
  // ALL BLOGS ALL USERS - REDUX STATE
  const data = useSelector((state) => state.allUsers);

  // Table Columns
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

  // React-Table Hook
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
