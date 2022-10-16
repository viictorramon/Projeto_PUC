import { Outlet } from 'react-router-dom'
import { DefaultLayoutContainer } from './styles'
import { Header } from '../../components/Header'

export function DefaultLayout() {
  return (
    <div>
      <DefaultLayoutContainer>
        <Header />
        <Outlet />
      </DefaultLayoutContainer>
    </div>
  )
}