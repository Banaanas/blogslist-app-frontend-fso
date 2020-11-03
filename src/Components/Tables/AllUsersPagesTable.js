import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import StyledTable from "../StyledComponents/StyledTable";
import actionCreators from "../../store/actions/action-creators";

const AllUsersPagesTable = () => {
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // ALL USERS - REDUX STATE
  const data = useSelector((state) => state.allUsers);

  useEffect(() => {
    try {
      // Get blogsAllUsers - Dispatch - Redux State
      dispatch(actionCreators.getAllUsers());
    } catch (e) {
      dispatch(
        actionCreators.displayNotification(
          "warning",
          "Something went wrong with the server",
        ),
      );
    }
  }, [dispatch]);

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

export default AllUsersPagesTable;
