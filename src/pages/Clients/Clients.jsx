import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListClient from '../../components/Client/ListClient'
import UpdateClient from '../../components/Client/UpdateClient'
import CreateClient from '../../components/Client/CreateClient'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import DetailsClient from '../../components/Client/DetailsClient'
import ChangeStateClient from '../../components/Client/ChangeStateClient'

const Client = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListClient />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateClient /> : undefined}
          {action === 'creating' ? <CreateClient /> : undefined} 
          {action === 'details' ? <DetailsClient /> : undefined}
          {action === 'changing' ? <ChangeStateClient /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default Client
