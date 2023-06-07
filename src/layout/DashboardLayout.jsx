import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="mt-16 sidebarMD:ml-60">
        <div className="py-10 sidebarMD:pl-[10%] sidebarMD:mr-[6%] 2xl:mr-[8%]">
          {children}
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
