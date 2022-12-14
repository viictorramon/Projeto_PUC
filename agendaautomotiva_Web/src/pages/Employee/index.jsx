import { useEffect, useState } from "react";
import { SchedulingItem } from "../../components/SchedulingItem";
import { getAllScheduling } from "../../services/schedulingService";
import { EmployeeContainer, ListOfScheduling } from "./styles";

export function Employee() {
  const [schedulings, setSchedulings] = useState([])

  useEffect(() => {
  const userToken = localStorage.getItem('@agenda-automotiva-1.0.0-userToken')
  
  getAllScheduling(userToken)
  .then((res) => {
    if (res.error) {
      alert(res.error)
    } else {
      setSchedulings(res)
    }
  })
  .catch((error) => {
    console.log(error)
  })

  }, [])

  return (
    <EmployeeContainer>
        <strong>
          Agendamentos
        </strong>
        <ListOfScheduling>
          {
            schedulings.map(scheduling => {
              return <SchedulingItem
                key={scheduling._id}
                scheduling={scheduling}
              />
            })
          }
        </ListOfScheduling>
    </EmployeeContainer>
  )
}