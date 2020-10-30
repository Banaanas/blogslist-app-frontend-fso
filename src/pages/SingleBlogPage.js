import React from "react";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import SingleBlogCard from "../Components/SingleBlog/SingleBlogCard";

const SingleBlogPage = (props) => {
  return (
    <StyledPageMain>
      <SingleBlogCard/>
    </StyledPageMain>
  );
};

export default SingleBlogPage;
