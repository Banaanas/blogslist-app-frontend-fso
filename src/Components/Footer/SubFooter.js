import styled from "@emotion/styled";
import { FaOm as AumIcon } from "react-icons/fa";

const StyledAumIcon = styled(AumIcon)`
  margin: 0 0.5rem;
  color: #ec3956;
  font-size: 1rem;
`;

const StyledSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 0;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.primary.dark};

  a {
    color: #f04328;
    text-decoration: none;
  }
`;

const SubFooter = () => (
  <>
    <StyledSpan>
      <span>
        <a href="https://cyrilo.dev">CyrilO</a> | Handcrafted with
      </span>
      <StyledAumIcon />
    </StyledSpan>
  </>
);

export default SubFooter;
