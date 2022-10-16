import { api } from "./api"

export async function employeeLogin(body) {
  return api.post('/employee/login', body)
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err.response.data
    })
}