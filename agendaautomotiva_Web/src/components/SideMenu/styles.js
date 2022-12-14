import styled from "styled-components";

export const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1.5rem;

  width: 16rem;
  max-height: 15rem;

  gap: 8px;

  border-radius: 6px 18px;
  box-shadow: 1px 1px 2.5px 1px gray;

  background-color: ${props => props.theme.white};

  svg {
    font-size: 3.5rem;
    color: ${props => props.theme.purple};
  }

  a {
    text-decoration: none;

    color: ${props => props.theme.purple};

    border-bottom: 1px solid transparent;

    &:hover {
      border-bottom: 1px solid ${(props) => props.theme.purple};
    }

    &.active {
      font-weight: bold;
    }
    
  }
`

export const EmployeeInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 1rem;

  border-bottom: 1px gray solid;

  span:first-child {
    color: ${props => props.theme.purple};
    font-weight: bold;
  }

  span:last-child {
    color: ${props => props.theme.purple};
    font-size: 0.75rem;
  }
`