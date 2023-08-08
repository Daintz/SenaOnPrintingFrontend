import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import CreateOrderProduction from '../../components/CreateOrderProduction/CreateOrderProduction'
import ErrorBoundary from '../../components/Error/ErrorBoundary'

const ViewOrderProduction = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <CreateOrderProduction />
        </ErrorBoundary>
        
      </div>
    </div>

  )
}

export default ViewOrderProduction
