import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

import { isAuthenticated } from "./services/authServices";

import { DefaultLayout } from './layouts/DefaultLayout'
import { Employee } from './pages/Employee'
import { Login } from './pages/Login'
import { Scheduling } from './pages/Scheduling'

const PrivateRoute = ({ children }) => {
  let location = useLocation();

  if (!isAuthenticated())
    return <Navigate to="/" state={{ from: location }} replace />

  return children
};

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route path='/' element={<Scheduling />} />
        <Route path="/login" element={
          isAuthenticated() ?
            <Employee /> :
            <Login />
        }
        />
        <Route
          path="/employee"
          element={
            <PrivateRoute>
              <Employee />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  )
}