import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 3rem;
`

export const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 1.5rem;
  width: 23rem;

  border-radius: 6px 36px;
  box-shadow: 2px 2px 5px 2px gray;

  background-color: ${props => props.theme.white};

  div {
    display: flex;

    gap: 8px;
  }
`

export const FormTitle = styled.span`
  padding-bottom: 1rem;
  font-weight: 700;
  color: ${props => props.theme.purple};
`

export const FormInput = styled.input`
  width: 100%;
  min-height: 2.625rem;

  padding: 12px;

  font-size: 0.825rem;

  border-radius: 4px;
  border: 1px solid ${props => props.theme["purple-light"]};

  background-color: ${props => props.theme.background};

  &:focus {
    outline: 1px solid ${props => props.theme.purple};
  }
`

export const SubmitButton = styled.button`
  width: 100%;
  min-height: 2.625rem;
  margin-top: 1rem;

  border: 0;
  border-radius: 8px;

  color: ${props => props.theme.white};
  background-color: ${props => props.theme['purple-light']};

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.purple};
  }
`