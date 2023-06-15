import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListQuotationClient from '../../components/QuotationClient/ListQuotationClient'
import UpdateQuotationClient from '../../components/QuotationClient/UpdateQuotationClient'
import CreateQuotationClient from '../../components/QuotationClient/CreateQuotationClient'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import DetailsQuotationClient from '../../components/QuotationClient/DetailsQuotationClient'
import ChangeStateQuotationClient from '../../components/QuotationClient/ChangeStateQuotationClient'

const QuotationClient = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListQuotationClient />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateQuotationClient /> : undefined}
          {action === 'creating' ? <CreateQuotationClient /> : undefined}
          {action === 'details' ? <DetailsQuotationClient /> : undefined}
          {action === 'changing' ? <ChangeStateQuotationClient /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default QuotationClient
