import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import { IconButton } from "@chakra-ui/core";
import { IoIosRemoveCircle as RemoveIcon } from "react-icons/io";
import StyledTable from "../StyledComponents/StyledTable";
import actionCreators from "../../store/actions/action-creators";

const StyledMyBlogsTable = styled(StyledTable)`
  /* 4 Columns */
  th,
  td {
    width: 20%;
  }
  caption {
    margin-bottom: 1rem;
    font-weight: bold;
  }
`;

const StyledRemoveIcon = styled(RemoveIcon)`
  margin: 0 !important;
  font-size: 0.5rem;
`;

const MyBlogsPageTable = () => {
  // ALL BLOGS SINGLE USER - REDUX STATE
  const allBlogsSingleUser = useSelector((state) => state.blogsSingleUser);

  // ALL BLOGS ALL USERS - REDUX STATE
  const data = [...allBlogsSingleUser];

  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // Table Columns
  const columns = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title", // Accessor is the "key" in the data
        Cell: ({ row }) => {
          // ID is accessed through row.original id
          // Other values are through row.values.[nameofthevalue]
          return (
            <Link to={`/blogs/${row.original.id}`}>{row.values.title}</Link>
          );
        },
      },
      {
        Header: "Author",
        accessor: "author",
      },

      {
        Header: "Likes",
        accessor: "likes",
        Cell: ({ row }) => {
          // ID is accessed through row.original id
          // Other values are through row.values.[nameofthevalue]
          // Original Object (ID + values) is stored in row.original
          return <React.Fragment>{row.values.likes}</React.Fragment>;
        },
      },
      {
        Header: "Remove",
        Cell: ({ row }) => {
          // ID is accessed through row.original id
          // Other values are through row.values.[nameofthevalue]
          // Original Object (ID + values) is stored in row.original

          // DELETE BLOG - FUNCTION
          // Delete Blog Function had to be located inside the useMemo
          // to get ESLINT stop its "missing dependency" Warning

          const handleDeleteBlog = (id) => {
            // Delete Blog - Dispatch - Redux State
            dispatch(actionCreators.deleteBlog(id));
          };

          return (
            <React.Fragment>
              <IconButton
                aria-label="Remove Blog"
                fontSize="1.5rem"
                colorScheme="transparent"
                onClick={() => handleDeleteBlog(row.original.id)}
                icon={<StyledRemoveIcon />}
                pos="static" // To make the Header overlap the IconButton
              />
            </React.Fragment>
          );
        },
      },
    ],
    [dispatch],
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
    <React.Fragment>
      <StyledMyBlogsTable {...getTableProps()}>
        <caption>MY BLOGS</caption>
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
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledMyBlogsTable>
    </React.Fragment>
  );
};

export default MyBlogsPageTable;
