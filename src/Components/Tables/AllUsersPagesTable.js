import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import StyledTable from "../StyledComponents/StyledTable";

const AllUsersPagesTable = () => {
  // ALL USERS - REDUX STATE
  const data = useSelector((state) => state.allUsers.data);

  // Table Columns
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name", // Accessor is the "key" in the data
      },
      {
        Header: "Username",
        accessor: "username",
        Cell: ({ row }) => (
          // ID is accessed through row.original id
          // Other values are through row.values.[nameofthevalue]
          // Other values are through row.values.[nameofthevalue]
          <Link to={`/users/${row.original.id}`}>{row.values.username}</Link>
        ),
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
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default AllUsersPagesTable;
