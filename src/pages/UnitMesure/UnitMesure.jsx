import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListUnit from '../../components/UnitMesure/ListUnitMesure'
import UpdateUnit from '../../components/UnitMesure/UpdateUnitMesure'
import CreateUnit  from '../../components/UnitMesure/CreateUnitMesure'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import DetailsUnit from '../../components/UnitMesure/DetailsUnitMesure'
import ChangeStateunit from '../../components/UnitMesure/ChangeStateUnitMesure'

const UnitMesure = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListUnit />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateUnit /> : undefined}
          {action === 'creating' ? <CreateUnit /> : undefined}
          {action === 'details' ? <DetailsUnit /> : undefined}
          {action === 'changing' ? <ChangeStateunit /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default UnitMesure

