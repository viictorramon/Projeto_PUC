import { Outlet } from 'react-router-dom'
import { SideMenu } from '../../components/SideMenu'
import { SideMenuLayoutContainer } from './styles'

export function SideMenuLayout() {
  return (
    <SideMenuLayoutContainer>
      <SideMenu />
      <Outlet />
    </SideMenuLayoutContainer>
  )
}