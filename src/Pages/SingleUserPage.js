import { pageTransition, pageVariants } from "../styles/animations";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import SingleUserCard from "../Components/SingleUser.js/SingleUserCard";
import HomePageButton from "../Components/HomePageButton";

const SingleUserPage = () => (
    <StyledPageMain
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="animate"
      exit="initial"
    >
      <HomePageButton />
      <SingleUserCard />
    </StyledPageMain>
  );

export default SingleUserPage;
