import NewModal from '../../components/Modal/NewModal'
import ListSupplyCategory from '../../components/SupplyCategory/ListSupplyCategory'
import CreateSupplyCategory from '../../components/SupplyCategory/CreateSupplyCategory'
import { useSelector } from 'react-redux'
import UpdateSupplyCategory from '../../components/SupplyCategory/UpdateSupplyCategory'

const SupplyCategory = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { isEditing } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed overflow-x-auto">
      <ListSupplyCategory />
      {/* Esta logica del modal esta acá para poder ser reutilizable */}
      <NewModal>
        {isEditing ? <UpdateSupplyCategory /> : <CreateSupplyCategory />}
      </NewModal>
    </div>
  )
}

export default SupplyCategory
