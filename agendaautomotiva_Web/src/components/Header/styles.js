import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  
  padding: 0.5rem 0;
`

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.75rem;
  color: ${props => props.theme['purple-light']};

  div {
    display: flex;
    flex-direction: column;
  }

  svg {
    font-size: 2rem;
  }
`

export const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 4px;

  padding: 0.25rem 0.5rem;

  border: 0;
  border-radius: 6px;

  font-size: 0.625rem;
  font-weight: 700;

  color: ${props => props.theme.white};
  background-color: ${props => props.theme['purple-light']};

  svg {
    font-size: 0.75rem;
  }

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.purple};
  }
`