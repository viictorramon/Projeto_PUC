import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { employeeLogin } from "../../services/employeeService";
import { FormInput, FormLogin, FormTitle, LoginContainer, SubmitButton } from "./styles";

import { sessionRegister } from "../../services/authServices";

export function Login() {
  const navigate = useNavigate();
  const [employeeEmail, setEmployeeEmail] = useState('')
  const [employeePassword, setEmployeePassword] = useState('')

  async function handleSubmitForm(event) {
    event.preventDefault()

    const requestbody = {
      email: employeeEmail,
      password: employeePassword,
    }

    const request = await employeeLogin(requestbody)

    if (request.error) {
      alert(request.error)
    } else {
      console.log("Deu certo o login")
      sessionRegister(request);
      navigate('/employee');
    }
  }

  function handleChangeEmailInput(event) {
    event.target.setCustomValidity('')
    setEmployeeEmail(event.target.value)
  }

  function handleChangePasswordInput(event) {
    event.target.setCustomValidity('')
    setEmployeePassword(event.target.value)
  }

  return (
    <LoginContainer>
      <FormLogin onSubmit={handleSubmitForm}>
        <FormTitle>
          Login
        </FormTitle>
        <FormInput
          type="email"
          placeholder="Email"
          onChange={handleChangeEmailInput}
          value={employeeEmail}
          required
        />
        <FormInput
          type="password"
          placeholder="Senha"
          onChange={handleChangePasswordInput}
          value={employeePassword}
          required
        />
        <SubmitButton>
          <strong>ENTRAR</strong>
        </SubmitButton>
      </FormLogin>
    </LoginContainer>
  )
}