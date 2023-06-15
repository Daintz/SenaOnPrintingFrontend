import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListWarehausetype from '../../components/Warehausetype/ListWarehausetype'
import UpdateWarehausetype from '../../components/Warehausetype/UpdateWarehausetype'
import CreateWarehausetype from '../../components/Warehausetype/CreateWarehausetype'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import DetailsWarehausetype from '../../components/Warehausetype/DetailsWarehausetype'
import ChangeStateWarehausetype from '../../components/Warehausetype/ChangeStateWarehausetype'

const WarehauseType = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListWarehausetype />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateWarehausetype /> : undefined}
          {action === 'creating' ? <CreateWarehausetype /> : undefined}
          {action === 'details' ? <DetailsWarehausetype /> : undefined}
          {action === 'changing' ? <ChangeStateWarehausetype /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default WarehauseType