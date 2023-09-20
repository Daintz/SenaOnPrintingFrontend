import NewModal from '../../components/Modal/NewModal'
import { useSelector } from 'react-redux'
import ListQuotation from '../../components/Quotation/ListQuotation'
import UpdateQuotation from '../../components/UpdateQuotationClient/UpdateQuotation'
import CreateQuotation from '../../components/CreateQuotationClient/CreateQuotation'
import DetailsQuotation from '../../components/Quotation/DetailsQuotation'
import ChangeStatusQuotation from '../../components/Quotation/ChangeStatusQuotation'
import ErrorBoundary from '../../components/Error/ErrorBoundary'


const QuotationClient = () => {
  // ? Esta linea de codigo me trae el estado 'isEditing' de src\context\Slices\Modal\ModalSlice.js que esto seria los estados del componente modal
  const { action } = useSelector((state) => state.modal)
  

  return (
    <div className="border-gray-200 border-dashed">
      <div className="overflow-x-auto">
        <ErrorBoundary>
          <ListQuotation />
        </ErrorBoundary>
        {/* Esta logica del modal esta acá para poder ser reutilizable */}
        <NewModal>
     
        {action === 'editing' ? <UpdateQuotation /> : undefined}
          {action === 'creating' ? <CreateQuotation /> : undefined}
          {action === 'details' ? <DetailsQuotation /> : undefined}
          {action === 'changing' ? <ChangeStatusQuotation /> : undefined}
         
        </NewModal>
      </div>
    </div>

  )
}

export default QuotationClient
