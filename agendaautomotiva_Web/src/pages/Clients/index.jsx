import { useEffect, useState } from "react";
import { ClientItem } from "../../components/ClientItem";
import { getAllClients } from "../../services/clientService";
import { ClientsContainer, ListOfClients } from "./styles";

export function Clients() {
  const [clients, setClients] = useState([])

  useEffect(() => {
  const userToken = localStorage.getItem('@agenda-automotiva-1.0.0-userToken')
  
  getAllClients(userToken)
  .then((res) => {
    if (res.error) {
      alert(res.error)
    } else {
      setClients(res)
    }
  })
  .catch((error) => {
    console.log(error)
  })

  }, [])
  
  return (
    <ClientsContainer>
      <strong>
        Clientes
      </strong>
      <ListOfClients>
        {
          clients.map(client => {
            return <ClientItem
              key={client._id}
              client={client}
            />
          })
        }
      </ListOfClients>
    </ClientsContainer>
  )
}