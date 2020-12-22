import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import { IconButton } from "@chakra-ui/react";
import { IoIosRemoveCircle as RemoveIcon } from "react-icons/io";
import StyledTable from "../StyledComponents/StyledTable";
import { deleteBlogSingleUser } from "../../store/slices/blogsSingleUserSlice";

const StyledMyBlogsTable = styled(StyledTable)`
  /* 4 Columns */
  th,
  td {
    width: 20%;
  }

  /* First Cell on each Row */
  td:first-of-type {
    text-align: left;
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

const MyProfilePageTable = () => {
  // ALL BLOGS SINGLE USER - REDUX STATE
  const allBlogsSingleUser = useSelector((state) => state.blogsSingleUser.data);

  useEffect(() => {}, [allBlogsSingleUser]);
  // ALL BLOGS ALL USERS - REDUX STATE
  const data = [...allBlogsSingleUser];

  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // Table Columns
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title", // Accessor is the "key" in the data
        Cell: ({ row }) => (
          // ID is accessed through row.original id
          // Other values are through row.values.[nameofthevalue]
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
        Cell: ({ row }) => (
          // ID is accessed through row.original id
          // Other values are through row.values.[nameofthevalue]
          // Original Object (ID + values) is stored in row.original
          <>{row.values.likes}</>
        ),
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
            dispatch(deleteBlogSingleUser(id));
          };

          return (
            <>
              <IconButton
                aria-label="Remove Blog"
                fontSize="1.5rem"
                colorScheme="transparent"
                onClick={() => handleDeleteBlog(row.original.id)}
                icon={<StyledRemoveIcon />}
                pos="static" // To make the Header overlap the IconButton
              />
            </>
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
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </StyledMyBlogsTable>
    </>
  );
};

export default MyProfilePageTable;
