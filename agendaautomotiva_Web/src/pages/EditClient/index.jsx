import { EditClientContainer, FormEditClient, FormTitle, FormInput, SubmitButton, DateInput } from "./styles";
import { useParams } from "react-router-dom";
import { getClientById, editClientById } from "../../services/clientService";
import { useState, useEffect } from "react";
import { CpfMask } from '../../components/ClientItem'
import { parseISO, format } from "date-fns";

export function EditClient() {
  const { clientid } = useParams();
  const [clientCpf, setClientCpf] = useState();
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhoneNumber, setClientPhoneNumber] = useState();
  const [clientDateOfBirthdate, setClientDateOfBirthdate] = useState();
  const [clientAddress, setClientAddress] = useState("")

  useEffect(() => {
    const userToken = localStorage.getItem('@agenda-automotiva-1.0.0-userToken')

    getClientById(userToken, clientid)
      .then((res) => {
        if (res.error) {
          alert(res.error)
        } else {
          setClientCpf(res.cpf)
          setClientName(res.name)
          setClientEmail(res.email)
          setClientPhoneNumber(res.phoneNumber)
          setClientDateOfBirthdate(format(new Date(res.dateOfBirthdate), 'yyyy-MM-dd'))
          setClientAddress(res.address)
        }
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

  function handleChangeClientName(event) {
    setClientName(event.target.value)
  }

  function handleChangeClientEmail(event) {
    setClientEmail(event.target.value)
  }

  function handleChangeClientPhoneNumber(event) {
    setClientPhoneNumber(event.target.value)
  }

  function handleChangeClientDateOfBirthdate(event) {
    const dateOfBirthdate = format(new Date(event.target.value), 'yyyy-MM-dd')
    setClientDateOfBirthdate(dateOfBirthdate)
  }

  function handleChangeClientAddress(event) {
    setClientAddress(event.target.value)
  }


  async function handleSubmitForm(event) {

    const phoneNumber = event.target.phoneNumber.value

    const requestbody = {
      name: event.target.clientName.value,
      email: event.target.email.value,
      phoneNumber: parseInt(phoneNumber),
      dateOfBirthdate: parseISO(event.target.dateOfBirthdate.value).toISOString(),
      address: event.target.address.value
    }

    const userToken = localStorage.getItem('@agenda-automotiva-1.0.0-userToken')

    const request = await editClientById(userToken, clientid, requestbody)

    if (request.error) {
      alert(request.error)
    } else {
      alert("Cliente Editado")
    }
  }

  return (
    <EditClientContainer>
      <FormEditClient onSubmit={handleSubmitForm}>
        <FormTitle>Editar Cliente</FormTitle>
        CPF: {clientCpf ? CpfMask(clientCpf) : "erro ao buscar cpf"}

        <FormInput
          name="clientName"
          placeholder="Nome do Cliente"
          onChange={handleChangeClientName}
          value={clientName}
          required
        />

        <FormInput
          name="email"
          placeholder="email"
          onChange={handleChangeClientEmail}
          value={clientEmail}
          required
        />

        <FormInput
          name="phoneNumber"
          placeholder="Telefone"
          onChange={handleChangeClientPhoneNumber}
          value={clientPhoneNumber}
          required
        />

        <DateInput
          type="date"
          name="dateOfBirthdate"
          onChange={handleChangeClientDateOfBirthdate}
          value={clientDateOfBirthdate}
          required
        />

        <FormInput
          name="address"
          placeholder="Endereço"
          onChange={handleChangeClientAddress}
          value={clientAddress}
          required
        />

        <SubmitButton>
          EDITAR
        </SubmitButton>

      </FormEditClient>
    </EditClientContainer>
  )
}