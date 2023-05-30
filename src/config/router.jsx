import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import App from '../App'
import Supply from '../pages/Supply/Supply'
import Provider from '../pages/Provider/Provider'
import Machine from '../pages/Machine/Machines'
import Finish from '../pages/Finish/Finish'
import SupplyCategory from '../pages/SupplyCategory/SupplyCategory'
import DashboardLayout from '../layout/Dashboard/DashboardLayout'

import UnitMesure from '../pages/UnitMesure/UnitMesure'

import Product from '../pages/Product/Product'
import Role from '../pages/Role/Role'
import TypeDocument from '../pages/TypeDocument/TypeDocument'
import User from '../pages/User/User'
import Login from '../pages/Login/Login'

import Client from '../pages/Clients/Clients'
import Substrate from '../pages/Substrate/Substrate'
import PaperCut from '../pages/PaperCut/PaperCut'
import GrammageCaliber from '../pages/GrammageCaliber/GrammageCaliber'
import Lineature from '../pages/Lineature/Lineature'
import ImpositionPlanch from '../pages/ImpositionPlanch/ImpositionPlanch'
import OrderProduction from '../pages/OrderProduction/OrderProduction'


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


<Route
        path="UnitMesure"
        element={
          <DashboardLayout>
            <UnitMesure />
          </DashboardLayout>
        }
      />




      <Route
        path="clients"
        element={
          <DashboardLayout>
            <Client/>
          </DashboardLayout>
        }
      />
      <Route
        path="grammage_caliber"
        element={
          <DashboardLayout>
            <GrammageCaliber />
          </DashboardLayout>
        }
      />
      <Route
        path="paper_cut"
        element={
          <DashboardLayout>
            <PaperCut/>
          </DashboardLayout>
        }
      />
      <Route
        path="substrate"
        element={
          <DashboardLayout>
            <Substrate/>
          </DashboardLayout>
        }
      />
      <Route
        path="Lineature"
        element={
          <DashboardLayout>
            <Lineature/>
          </DashboardLayout>
        }
      />
      <Route
        path="impositionPlanch"
        element={
          <DashboardLayout>
            <ImpositionPlanch/>
          </DashboardLayout>
        }
      />
      <Route
        path="OrderProduction"
        element={
          <DashboardLayout>
            <OrderProduction/>
          </DashboardLayout>
        }
      />

    </>
  )
)

export default router
