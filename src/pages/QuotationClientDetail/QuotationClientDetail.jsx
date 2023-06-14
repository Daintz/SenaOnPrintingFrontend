import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListQuotationClientDetail from '../../components/QuotationClientDetail/ListQuotationClientDetail'
import UpdateQuotationClientDetail from '../../components/QuotationClientDetail/UpdateQuotationClientDetail'
import CreateQuotationClientDetail from '../../components/QuotationClientDetail/CreateQuotationClientDetail'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import DetailsQuotationClientDetail from '../../components/QuotationClientDetail/DetailsQuotationClientDetail'
import ChangeStateQuotationClientDetail from '../../components/QuotationClientDetail/ChangeStateQuotationClientDetail'

const QuotationClientDetail = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListQuotationClientDetail />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateQuotationClientDetail /> : undefined}
          {action === 'creating' ? <CreateQuotationClientDetail /> : undefined}
          {action === 'details' ? <DetailsQuotationClientDetail /> : undefined}
          {action === 'changing' ? <ChangeStateQuotationClientDetail /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default QuotationClientDetail
