import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import App from '../App'
import DashboardLayout from '../layout/Dashboard/DashboardLayout'
import Provider from '../pages/Provider/Provider'
import Warehausetype from '../pages/Warehausetype/Warehausetype'
import Warehause from '../pages/Warehause/Warehause'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}/>
      <Route path="dashboard"
            element={<DashboardLayout>
              <Dashboard />
            </DashboardLayout>}/>
      <Route path="provider"
            element={<DashboardLayout>
              <Provider/>
            </DashboardLayout>}/>
      <Route path="warehausetype"
            element={<DashboardLayout>
              <Warehausetype/>
            </DashboardLayout>}/>
      <Route path="warehause"
            element={<DashboardLayout>
              <Warehause/>
            </DashboardLayout>}/>
    </>
  )
)

export default router
