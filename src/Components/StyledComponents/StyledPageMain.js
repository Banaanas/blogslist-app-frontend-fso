import styled from "@emotion/styled";
import { motion } from "framer-motion";

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
`;

export default StyledPageMain;
