import { useState } from "react";
import { DateInput, FormInput, FormScheduling, FormTitle, SchedulingContainer, SubmitButton, TimeInput } from "./styles";

import { parseISO, format } from "date-fns";
import { schedulingCreate } from "../../services/schedulingService";
import { cpfMask, licensePlateMask } from "../../masks/Masks";

const today = format(new Date(), 'yyyy-MM-dd')
const hourNow = format(new Date(), 'HH:mm')

export function Scheduling() {
  const [scheduleHour, setScheduleHour] = useState(hourNow)
  const [scheduleDate, setScheduleDate] = useState(today)
  const [cpf, setCpf] = useState('')
  const [licensePlate, setLicensePlate] = useState('')

  const scheduleISODatetime = parseISO(`${scheduleDate}T${scheduleHour}`).toISOString()

  function handleChangeScheduleDate(event) {
    setScheduleDate(event.target.value)
  }

  function handleChangeScheduleHour(event) {
    setScheduleHour(event.target.value)
  }

  async function handleSubmitForm(event) {
    event.preventDefault()

    const requestbody = {
      dateOfScheduling: scheduleISODatetime,
      descripton: event.target.description.value,
      clientCpf: cpf,
      licensePlate: event.target.licensePlate.value
    }

    const request = await schedulingCreate(requestbody)

    if (request.error) {
      alert(request.error)
    } else {
      const { dateOfScheduling, licensePlate } = request
      alert(`Agendamento realizado\n\nData: ${format(new Date(dateOfScheduling), 'dd/MM/yyyy às HH:mm')}\nVeículo: ${licensePlate}`)
    }
  }

  function handleChangeCPFInput(event) {
    event.target.setCustomValidity('')
    setCpf(cpfMask(event.target.value))
  }

  function handleChangeLicensePlateInput(event) {
    event.target.setCustomValidity('')
    setLicensePlate(licensePlateMask(event.target.value))
  }

  function handleChangeInput(event) {
    event.target.setCustomValidity('')
  }

  function handleInvalidInput(event) {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  return (
    <SchedulingContainer>
      <FormScheduling onSubmit={handleSubmitForm}>
        <FormTitle>Faça seu agendamento</FormTitle>
        <FormInput
          name="licensePlate"
          placeholder="Placa do Veículo"
          onChange={handleChangeLicensePlateInput}
          onInvalid={handleInvalidInput}
          value={licensePlate}
          required />
        <FormInput
          name="clientCPF"
          placeholder="CPF do Proprietário"
          onChange={handleChangeCPFInput}
          onInvalid={handleInvalidInput}
          value={cpf}
          required />
        <FormInput
          name="description"
          placeholder="Descrição"
          onChange={handleChangeInput}
          onInvalid={handleInvalidInput}
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
        <SubmitButton>
          <strong>AGENDAR</strong>
        </SubmitButton>
      </FormScheduling>
    </SchedulingContainer>
  )
}