import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListWarehause from '../../components/Warehause/ListWarehause'
import UpdateWarehause from '../../components/Warehause/UpdateWarehause'
import CreateWarehause from '../../components/Warehause/CreateWarehause'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import DetailsWarehause from '../../components/Warehause/DetailsWarehause'
import ChangeStateWarehause from '../../components/Warehause/ChangeStateWarehause'

const Warehause = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListWarehause />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateWarehause /> : undefined}
          {action === 'creating' ? <CreateWarehause /> : undefined}
          {action === 'details' ? <DetailsWarehause /> : undefined}
          {action === 'changing' ? <ChangeStateWarehause /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default Warehause