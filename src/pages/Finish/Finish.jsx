import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import Listfinish from '../../components/Finish/ListFinish'
import Updatefinish from '../../components/Finish/UpdateFinish'
import Createfinish from '../../components/Finish/CreateFinish'
import ErrorBoundary from '../../components/Error/ErrorBoundary'

import ChangeStateFinish from '../../components/Finish/ChangeStateFinish'
import DetailsFinish from '../../components/Finish/detailsFinish'

const finish = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <Listfinish />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <Updatefinish /> : undefined}
          {action === 'creating' ? <Createfinish /> : undefined}
          {action === 'details' ? <DetailsFinish /> : undefined}
          {action === 'changing' ? <ChangeStateFinish /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default finish
