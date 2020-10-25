import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import MenuBookIcon from "@material-ui/icons/MenuBook";
import { Link } from "react-router-dom";

const SingleUserBlogsList = ({ singleUser }) => {
  return (
    <React.Fragment>
      <List component="nav" aria-label="main mailbox folders">
        {singleUser.blogs.map((blog) => (
          <ListItem
            component={Link}
            to={`/blogs/${blog.id}`}
            button
            key={blog.id}
          >
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary={blog.title} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

export default SingleUserBlogsList;
