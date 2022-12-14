import { SchedulingItemContainer } from "./styles";
import { format } from "date-fns"

export function SchedulingItem({ scheduling }) {
  return (
    <SchedulingItemContainer>
      <div>
        <strong>Veículo</strong>
        <span>{scheduling.licensePlate}</span>
      </div>
      
      <div>
        <strong>Cliente</strong>
        <span>{scheduling.client.name ?? "Não Cadastrado"}</span>
      </div>

      <div>
        <strong>Horário</strong>
        <span>{format(new Date(scheduling.dateOfScheduling), 'dd/MM/yyyy HH:mm')}</span>
      </div>

      <div>
        <strong>Descrição</strong>
        <span>{scheduling.description}</span>
      </div>
    </SchedulingItemContainer>
  )
}