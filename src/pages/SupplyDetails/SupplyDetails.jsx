import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListSupplyDetails from '../../components/SupplyDetails/ListSupplyDetails'
import UpdateSupplyDetails from '../../components/SupplyDetails/UpdateSupplyDetails'
import CreateSupplyDetails from '../../components/SupplyDetails/CreateSupplyDetails'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import DetailsSupplyDetails from '../../components/SupplyDetails/DetailsSupplyDetails'
import ChangeStateSupplyDetails from '../../components/SupplyDetails/ChangeStateSupplyDetails'

const SupplyDetails = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListSupplyDetails />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateSupplyDetails /> : undefined}
          {action === 'creating' ? <CreateSupplyDetails /> : undefined}
          {action === 'details' ? <DetailsSupplyDetails /> : undefined}
          {action === 'changing' ? <ChangeStateSupplyDetails /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default SupplyDetails
