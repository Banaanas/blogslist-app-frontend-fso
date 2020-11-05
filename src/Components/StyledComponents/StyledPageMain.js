import styled from "@emotion/styled";

const StyledPageMain = styled.main`
  position: ${({ relativePosition }) =>
    relativePosition ? "relative" : "static"};
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: auto;
  margin-top: 8rem; /* To match the Fixed Header Height */
  padding: 1rem;
  font-size: 1.2rem;
`;

export default StyledPageMain;
