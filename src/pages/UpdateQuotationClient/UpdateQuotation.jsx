import { useSelector } from 'react-redux'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import UpdateQuotation from '../../components/UpdateQuotationClient/UpdateQuotation'

const ViewQuotationClient = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <UpdateQuotation />
        </ErrorBoundary>
        
      </div>
    </div>

  )
}

export default ViewQuotationClient