import { api } from './api'

export async function schedulingCreate(body) {
  return api.post('/scheduling/create', body)
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err.response.data
    })
}