import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

const SingleBlog = () => {
  // ALL USERS - REDUX STATE
  const allBlogs = useSelector((state) => state.blogsAllUsers);
  // useRouteMatch - Router
  const match = useRouteMatch("/blogs/:id");
  const blogID = match.params.id;
  const blog = allBlogs.find((blog) => blog.id === blogID);

  return (
    <Card>
      <CardContent>
        <Typography variant={"h4"} color="textPrimary" gutterBottom>
          {blog.title}
        </Typography>
        <Typography color="textSecondary">{blog.author}</Typography>
        <Typography variant="body2" component="p">
          {blog.url}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">REMOVE</Button>
      </CardActions>
    </Card>
  );
};

export default SingleBlog;
