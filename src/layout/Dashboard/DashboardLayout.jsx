import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <>
    <Navbar />
    <div className="dashboard-layout grid grid-cols-12 gap-4">
      <Sidebar />
      <div className="p-4 col-span-10">
        <div className="overflow-x-auto">
          {children}
        </div>
      </div>
    </div>
    </>
  )
}

export default DashboardLayout
