import PropTypes from 'prop-types'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex items-center justify-center rounded">
            <div className="relative overflow-x-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node
}

export default DashboardLayout
