import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListProduct from '../../components/Product/ListProduct'
import UpdateProduct from '../../components/Product/UpdateProduct'
import CreateProduct from '../../components/Product/CreateProduct'

const Product = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { isEditing } = useSelector((state) => state.modal)

  return (
    <>
      <div className="p-4 border-gray-200 border-dashed">
        <div className="overflow-x-auto">
          <ListProduct />
          {/* Esta logica del modal esta acá para poder ser reutilizable */}
          <NewModal>
            {isEditing ? <UpdateProduct /> : <CreateProduct />}
          </NewModal>
        </div>
      </div>
    </>
  )
}

export default Product
