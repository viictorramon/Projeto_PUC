export function isAuthenticated() {
  return localStorage.getItem('@agenda-automotiva-1.0.0-userToken') !== null
};

export function getToken() {
  localStorage.getItem('@agenda-automotiva-1.0.0-userToken')
};

export function sessionRegister(data) {
  localStorage.setItem('@agenda-automotiva-1.0.0-userToken', data.token);
  localStorage.setItem('@agenda-automotiva-1.0.0-userEmail', data.employee.email);
  localStorage.setItem('@agenda-automotiva-1.0.0-userName', data.employee.name);
};

export function sessionUnregister() {
  localStorage.removeItem('@agenda-automotiva-1.0.0-userToken');
  localStorage.removeItem('@agenda-automotiva-1.0.0-userName');
  localStorage.removeItem('@agenda-automotiva-1.0.0-userEmail');
};