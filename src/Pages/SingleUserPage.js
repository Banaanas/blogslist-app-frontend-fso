import { useSelector } from "react-redux";
import { pageTransition, pageVariants } from "../styles/animations";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import SingleUserCard from "../Components/SingleUser.js/SingleUserCard";
import HomePageButton from "../Components/HomePageButton";

const SingleUserPage = () => {
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
      <SingleUserCard />
    </StyledPageMain>
  );
};

export default SingleUserPage;
