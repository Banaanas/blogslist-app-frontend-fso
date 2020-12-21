import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import styled from "@emotion/styled";
import { AiTwotoneLike as LikeIcon } from "react-icons/ai";
import { IconButton } from "@chakra-ui/react";
import StyledTable from "../StyledComponents/StyledTable";
import { likeBlog } from "../../store/slices/blogsAllUsersSlice";

const StyledHomePageTable = styled(StyledTable)`
  /* First Cell on each Row */
  td:first-of-type {
    text-align: left;
  }
`;

const StyledLikeIcon = styled(LikeIcon)`
  margin: 0 !important;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 395px) {
    flex-direction: row;
  }
`;

const HomePageTable = () => {
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // ALL BLOGS ALL USERS - REDUX STATE
  const allBlogs = useSelector((state) => state.blogsAllUsers.data);

  // SORT BLOGS IN FUNCTION OF LIKES NUMBER - FUNCTION
  const sortBlogsFunction = (arr) => {
    const sortedArr = [...arr];

    // Reverse Array to first display
    sortedArr.reverse(); //
    sortedArr.sort((a, b) => (a.likes < b.likes ? 1 : -1));
    return sortedArr;
  };

  const sortedAllBlogs = sortBlogsFunction(allBlogs);

  // Data for React-Table
  const data = [...sortedAllBlogs];

  // React-Table Columns
  const columns = useMemo(
    () => [
      {
        Header: "Blog",
        accessor: "title", // Accessor is the "key" in the data
        Cell: ({ row }) => (
          // ID is accessed through row.original id
          // Other values are accessed through row.values.[nameofthevalue]

          <Link to={`/blogs/${row.original.id}`} data-cy="blog-title">
            {row.values.title}
          </Link>
        ),
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

            const updatedBlogObject = {
              blogId: blog.id,
              updatedBlog,
            };

            // Like Blog - Dispatch - Redux State
            dispatch(likeBlog(updatedBlogObject));
          };
          return (
            <StyledDiv>
              <IconButton
                aria-label="Like Blog"
                fontSize="1.5rem"
                colorScheme="transparent"
                onClick={() => handleAddLike(row.original)}
                icon={<StyledLikeIcon />}
                pos="static" // To make the Header overlap the IconButton
              />
              {row.values.likes}
            </StyledDiv>
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
    <>
      <StyledHomePageTable {...getTableProps()}>
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
      </StyledHomePageTable>
    </>
  );
};

export default HomePageTable;
