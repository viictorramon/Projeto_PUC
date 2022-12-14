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

export async function schedulingFullCreate(token, body) {
  return api.post('/scheduling/fullcreate', body, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err.response.data
    })
}

export async function getAllScheduling(token) {
  return api.get('/scheduling', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err.response.data
    })
}