import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListLineature from '../../components/Lineature/ListLineature'
import UpdateLineature from '../../components/Lineature/UpdateLineature'
import CreateLineature from '../../components/Lineature/CreateLineature'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import ChangeStateLineature from '../../components/Lineature/ChangeStateLineature'

const Lineature = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListLineature />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateLineature /> : undefined}
          {action === 'creating' ? <CreateLineature /> : undefined}
          {action === 'changing' ? <ChangeStateLineature /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default Lineature
