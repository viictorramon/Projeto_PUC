import styled from "styled-components";

export const ClientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 1.5rem;
  width: 100%;

  border-radius: 6px 36px;
  box-shadow: 2px 2px 5px 2px gray;

  background-color: ${props => props.theme.white};

  strong {
    color: ${props => props.theme.purple};
  }
`

export const ListOfClients = styled.div`
  display: flex;
  flex-direction: column;
`