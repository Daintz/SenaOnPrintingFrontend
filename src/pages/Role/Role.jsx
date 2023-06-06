import NewModal from '../../components/Modal/NewModal'
import ListRole from '../../components/Role/ListRole'
import CreateRole from '../../components/Role/CreateRole'
import { useSelector } from 'react-redux'
import UpdateRole from '../../components/Role/UpdateRole'

const Role = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { isEditing } = useSelector((state) => state.modal)

  return (
    <div className="p-4 border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ListRole />
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {isEditing ? <UpdateRole /> : <CreateRole />}
        </NewModal>
      </div>
    </div>
  )
}

export default Role
