import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListGrammageCaliber from '../../components/GrammageCaliber/ListGrammageCaliber'
import UpdateGrammageCaliber from '../../components/GrammageCaliber/UpdateGrammageCaliber'
import CreateGrammageCaliber from '../../components/GrammageCaliber/CreateGrammageCaliber'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import DetailsGrammageCaliber from '../../components/GrammageCaliber/DetailsGrammageCaliber'
import ChangeStateGrammageCaliber from '../../components/GrammageCaliber/ChangeStateGrammageCaliber'

const GrammageCaliber = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListGrammageCaliber />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateGrammageCaliber /> : undefined}
          {action === 'creating' ? <CreateGrammageCaliber /> : undefined}
          {action === 'details' ? <DetailsGrammageCaliber /> : undefined}
          {action === 'changing' ? <ChangeStateGrammageCaliber /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default GrammageCaliber
