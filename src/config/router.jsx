import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import App from '../App'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="dashboard" element={<Dashboard />} />
    </>
  )
)

export default router
