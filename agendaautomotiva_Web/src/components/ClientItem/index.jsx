import { NavLink } from "react-router-dom";
import { ClientItemContainer } from "./styles";
import { Pencil } from 'phosphor-react';

export function CpfMask(cpf) {
  const cpfString = cpf.toString()

  return `${cpfString.slice(0,3)}.${cpfString.slice(3,6)}.${cpfString.slice(6,9)}-${cpfString.slice(9,11)}`
}

export function phoneNumberMask(kleber) {
  if (kleber){
    const phoneString = kleber.toString()

    return `(${phoneString.slice(0,2)}) ${phoneString.slice(2,7)}-${phoneString.slice(7,11)}`
  } else {
    return "-"
  }
}

export function ClientItem({ client }) {
  const editRoute = `/editclient/${client._id}`

  return (
    <ClientItemContainer>
      <div>
        <strong>CPF</strong>
        <span>{CpfMask(client.cpf)}</span>
      </div>
      
      <div>
        <strong>Nome</strong>
        <span>{client.name?? "-"}</span>
      </div>

      <div>
        <strong>Email</strong>
        <span>{client.email?? "-"}</span>
      </div>

      <div>
        <strong>Telefone</strong>
        <span>{phoneNumberMask(client.phoneNumber)}</span>
      </div>

      <div>
        <NavLink to={editRoute} title="Editar Cliente">
          <Pencil />
        </NavLink>
      </div>
    </ClientItemContainer>
  )
}