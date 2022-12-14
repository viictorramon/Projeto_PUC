import styled from "styled-components";

export const SchedulingItemContainer = styled.div`
  display: grid;
  grid-template-columns: 0.75fr 1.2fr 1fr 2fr;

  width: 100%;

  padding: 0.15rem 0.5rem;
  margin: 5px 0 5px 0;
  
  border-radius: 6px;
  border: 1px solid ${props => props.theme["purple-light"]};
  background-color: ${props => props.theme.background};

  div {
    display: flex;
    flex-direction: column;

    strong {
      color: ${props => props.theme.purple};
    }

    span {
      color: ${props => props.theme["purple-light"]};
    }
  }
`