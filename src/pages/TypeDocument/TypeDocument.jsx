import NewModal from '../../components/Modal/NewModal'
import ListTypeDocument from '../../components/TypeDocument/ListTypeDocument'
import CreateTypeDocument from '../../components/TypeDocument/CreateTypeDocument'
import { useSelector } from 'react-redux'
import UpdateTypeDocument from '../../components/TypeDocument/UpdateTypeDocument'

const TypeDocument = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { isEditing } = useSelector((state) => state.modal)

  return (
    <div className="p-4 border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ListTypeDocument />
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {isEditing ? <UpdateTypeDocument /> : <CreateTypeDocument />}
        </NewModal>
      </div>
    </div>
  )
}

export default TypeDocument
