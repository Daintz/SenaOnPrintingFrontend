import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListQuotationProviders from '../../components/QuotationProviders/ListQuotationProviders'
import UpdateQuotationProviders from '../../components/QuotationProviders/UpdateQuotationProviders'
import CreateQuotationProviders from '../../components/QuotationProviders/CreateQuotationProviders'
import ErrorBoundary from '../../components/Error/ErrorBoundary'
import DetailsQuotationProviders from '../../components/QuotationProviders/DetailsQuotationProviders'
import ChangeStateQuotationProviders from '../../components/QuotationProviders/ChangeStatedQuotationProviders'

const QuotationProviders = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListQuotationProviders />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
          {action === 'editing' ? <UpdateQuotationProviders /> : undefined}
          {action === 'creating' ? <CreateQuotationProviders /> : undefined}
          {action === 'details' ? <DetailsQuotationProviders /> : undefined}
          {action === 'changing' ? <ChangeStateQuotationProviders /> : undefined}
        </NewModal>
      </div>
    </div>

  )
}

export default QuotationProviders
