import { EmployeeInfos, SideMenuContainer } from "./styles";
import { User } from 'phosphor-react';
import { NavLink } from "react-router-dom";

export function SideMenu() {

  const employeeName = localStorage.getItem('@agenda-automotiva-1.0.0-userName')
  const employeeEmail = localStorage.getItem('@agenda-automotiva-1.0.0-userEmail')

  return (
    <SideMenuContainer>
      <User />

      <EmployeeInfos>
        <span>
          {employeeName}
        </span>
        <span>
          {employeeEmail}
        </span>
      </EmployeeInfos>

      <NavLink to="/employee" tittle="Agendamentos">
        Agendamentos
      </NavLink>

      <NavLink to="/newscheduling" tittle="Novo Agendamento">
        Criar Agendamento
      </NavLink>

      <NavLink to="/clients" tittle="Clientes">
        Clientes
      </NavLink>



    </SideMenuContainer>
  )
}