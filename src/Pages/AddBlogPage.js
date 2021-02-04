import { useSelector } from "react-redux";
import { pageTransition, pageVariants } from "../styles/animations";
import PageHeading from "../Components/PageHeading";
import AddBlogForm from "../Components/Forms/AddBlogForm";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";

const AddBlogPage = () => {
  // SIDE MENU - REDUX STATE
  const isMenuOpen = useSelector((state) => state.sideMenu.isMenuOpen);

  return (
    <StyledPageMain
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="animate"
      exit="initial"
      isMenuOpen={isMenuOpen}
    >
      <PageHeading>ADD BLOG</PageHeading>
      <AddBlogForm />
    </StyledPageMain>
  );
};

export default AddBlogPage;
