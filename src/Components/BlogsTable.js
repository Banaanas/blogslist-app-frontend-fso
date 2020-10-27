import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import { AiTwotoneLike as LikeIcon } from "react-icons/ai";

import { IconButton } from "@chakra-ui/core";
import actionCreators from "../store/actions/action-creators";

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

  /* Like Icon */
  svg {
    margin-right: 3rem;
    color: ${({ theme }) => theme.colors.primary.dark};
    font-size: 2.5rem;
  }

  a {
    font-weight: bolder;
    text-decoration-line: underline;
  }

  a:visited {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const BlogsTable = () => {
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // ALL BLOGS ALL USERS - REDUX STATE
  const allBlogs = useSelector((state) => state.blogsAllUsers);

  // ALL BLOGS ALL USERS - REDUX STATE
  const loggedInUser = useSelector((state) => state.loggedInUser);

  // SORT BLOGS IN FUNCTION OF LIKES NUMBER - FUNCTION
  const sortedBlogs = (arr) => arr.sort((a, b) => (a.likes < b.likes ? 1 : -1));

  // ADD LIKE - FUNCTION
  const handleAddLike = (blog) => {
    const updatedLikeNumber = blog.likes + 1;

    const updatedBlog = {
      ...blog,
      likes: updatedLikeNumber,
    };

    try {
      // Like Blog - Dispatch - Redux State
      dispatch(actionCreators.likeBlog(blog.id, updatedBlog));

      console.log(loggedInUser);
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

  // ALL BLOGS ALL USERS - REDUX STATE
  const data = [...allBlogs];

  // Table Columns
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
          return (
            <React.Fragment>
              <IconButton
                aria-label="Like Blog"
                fontSize="1.5rem"
                colorScheme="transparent"
                onClick={() => handleAddLike(row.original)}
              >
                <LikeIcon />
              </IconButton>
              {row.values.likes}
            </React.Fragment>
          );
        },
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

export default BlogsTable;
