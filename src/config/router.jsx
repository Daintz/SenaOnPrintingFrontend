import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import Dashboard from '../pages/Dashboard/Dashboard'
import App from '../App'
import Provider from '../pages/Provider/Provider'
import Warehausetype from '../pages/Warehausetype/Warehausetype'
import Warehause from '../pages/Warehause/Warehause'
import Supply from '../pages/Supply/Supply'
import Machine from '../pages/Machine/Machines'
import Finish from '../pages/Finish/Finish'
import SupplyCategory from '../pages/SupplyCategory/SupplyCategory'
import DashboardLayout from '../layout/Dashboard/DashboardLayout'
import UnitMesure from '../pages/UnitMesure/UnitMesure'
import Product from '../pages/Product/Product'
import QuotationClient from '../pages/QuotationClient/QuotationClient'
import QuotationClientDetail from '../pages/QuotationClientDetail/QuotationClientDetail'
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
import TypeServices from '../pages/TypeServices/TypeServices'
import SupplyPictogrmas from '../pages/SupplyPictogrmas/SupplyPictogrmas'
import QuotationProviders from '../pages/QuptationProviders/QuotitationProviders'
import SupplyDetails from '../pages/SupplyDetails/SupplyDetails'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>

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
        path="quotationClient"
        element={
          <DashboardLayout>
            <QuotationClient />
          </DashboardLayout>
        }
      />
      <Route
        path="quotationclientDetail"
        element={
          <DashboardLayout>
            <QuotationClientDetail />
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

       <Route
        path="typeServices"
        element={
          <DashboardLayout>
            <TypeServices/>
          </DashboardLayout>
        }
      />
      <Route
        path="supplyPictograms"
        element={
          <DashboardLayout>
            <SupplyPictogrmas/>
          </DashboardLayout>
        }
      />
      <Route
        path="quotitationProviders"
        element={
          <DashboardLayout>
            <QuotationProviders/>
          </DashboardLayout>
        }
      />
          
      <Route
        path="supplyDetails"
        element={
          <DashboardLayout>
          <SupplyDetails />
          </DashboardLayout>
        }
      />
    </>
  )
)

export default router
