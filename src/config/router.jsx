import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import App from '../App'
import Supply from '../pages/Supply/Supply'
import SupplyCategory from '../pages/SupplyCategory/SupplyCategory'
import DashboardLayout from '../layout/Dashboard/DashboardLayout'
import Provider from '../pages/Provider/Provider'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}/>
      <Route path="dashboard"
            element={<DashboardLayout>
              <Dashboard />
            </DashboardLayout>}/>
      <Route path="supply"
            element={<DashboardLayout>
              <Supply />
            </DashboardLayout>}/>
      <Route path="supplyCategory"
            element={<DashboardLayout>
              <SupplyCategory />
            </DashboardLayout>}/>
      <Route path="provider"
            element={<DashboardLayout>
              <Provider/>
            </DashboardLayout>}/>
    </>
  )
)

export default router
