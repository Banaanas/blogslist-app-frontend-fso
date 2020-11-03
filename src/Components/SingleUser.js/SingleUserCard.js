import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Flex, Heading, List, ListItem, VStack } from "@chakra-ui/core";
import PageHeading from "../PageHeading";

const SingleUserCard = () => {
  // ALL USERS - REDUX STATE
  const allUsers = useSelector((state) => state.allUsers);
  // useRouteMatch - Router
  const match = useRouteMatch("/users/:id");

  const userID = match.params.id;
  const user = allUsers.find((user) => user.id === userID);
  // To prevent Rendering of undefined blog and Page Refresh issue
  if (user === undefined) return null;

  return (
    <React.Fragment>
      <VStack
        spacing="3rem"
        mb={10}
        px={10}
        py={5}
        width={["100%", "75%", "75%", "50%"]}
        borderWidth="1rem"
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
        <PageHeading w="full" p={2} bg="primary.dark" borderRadius={3}>
          {user.username}{" "}
        </PageHeading>

        <Heading>BLOGS</Heading>

        <Flex
          justifyContent="space-around"
          mt="2rem"
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
      </VStack>
    </React.Fragment>
  );
};

export default SingleUserCard;
