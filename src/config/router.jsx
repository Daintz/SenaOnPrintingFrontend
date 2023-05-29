import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import App from '../App'
import Supply from '../pages/Supply/Supply'
import SupplyCategory from '../pages/SupplyCategory/SupplyCategory'
import DashboardLayout from '../layout/Dashboard/DashboardLayout'
import Product from '../pages/Product/Product'
import Role from '../pages/Role/Role'
import TypeDocument from '../pages/TypeDocument/TypeDocument'
import User from '../pages/User/User'
import Login from '../pages/Login/Login'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
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
      <Route
        path="roles"
        element={
          <DashboardLayout>
            <Role />
          </DashboardLayout>
        }
      />
      <Route
        path="tipos_documentos"
        element={
          <DashboardLayout>
            <TypeDocument/>
          </DashboardLayout>
        }
      />
      <Route
        path="usuarios"
        element={
          <DashboardLayout>
            <User />
          </DashboardLayout>
        }
      />
    </>
  )
)

export default router
