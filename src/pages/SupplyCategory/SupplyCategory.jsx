import NewModal from '../../components/Modal/NewModal'
import ListSupplyCategory from '../../components/SupplyCategory/ListSupplyCategory'
import CreateSupplyCategory from '../../components/SupplyCategory/CreateSupplyCategory'
import { useSelector } from 'react-redux'
import UpdateSupplyCategory from '../../components/SupplyCategory/UpdateSupplyCategory'

const SupplyCategory = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { isEditing } = useSelector((state) => state.modal)

  return (
    <div className="p-4 border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ListSupplyCategory />
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {isEditing ? <UpdateSupplyCategory /> : <CreateSupplyCategory />}
        </NewModal>
      </div>
    </div>
  )
}

export default SupplyCategory
