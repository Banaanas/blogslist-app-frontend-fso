import { pageTransition, pageVariants } from "../styles/animations";
import PageHeading from "../Components/PageHeading";
import AddBlogForm from "../Components/Forms/AddBlogForm";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";

const AddBlogPage = () => {
  return (
    <StyledPageMain
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="animate"
      exit="initial"
    >
      <PageHeading>ADD BLOG</PageHeading>
      <AddBlogForm />
    </StyledPageMain>
  );
};

export default AddBlogPage;
