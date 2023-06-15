import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListSubstrates from '../../components/Substrates/ListSubstrates'
import UpdateSubstrates from '../../components/Substrates/UpdateSubstrates'
import CreateSubstrates from '../../components/Substrates/CreateSubstrates'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import DetailsSubstrates from '../../components/Substrates/DetailsSubstrates'
import ChangeStateSubstrates from '../../components/Substrates/ChangeStateSubstrates'

const Substrates = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListSubstrates />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateSubstrates /> : undefined}
          {action === 'creating' ? <CreateSubstrates /> : undefined}
          {action === 'details' ? <DetailsSubstrates /> : undefined}
          {action === 'changing' ? <ChangeStateSubstrates /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default Substrates
