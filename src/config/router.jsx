import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'
import Dashboard from '../pages/Dashboard/Dashboard'
import App from '../App'
import Supply from '../pages/Supply/Supply'
import SupplyCategory from '../pages/SupplyCategory/SupplyCategory'

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
    </>
  )
)

export default router
