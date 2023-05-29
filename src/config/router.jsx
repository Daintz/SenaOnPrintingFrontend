import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import App from '../App'
import Supply from '../pages/Supply/Supply'
import SupplyCategory from '../pages/SupplyCategory/SupplyCategory'
import DashboardLayout from '../layout/Dashboard/DashboardLayout'

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
        path="product"
        element={
          <DashboardLayout>
            <Product />
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

    </>
  )
)

export default router
