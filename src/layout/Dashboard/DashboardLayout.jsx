import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">
          {children}
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
