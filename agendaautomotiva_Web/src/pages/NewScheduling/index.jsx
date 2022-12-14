import { useState } from "react";
import { licensePlateMask, cpfMask } from "../../masks/Masks";
import { FormInput, FormNewScheduling, DateOfBirthInput, NewSchedulingContainer, FormTitle, DateInput, TimeInput, SubmitButton } from "./styles";
import { parseISO, format } from "date-fns";
import { getClientByCpf } from "../../services/clientService";
import { CpfMask } from "../../components/ClientItem";
import { schedulingCreate, schedulingFullCreate } from "../../services/schedulingService";

const today = format(new Date(), 'yyyy-MM-dd')
const hourNow = format(new Date(), 'HH:mm')

export function NewScheduling() {
  const [scheduleHour, setScheduleHour] = useState(hourNow)
  const [scheduleDate, setScheduleDate] = useState(today)
  const [licensePlate, setLicensePlate] = useState('')
  const [cpf, setCpf] = useState('')
  const [client, setClient] = useState({})
  const [renderClient, setRenderClient] = useState(false)

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhoneNumber, setClientPhoneNumber] = useState();
  const [clientDateOfBirthdate, setClientDateOfBirthdate] = useState();
  const [clientAddress, setClientAddress] = useState("")

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

  const scheduleISODatetime = parseISO(`${scheduleDate}T${scheduleHour}`).toISOString()

  async function clientAlreadyExist(inputCpf) {
    const filteredCpf = inputCpf.replace('.', '').replace('.', '').replace('-', '').slice(0, 11)

    const userToken = localStorage.getItem('@agenda-automotiva-1.0.0-userToken')

    const queryClient = await getClientByCpf(userToken, filteredCpf)

    if (queryClient) {
      setClient(queryClient)
      setRenderClient(true)
    } else {
      setClient({})
      setRenderClient(true)
    }
  }

  function handleChangeScheduleDate(event) {
    setScheduleDate(event.target.value)
  }

  function handleChangeScheduleHour(event) {
    setScheduleHour(event.target.value)
  }

  async function handleSubmitForm(event) {
    event.preventDefault(event.target.value)

    const filteredCpf = cpf.replace('.', '').replace('.', '').replace('-', '')

    if (client.cpf) {
      console.log("O Cliente já existe")

      const requestbody = {
        dateOfScheduling: scheduleISODatetime,
        description: event.target.description.value,
        clientCpf: filteredCpf,
        licensePlate: event.target.licensePlate.value
      }

      const request = await schedulingCreate(requestbody)

      if (request.error) {
        alert(request.error)
      } else {
        const { dateOfScheduling, licensePlate } = request
        alert(`Agendamento realizado\n\nData: ${format(new Date(dateOfScheduling), 'dd/MM/yyyy às HH:mm')}\nVeículo: ${licensePlate}`)
      }
    } else {
      console.log("O Cliente NAO existe")

      const requestbody = {
        dateOfScheduling: scheduleISODatetime,
        description: event.target.description.value,
        clientCpf: filteredCpf,
        licensePlate: event.target.licensePlate.value,
        clientInfos: {
          name: clientName,
          email: clientEmail,
          cpf: filteredCpf,
          phoneNumber: clientPhoneNumber,
          dateOfBirthdate: clientDateOfBirthdate,
          address: clientAddress
        }
      }

      const userToken = localStorage.getItem('@agenda-automotiva-1.0.0-userToken')
      const request = await schedulingFullCreate(userToken, requestbody)

      if (request.error) {
        alert(request.error)
      } else {
        const { dateOfScheduling, licensePlate } = request
        alert(`Agendamento realizado\n\nData: ${format(new Date(dateOfScheduling), 'dd/MM/yyyy às HH:mm')}\nVeículo: ${licensePlate}`)
      }
    }
  }

  function handleChangeCPFInput(event) {
    if (event.target.value.length >= 14) {
      clientAlreadyExist(event.target.value)
    }

    event.target.setCustomValidity('')
    setCpf(cpfMask(event.target.value))
  }

  function handleChangeLicensePlateInput(event) {
    event.target.setCustomValidity('')
    setLicensePlate(licensePlateMask(event.target.value))
  }

  function handleInvalidInput(event) {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  function handleChangeInput(event) {
    event.target.setCustomValidity('')
  }

  return (
    <NewSchedulingContainer>
      <FormNewScheduling onSubmit={handleSubmitForm}>
        <FormTitle>Novo Agendamento</FormTitle>

        <FormInput
          name="licensePlate"
          placeholder="Placa do veículo"
          onChange={handleChangeLicensePlateInput}
          onInvalid={handleInvalidInput}
          value={licensePlate}
          required
        />

        <FormInput
          name="description"
          placeholder="Descrição do agendamento"
          onChange={handleChangeInput}
          onInvalid={handleInvalidInput}
          required
        />

        <div>
          <DateInput
            type="date"
            min={today}
            onChange={handleChangeScheduleDate}
            value={scheduleDate}
            required
          />
          <TimeInput
            type="time"
            min="08:00"
            max="18:00"
            onChange={handleChangeScheduleHour}
            value={scheduleHour}
            required
          />
        </div>

        <FormInput
          name="clientCPF"
          placeholder="CPF do proprietário"
          onChange={handleChangeCPFInput}
          onInvalid={handleInvalidInput}
          value={cpf}
          required
        />

        {
          renderClient ?
            client.cpf ?
              <>
                <span>Nome: {client.name ?? "cadastro incompleto"}</span>
                <span>CPF: {CpfMask(client.cpf)}</span>
              </>
              :
              <>
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

                <DateOfBirthInput
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
              </>
            :
            ""
        }

        <SubmitButton>
          <strong>CRIAR</strong>
        </SubmitButton>

      </FormNewScheduling>
    </NewSchedulingContainer>
  )
}