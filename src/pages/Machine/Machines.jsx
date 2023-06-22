import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListMachine from '../../components/Machine/ListMachine'
import UpdateMachine from '../../components/Machine/UpdateMachine'
import CreateMachine from '../../components/Machine/CreateMachine'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import  DetailsMachine from '../../components/Machine/DetailsMachine'
import ChangeStatemachine from '../../components/Machine/ChangeStateMachine'

const Machine = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListMachine />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateMachine /> : undefined}
          {action === 'creating' ? <CreateMachine /> : undefined}
          {action === 'details' ? <DetailsMachine /> : undefined}
          {action === 'changing' ? <ChangeStatemachine /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default Machine
