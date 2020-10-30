import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import styled from "@emotion/styled";
import { AiTwotoneLike as LikeIcon } from "react-icons/ai";
import { IconButton } from "@chakra-ui/core";
import actionCreators from "../../store/actions/action-creators";
import StyledTable from "../StyledComponents/StyledTable";

const StyledLikeIcon = styled(LikeIcon)`
  margin: 0 !important;
`;

const HomePageTable = () => {
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // ALL BLOGS ALL USERS - REDUX STATE
  const allBlogs = useSelector((state) => state.blogsAllUsers);

  // ALL BLOGS ALL USERS - REDUX STATE
  const loggedInUser = useSelector((state) => state.loggedInUser);

  // SORT BLOGS IN FUNCTION OF LIKES NUMBER - FUNCTION
  const sortBlogsFunction = (arr) =>
    arr.sort((a, b) => (a.likes < b.likes ? 1 : -1));
  const sortedAllBlogs = sortBlogsFunction(allBlogs);

  // Data for React-Table
  const data = [...sortedAllBlogs];

  // React-Table Columns
  const columns = React.useMemo(
    () => [
      {
        Header: "Blog",
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

          // ADD LIKE - FUNCTION
          // Add Like Function had to be located inside the useMemo
          // to get ESLINT stop its "missing dependency" Warning
          const handleAddLike = (blog) => {
            const updatedLikeNumber = blog.likes + 1;

            const updatedBlog = {
              ...blog,
              likes: updatedLikeNumber,
            };

            try {
              // Like Blog - Dispatch - Redux State
              dispatch(actionCreators.likeBlog(blog.id, updatedBlog));

              if (loggedInUser === "") {
                dispatch(
                  actionCreators.displayNotification(
                    "error",
                    "You must be logged in to vote !",
                  ),
                );
              } else {
                dispatch(
                  actionCreators.displayNotification(
                    "success",
                    "One more Like for this blog !",
                  ),
                );
              }
            } catch (e) {
              dispatch(
                actionCreators.displayNotification(
                  `The blog "${updatedBlog.title}" was already deleted from server`,
                ),
              );
            }
          };
          return (
            <React.Fragment>
              <IconButton
                aria-label="Like Blog"
                fontSize="1.5rem"
                colorScheme="transparent"
                onClick={() => handleAddLike(row.original)}
                icon={<StyledLikeIcon />}
                pos="static" // To make the Header overlap the IconButton
                mr="1.5rem"
              />
              {row.values.likes}
            </React.Fragment>
          );
        },
      },
    ],
    [dispatch, loggedInUser],
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
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </React.Fragment>
  );
};

export default HomePageTable;
