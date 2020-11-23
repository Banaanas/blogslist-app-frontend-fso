import styled from "@emotion/styled";

const StyledTable = styled.table`
  /** BORDER-COLLAPSE : COLLAPSE --> BORDER-RADIUS problems with some
      Browsers (Firefox among others)
   **/

  width: 95%;
  max-width: 750px;
  margin-top: 2rem;
  border-collapse: collapse;

  /* Table Head / Table Cells */
  th,
  td {
    width: 33%; /* 3 Columns */
    padding: 0.8rem;
    font-weight: bold;
    text-align: center;
    text-overflow: ellipsis;
  }

  /* Table Cells */
  td {
    color: ${({ theme }) => theme.colors.primary.dark};
    word-break: break-word;
  }

  /* Table Head */
  thead {
    th {
      color: ${({ theme }) => theme.colors.secondary.dark};
      text-transform: uppercase;
      background-color: ${({ theme }) => theme.colors.primary.dark};
    }

    /* First Table Head */
    th:first-of-type {
      /* Doesn't work with some Browsers */
      border-top-left-radius: 5px;
    }

    /* Last Table Head */
    th:last-of-type {
      /* Doesn't work with some Browsers */
      border-top-right-radius: 5px;
    }
  }

  tbody {
    tr:nth-of-type(odd) {
      background-color: ${({ theme }) => theme.colors.secondary.light};
    }

    tr:nth-of-type(even) {
      background-color: ${({ theme }) => theme.colors.secondary.main};
    }

    /* Last Table Row */
    tr:last-of-type {
      border-bottom-left-radius: 5px;

      /* First Cell in Last Table Row */
      td:first-of-type {
        /* Doesn't work with some Browsers */
        border-bottom-left-radius: 5px;
      }

      /* Last Cell in Last Table Row */
      td:last-of-type {
        /* Doesn't work with some Browsers */
        border-bottom-right-radius: 5px;
      }
    }

    /* Icon(s) in Table */
    svg {
      margin-right: 3rem;
      color: ${({ theme }) => theme.colors.primary.dark};
      font-size: 1.8rem;
      transform: scale(1);
      opacity: 1;
      transition: transform, opacity, 200ms ease;
    }

    svg:hover {
      transform: scale(1.1);
      opacity: 0.9;
    }

    /* Links */
    a {
      text-decoration-line: underline;
    }

    a:visited {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export default StyledTable;
