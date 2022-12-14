import { api } from './api'

export async function getAllClients(token) {
  return api.get('/client', {
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

export async function getClientById(token, id) {
  return api.get(`/client/${id}`, {
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

export async function getClientByCpf(token, cpf) {
  return api.get(`/client/clientbycpf/${cpf}`, {
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

export async function editClientById(token, id, body) {
  return api.patch(`/client/edit/${id}`, body, {
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


export async function clientCreate(token, body) {
  return api.post('/client/register', body, {
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