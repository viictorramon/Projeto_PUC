import styled from "styled-components";

export const ClientItemContainer = styled.div`
  display: grid;
  grid-template-columns: 0.85fr 0.9fr 1fr 1fr 0.12fr;

  width: 100%;

  padding: 0.15rem 0.5rem;
  margin: 5px 0 5px 0;
  
  border-radius: 6px;
  border: 1px solid ${props => props.theme["purple-light"]};
  background-color: ${props => props.theme.background};

  div {
    display: flex;
    justify-content: center;
    flex-direction: column;

    strong {
      color: ${props => props.theme.purple};
    }

    span {
      color: ${props => props.theme["purple-light"]};
    }

    svg:hover {
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
    }
  }
`