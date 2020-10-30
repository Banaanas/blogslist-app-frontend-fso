import React from "react";
import PageHeading from "../Components/PageHeading";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import AddBlogForm from "../Components/AddBlogForm";

const AddBlogPage = () => {
  return (
    <StyledPageMain>
      <PageHeading>ADD BLOG</PageHeading>
      <AddBlogForm/>
    </StyledPageMain>
  );
};

export default AddBlogPage;
