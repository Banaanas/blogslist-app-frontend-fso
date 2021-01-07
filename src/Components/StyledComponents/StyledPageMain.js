import { motion } from "framer-motion";
import styled from "@emotion/styled";

const StyledPageMain = styled(motion.main)`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: auto;
  margin-top: 8rem; /* To match the Fixed Header Height */
  padding: 1rem 1rem 2rem 1rem;
  font-size: 1.2rem;
  filter: ${({ isMenuOpen }) => (isMenuOpen ? "blur(20px)" : "blur(0)")};
  transition: filter, 300ms ease;
`;

export default StyledPageMain;
