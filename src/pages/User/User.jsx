import NewModal from '../../components/Modal/NewModal'
import ListUser from '../../components/User/ListUser'
import CreateUser from '../../components/User/CreateUser'
import { useSelector } from 'react-redux'
import UpdateUser from '../../components/User/UpdateUser'
import DetailsUser from '../../components/User/DetailsUser'
import ChangeStateUser from '../../components/User/ChangeStateUser'
import ErrorBoundary from '../../components/Error/ErrorBoundary'

const User = () => {
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListUser />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateUser /> : undefined}
          {action === 'creating' ? <CreateUser /> : undefined}
          {action === 'details' ? <DetailsUser /> : undefined}
          {action === 'changing' ? <ChangeStateUser /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default User
