import React, { useState } from "react";
import { useDispatch } from "react-redux";
import actionCreators from "../../store/actions/action-creators";

const SingleUser = () => {
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // STATE - NEW BLOG
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogURL, setNewBlogURL] = useState("");

  // SET NEW BLOG TITLE - FUNCTION
  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value);
  };

  // SET NEW BLOG AUTHOR - FUNCTION
  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value);
  };

  // SET NEW BLOG URL - FUNCTION
  const handleURLChange = (event) => {
    setNewBlogURL(event.target.value);
  };

  // CREATE BLOG - FUNCTION
  const handleCreateBlog = (event) => {
    event.preventDefault();

    // Validation constraints
    if (newBlogTitle.length < 5) {
      return dispatch(
        actionCreators.displayNotification(
          "Titles must be at least 5 characters long",
        ),
      );
    }

    if (newBlogAuthor.length < 5) {
      return dispatch(
        actionCreators.displayNotification(
          "Author must be at least 5 characters long",
        ),
      );
    }

    if (newBlogURL.length < 5) {
      return dispatch(
        actionCreators.displayNotification(
          "URL must be at least 5 characters long",
        ),
      );
    }

    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
    };

    // Add Blog - Dispatch - Redux State
    dispatch(actionCreators.addBlog(blogObject));

    // Reinitialize Inputs
    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogURL("");
  };

  return (
    <React.Fragment>
      <form onSubmit={handleCreateBlog} data-testid="form">
        <div>
          <label htmlFor="title"> Title </label>
          <input
            id="title"
            value={newBlogTitle}
            onChange={handleTitleChange}
            data-cy="new-blog-title-input"
          />
        </div>
        <div>
          <label htmlFor="author"> Author </label>

          <input
            id="author"
            value={newBlogAuthor}
            onChange={handleAuthorChange}
            data-cy="new-blog-author-input"
          />
        </div>
        <div>
          <label htmlFor="URL"> URL </label>
          <input
            id="URL"
            value={newBlogURL}
            onChange={handleURLChange}
            data-cy="new-blog-url-input"
          />
        </div>
        <button type="submit">SAVE</button>
      </form>
    </React.Fragment>
  );
};

export default SingleUser;
