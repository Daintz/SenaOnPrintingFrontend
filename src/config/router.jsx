import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'

import { ProtectedRoute } from '../context/Helpers/protectedRoute';

import Dashboard from '../pages/Dashboard/Dashboard'
import Provider from '../pages/Provider/Provider'
import Warehause from '../pages/Warehause/Warehause'
import Supply from '../pages/Supply/Supply'
import Machine from '../pages/Machine/Machines'
import Finish from '../pages/Finish/Finish'
import SupplyCategory from '../pages/SupplyCategory/SupplyCategory'
import UnitMesure from '../pages/UnitMesure/UnitMesure'
import Product from '../pages/Product/Product'
import QuotationClient from '../pages/QuotationClient/QuotationClient'
import QuotationClientDetail from '../pages/QuotationClientDetail/QuotationClientDetail'
import Role from '../pages/Role/Role'
import TypeDocument from '../pages/TypeDocument/TypeDocument'
import User from '../pages/User/User'
import Profile from '../pages/User/Profile';
import Login from '../pages/Login/Login'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import ForgotPasswordEmail from '../pages/ForgotPassword/ForgotPasswordEmail'
import Client from '../pages/Clients/Clients'
import Substrate from '../pages/Substrate/Substrate'
import PaperCut from '../pages/PaperCut/PaperCut'
import GrammageCaliber from '../pages/GrammageCaliber/GrammageCaliber'
import Lineature from '../pages/Lineature/Lineature'
import ImpositionPlanch from '../pages/ImpositionPlanch/ImpositionPlanch'
import OrderProduction from '../pages/OrderProduction/OrderProduction'
import TypeServices from '../pages/TypeServices/TypeServices'
import SupplyPictogrmas from '../pages/SupplyPictograms/SupplyPictograms'
import QuotationProviders from '../pages/QuotationProviders/QuotationProviders'
import SupplyDetails from '../pages/SupplyDetails/SupplyDetails'
import DashboardLayout from '../layout/DashboardLayout'
import QuotationClientApproved from '../pages/ListQuotationClientApproved/QuotationClientApproved'
import Quotation from '../pages/Quotation/Quotation'
import ViewOrderProduction from '../pages/CreateOrderProduction/CreateOrderProduction'
import ViewQuotationClient from '../components/CreateQuotationClient/CreateQuotation'
import UpdateQuotation from '../components/UpdateQuotationClient/UpdateQuotation'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/olvide_contraseña" element={<ForgotPasswordEmail />} />
      <Route path="/restaurar_contraseña" element={<ForgotPassword />} />

      <Route
        path=""
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="provider"
        element={<ProtectedRoute>
          <Provider />
        </ProtectedRoute>} />

      <Route path="warehause"
        element={<ProtectedRoute>
          <Warehause />
        </ProtectedRoute>} />

      <Route path="Machine"
        element={<ProtectedRoute>
          <Machine />
        </ProtectedRoute>} />

      <Route path="Finish"
        element={<ProtectedRoute>
          <Finish />
        </ProtectedRoute>} />

      <Route
        path="roles"
        element={
          <ProtectedRoute>
            <Role />
          </ProtectedRoute>
        }
      />

      <Route
        path="tipos_documentos"
        element={
          <ProtectedRoute>
            <TypeDocument />
          </ProtectedRoute>
        }
      />

      <Route
        path="quotationClient"
        element={
          <ProtectedRoute>
            <QuotationClient />
          </ProtectedRoute>
        }
      />

       <Route
        path="quotation"
        element={
          <ProtectedRoute>
            <Quotation />
          </ProtectedRoute>
        }
      />

      <Route
        path="quotationclientDetail"
        element={
          <ProtectedRoute>
            <QuotationClientDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="usuarios"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />

      <Route
        path="perfil"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="UnitMesure"
        element={
          <ProtectedRoute>
            <UnitMesure />
          </ProtectedRoute>
        }
      />


      <Route
        path="clients"
        element={
          <ProtectedRoute>
            <Client />
          </ProtectedRoute>
        }
      />

      <Route
        path="grammage_caliber"
        element={
          <ProtectedRoute>
            <GrammageCaliber />
          </ProtectedRoute>
        }
      />

      <Route
        path="paper_cut"
        element={
          <ProtectedRoute>
            <PaperCut />
          </ProtectedRoute>
        }
      />

      <Route
        path="substrate"
        element={
          <ProtectedRoute>
            <Substrate />
          </ProtectedRoute>
        }
      />

      <Route
        path="Lineature"
        element={
          <ProtectedRoute>
            <Lineature />
          </ProtectedRoute>
        }
      />

      <Route
        path="impositionPlanch"
        element={
          <ProtectedRoute>
            <ImpositionPlanch />
          </ProtectedRoute>
        }
      />

      <Route
        path="OrderProduction"
        element={
          <ProtectedRoute>
            <OrderProduction />
          </ProtectedRoute>
        }
      />


      <Route
        path="typeServices"
        element={
          <ProtectedRoute>
            <TypeServices />
          </ProtectedRoute>
        }
      />

      <Route
        path="supplyPictograms"
        element={
          <ProtectedRoute>
            <SupplyPictogrmas />
          </ProtectedRoute>
        }
      />

      <Route
        path="quotitationProviders"
        element={
          <ProtectedRoute>
            <QuotationProviders />
          </ProtectedRoute>
        }
      />


      <Route
        path="supplyDetails"
        element={
          <ProtectedRoute>
            <SupplyDetails />
          </ProtectedRoute>
        }
      />


      <Route
        path="product"
        element={
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        }
      />

      <Route
        path="supply"
        element={
          <ProtectedRoute>
            <Supply />
          </ProtectedRoute>
        }
      />

      <Route
        path="supplyCategory"
        element={
          <ProtectedRoute>
            <SupplyCategory />
          </ProtectedRoute>
        }
      />

      <Route
        path="planOP"
        element={
          <ProtectedRoute>
            <QuotationClientApproved />
          </ProtectedRoute>
        }
      />

      <Route
        path="createOP"
        element={
          <ProtectedRoute>
            <ViewOrderProduction />
          </ProtectedRoute>
        }
      />

      <Route
        path="createQuotation"
        element={
          <ProtectedRoute>
            <ViewQuotationClient />
          </ProtectedRoute>
        }
      />
      <Route
        path="upadateQuotation"
        element={
          <DashboardLayout>
            <UpdateQuotation />
          </DashboardLayout>
        }
      />
    </>
  )
)

export default router
