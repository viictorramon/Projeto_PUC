import { useNavigate } from "react-router-dom";
import { Calendar, User } from 'phosphor-react'

import { HeaderContainer, LoginButton, Logo } from "./styles";
import { isAuthenticated, sessionUnregister } from "../../services/authServices";

export function Header() {
  const navigate = useNavigate()

  function handleClickInLogin() {
    navigate('/login')
  }

  function handleClickInLogout() {
    sessionUnregister()
    navigate('/')
  }

  return (
    <HeaderContainer>
      <Logo>
        <Calendar />
        <div>
          <strong>Agenda</strong>
          Automotiva
        </div>
      </Logo>
      {isAuthenticated() ?
        <LoginButton onClick={handleClickInLogout}>
          <User />
          LOGOUT
        </LoginButton>
        :
        <LoginButton onClick={handleClickInLogin}>
          <User />
          LOGIN
        </LoginButton>
      }
    </HeaderContainer>
  )
}