import NewModal from '../../components/Modal/NewModal'
import ListSupplyCategory from '../../components/SupplyCategory/ListSupplyCategory'
import CreateSupplyCategory from '../../components/SupplyCategory/CreateSupplyCategory'
import { useSelector } from 'react-redux'
import UpdateSupplyCategory from '../../components/SupplyCategory/UpdateSupplyCategory'
import DetailsSupplyCategory from '../../components/SupplyCategory/DetailsSupplyCategory'
import ChangeStateSupplyCategory from '../../components/SupplyCategory/ChangeStateSupplyCategory'
import ErrorBoundary from '../../components/Error/ErrorBoundary'

const SupplyCategory = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListSupplyCategory />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateSupplyCategory /> : undefined}
          {action === 'creating' ? <CreateSupplyCategory /> : undefined}
          {action === 'details' ? <DetailsSupplyCategory /> : undefined}
          {action === 'changing' ? <ChangeStateSupplyCategory /> : undefined}
        </NewModal>
      </div>
    </div>
  )
}

export default SupplyCategory
