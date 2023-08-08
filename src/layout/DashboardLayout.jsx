import { ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'

const DashboardLayout = ({ children }) => {
  children
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="mt-16 sidebarMD:ml-60">
        <div className="py-10 sidebarMD:pl-[5%] sidebarMD:pr-[6%] 2xl:pr-[5%]">
          {children}
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default DashboardLayout
