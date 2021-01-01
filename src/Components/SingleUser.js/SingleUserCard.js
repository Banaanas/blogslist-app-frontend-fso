import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Flex,
  Heading,
  List,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import PageHeading from "../PageHeading";
import { getAllUsers } from "../../store/slices/allUsersSlice";

const SingleUserCard = () => {
  //  USERS - REDUX STATE
  const allUsers = useSelector((state) => state.allUsers.data);

  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // USEEFFECT
  useEffect(() => {
    // Get blogsAllUsers - Dispatch - Redux State
    dispatch(getAllUsers());
  }, [dispatch]);

  // useRouteMatch - Router
  const match = useRouteMatch("/users/:id");
  const userID = match.params.id;
  const user = allUsers.find((userApp) => userApp.id === userID);

  // To prevent Rendering of undefined user and Page Refresh issue
  if (user === undefined) return null;

  return (
    <>
      <VStack
        spacing="1.5rem"
        mb={10}
        px={0}
        py={5}
        width={["100%", "75%", "50%", "50%"]}
        borderWidth=".5rem"
        borderColor="secondary.main"
        borderRadius="10px"
        shadow="md"
      >
        <Heading
          size="sm"
          bg="primary.dark"
          p={2}
          textAlign="center"
          borderRadius={3}
        >
          USER
        </Heading>
        <Avatar bg="secondary.dark" name={user.username} size="2xl" />
        <PageHeading w="full" mr={0} p={2} bg="primary.dark" borderRadius={3}>
          {user.username}
        </PageHeading>

        <Heading size="sm">POSTED BLOGS</Heading>

        {/* Conditional Rendering, because <Flex> would still appear (Margin and Padding)
            even with no Blog created by User */}
        {user.blogs.length > 0 ? (
          <Flex
            justifyContent="space-around"
            mt="1rem"
            p={4}
            color="primary.dark"
            fontWeight="bold"
            bg="secondary.main"
            borderRadius="1rem"
            overflow="hidden"
          >
            <List>
              {user.blogs.map((blog) => (
                <ListItem key={blog.id}>- {blog.title}</ListItem>
              ))}
            </List>
          </Flex>
        ) : (
          <Heading size="sm" color="secondary.light" fontStyle="italic">
            No Blog Yet
          </Heading>
        )}
      </VStack>
    </>
  );
};

export default SingleUserCard;
