import { useSelector } from "react-redux";
import { pageTransition, pageVariants } from "../styles/animations";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import SingleBlogCard from "../Components/SingleBlog/SingleBlogCard";
import HomePageButton from "../Components/HomePageButton";

const SingleBlogPage = () => {
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
      <HomePageButton />
      <SingleBlogCard />
    </StyledPageMain>
  );
};

export default SingleBlogPage;
