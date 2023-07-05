import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListOrderProduction from '../../components/OrderProduction/ListOrderProduction'
import UpdateOrderProduction from '../../components/OrderProduction/UpdateOrderProduction'
import CreateOrderProduction from '../../components/OrderProduction/CreateOrderProduction'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import DetailsOrderProduction from '../../components/OrderProduction/DetailsOrderProduction'
import ChangeStateOrderProduction from '../../components/OrderProduction/ChangeStateOrderProduction'
import ChangeStatusOrderProduction from '../../components/OrderProduction/ChangeStatusOrderProduction'

const OrderProduction = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListOrderProduction />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateOrderProduction /> : undefined}
          {action === 'creating' ? <CreateOrderProduction /> : undefined}
          {action === 'details' ? <DetailsOrderProduction /> : undefined}
          {action === 'changing' ? <ChangeStateOrderProduction /> : undefined}
          {action === 'changingStatus' ? <ChangeStatusOrderProduction /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default OrderProduction
