import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import Provider from '../pages/Provider/Provider'
import Warehausetype from '../pages/Warehausetype/Warehausetype'
import Warehause from '../pages/Warehause/Warehause'
import DashboardLayout from '../layout/DashboardLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path="provider"
        element={<DashboardLayout>
          <Provider />
        </DashboardLayout>} />
      <Route path="warehausetype"
        element={<DashboardLayout>
          <Warehausetype />
        </DashboardLayout>} />
      <Route path="warehause"
        element={<DashboardLayout>
          <Warehause />
        </DashboardLayout>} />
      <Route
        path="dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      
    </>
  )
)

export default router
