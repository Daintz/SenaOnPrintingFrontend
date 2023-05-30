import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import App from '../App'
import Supply from '../pages/Supply/Supply'
import Provider from '../pages/Provider/Provider'
import Machine from '../pages/Machine/Machines'
import Finish from '../pages/Finish/Finish'
import SupplyCategory from '../pages/SupplyCategory/SupplyCategory'
import DashboardLayout from '../layout/Dashboard/DashboardLayout'
import UnitMesure from '../pages/UnitMesure/UnitMesure'

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

            <Route path="Machine"
            element={<DashboardLayout>
              <Machine/>
            </DashboardLayout>}/>
            <Route path="Finish"
            element={<DashboardLayout>
              <Finish/>
            </DashboardLayout>}/>

      <Route path="/" element={<App />} />
      <Route
        path="dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
    
      <Route
        path="supply"
        element={
          <DashboardLayout>
            <Supply />
          </DashboardLayout>
        }
      />
      <Route
        path="supplyCategory"
        element={
          <DashboardLayout>
            <SupplyCategory />
          </DashboardLayout>
        }
      />
         <Route
        path="Finish"
        element={
          <DashboardLayout>
            <Finish />
          </DashboardLayout>
        }
      />

<Route
        path="UnitMesure"
        element={
          <DashboardLayout>
            <UnitMesure />
          </DashboardLayout>
        }
      />

    </>
  )
)

export default router
