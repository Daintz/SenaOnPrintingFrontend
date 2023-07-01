import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListTypeServices from '../../components/TypeServices/ListTypeServices'
import UpdateTypeServices from '../../components/TypeServices/UpdatetypeServices'
import CreateTypeServices from '../../components/TypeServices/CreateTypeServices'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import ChangeStateTypeServices from '../../components/TypeServices/ChangeStateTypeServices'

const TypeServices = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListTypeServices />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateTypeServices /> : undefined}
          {action === 'creating' ? <CreateTypeServices /> : undefined}  
          {action === 'changing' ? <ChangeStateTypeServices /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default TypeServices
