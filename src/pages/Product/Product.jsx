import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListProduct from '../../components/Product/ListProduct'
import UpdateProduct from '../../components/Product/UpdateProduct'
import CreateProduct from '../../components/Product/CreateProduct'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import DetailsProduct from '../../components/Product/DetailsProduct'
import ChangeStateProduct from '../../components/Product/ChangeStateProduct'

const Product = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListProduct />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateProduct /> : undefined}
          {action === 'creating' ? <CreateProduct /> : undefined}
          {action === 'details' ? <DetailsProduct /> : undefined}
          {action === 'changing' ? <ChangeStateProduct /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default Product
