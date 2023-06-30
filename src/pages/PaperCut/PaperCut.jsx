import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListPaperCuts from '../../components/PaperCuts/ListPaperCuts'
import UpdatePaperCuts from '../../components/PaperCuts/UpdatePaperCuts'
import CreatePaperCuts from '../../components/PaperCuts/CreatePaperCuts'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import ChangeStatePaperCuts from '../../components/PaperCuts/ChangeStatePaperCuts'

const PaperCuts = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListPaperCuts />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdatePaperCuts /> : undefined}
          {action === 'creating' ? <CreatePaperCuts /> : undefined}
          {action === 'changing' ? <ChangeStatePaperCuts /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default PaperCuts
