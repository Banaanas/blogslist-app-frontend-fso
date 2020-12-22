import { pageTransition, pageVariants } from "../styles/animations";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import SingleBlogCard from "../Components/SingleBlog/SingleBlogCard";
import HomePageButton from "../Components/HomePageButton";

const SingleBlogPage = () => (
  <StyledPageMain
    variants={pageVariants}
    transition={pageTransition}
    initial="initial"
    animate="animate"
    exit="initial"
  >
    <HomePageButton />
    <SingleBlogCard />
  </StyledPageMain>
);

export default SingleBlogPage;
