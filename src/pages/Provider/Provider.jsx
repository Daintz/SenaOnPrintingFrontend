import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListProvider from '../../components/Provider/ListProvider'
import UpdateProvider from '../../components/Provider/UpdateProvider'
import CreateProvider from '../../components/Provider/CreateProvider'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import DetailsProvider from '../../components/Provider/DetailsProvider'
import ChangeStateProvider from '../../components/Provider/ChangeStateProvider'

const Provider = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListProvider />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateProvider /> : undefined}
          {action === 'creating' ? <CreateProvider /> : undefined}
          {action === 'details' ? <DetailsProvider /> : undefined}
          {action === 'changing' ? <ChangeStateProvider /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default Provider