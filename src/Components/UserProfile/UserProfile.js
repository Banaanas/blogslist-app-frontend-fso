import { useSelector } from "react-redux";
import { Redirect, useRouteMatch } from "react-router-dom";
import SingleUserCard from "../SingleUser.js/SingleUserCard";

const UserProfile = () => {
  // ALL USERS - REDUX STATE
  const allUsers = useSelector((state) => state.allUsers);

  // useRouteMatch - Router
  const match = useRouteMatch("/users/:id");
  const matchID = match.params.id;

  const singleUser = allUsers.find((user) => user.id === matchID);

  // If Refresh on User's Page, then Redirect to UserS Page
  // (because Redux State has been refreshed)
  if (allUsers.length === 0) return <Redirect to="/users" />;

  return (
    <>
      <Typography display={"block"} variant={"overline"}>
        {singleUser.name}
      </Typography>
      <Typography display={"block"} variant={"caption"} fontStyle="italic">
        {singleUser.username}
      </Typography>
      <SingleUserCard singleUser={singleUser} />
    </>
  );
};

export default UserProfile;
