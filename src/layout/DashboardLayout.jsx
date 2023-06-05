import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="py-24 px-16">
          {children}
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
