import React from "react";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import SingleBlogCard from "../Components/SingleBlog/SingleBlogCard";
import BackButton from "../Components/BackButton";

const SingleBlogPage = () => {
  return (
    <StyledPageMain>
      <BackButton/>
      <SingleBlogCard />
    </StyledPageMain>
  );
};

export default SingleBlogPage;
