import React from "react";
import PageHeading from "../Components/PageHeading";
import AddBlogForm from "../Components/Forms/AddBlogForm";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";

const AddBlogPage = () => (
  <StyledPageMain>
    <PageHeading>ADD BLOG</PageHeading>
    <AddBlogForm />
  </StyledPageMain>
);

export default AddBlogPage;
