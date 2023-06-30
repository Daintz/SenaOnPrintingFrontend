import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListSupplyPictograms from '../../components/SupplyPictograms/ListSupplyPictograms'
import CreateSupplyPictograms from '../../components/SupplyPictograms/CreateSupplyPictograms'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import DetailsSupplyPictograms from '../../components/SupplyPictograms/DetailsSypplyPictograms'
import ChangeStateSupplyPictograms from '../../components/SupplyPictograms/ChangeStatedSupplyPictograms'

const SupplyPictograms = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListSupplyPictograms />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'creating' ? <CreateSupplyPictograms /> : undefined}
          {action === 'details' ? <DetailsSupplyPictograms /> : undefined}
          {action === 'changing' ? <ChangeStateSupplyPictograms /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default SupplyPictograms
