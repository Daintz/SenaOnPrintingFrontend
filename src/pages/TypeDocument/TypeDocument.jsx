import NewModal from '../../components/Modal/NewModal'
import ListTypeDocument from '../../components/TypeDocument/ListTypeDocument'
import CreateTypeDocument from '../../components/TypeDocument/CreateTypeDocument'
import { useSelector } from 'react-redux'
import UpdateTypeDocument from '../../components/TypeDocument/UpdateTypeDocument'
import DetailsTypeDocument from '../../components/TypeDocument/DetailsTypeDocument'
import ChangeStateTypeDocument from '../../components/TypeDocument/ChangeStateTypeDocument'
import ErrorBoundary from '../../components/Error/ErrorBoundary'

const TypeDocument = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListTypeDocument />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateTypeDocument /> : undefined}
          {action === 'creating' ? <CreateTypeDocument /> : undefined}
          {action === 'details' ? <DetailsTypeDocument /> : undefined}
          {action === 'changing' ? <ChangeStateTypeDocument /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default TypeDocument
