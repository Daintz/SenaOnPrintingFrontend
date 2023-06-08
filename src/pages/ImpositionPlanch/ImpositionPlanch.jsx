import NewModal from '../../components/Modal/NewModal'
import ListImpositionPlanch from '../../components/ImpositionPlanch/ListImpositionPlanch'
import CreateImpositionPlanch from '../../components/ImpositionPlanch/CreateImpositionPlanch'
import { useSelector } from 'react-redux'
import UpdateImpositionPlanch from '../../components/ImpositionPlanch/UpdateImpositionPlanch'

const ImpositionPlanch = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { isEditing } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed overflow-x-auto">
      <ListImpositionPlanch />
      {/* Esta logica del modal esta acá para poder ser reutilizable */}
      <NewModal>
        {isEditing ? <UpdateImpositionPlanch /> : <CreateImpositionPlanch />}
      </NewModal>
    </div>
  )
}

export default ImpositionPlanch
