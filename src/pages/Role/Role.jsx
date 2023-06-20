import NewModal from '../../components/Modal/NewModal'
import ListRole from '../../components/Role/ListRole'
import CreateRole from '../../components/Role/CreateRole'
import { useSelector } from 'react-redux'
import UpdateRole from '../../components/Role/UpdateRole'
import DetailsRole from '../../components/Role/DetailsRole'
import ChangeStateRole from '../../components/Role/ChangeStateRole'
import ErrorBoundary from '../../components/Error/ErrorBoundary'

const Role = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListRole />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateRole /> : undefined}
          {action === 'creating' ? <CreateRole /> : undefined}
          {action === 'details' ? <DetailsRole /> : undefined}
          {action === 'changing' ? <ChangeStateRole /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default Role
