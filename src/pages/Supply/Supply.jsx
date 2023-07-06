import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListSupply from '../../components/Supply/ListSupply'
import UpdateSupply from '../../components/Supply/UpdateSupply'
import CreateSupply from '../../components/Supply/CreateSupply'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import DetailsSupply from '../../components/Supply/DetailsSupply'
import ChangeStateSupply from '../../components/Supply/ChangeStateSupply'

const Supply = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListSupply />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateSupply /> : undefined}
          {action === 'creating' ? <CreateSupply /> : undefined}
          {action === 'details' ? <DetailsSupply /> : undefined}
          {action === 'changing' ? <ChangeStateSupply /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default Supply

