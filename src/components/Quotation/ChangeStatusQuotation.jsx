import { useDeleteQuotationStatusMutation } from '../../context/Api/Common'
import { changeAction, closeModal, openModal, setAction, setChangeStatusData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { toast } from 'react-toastify'
import { BsCheckCircle } from 'react-icons/bs'

function ChangeStatusQuotation ({ quotation }) {
  const dispatch = useDispatch()
  const [deletequotation, { error, isLoading }] =
  useDeleteQuotationStatusMutation()
  const { changeStatusData } = useSelector((state) => state.modal)
  const handleSubmit = async () => {
    await deletequotation(changeStatusData.id)
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />

    dispatch(changeAction())
    dispatch(closeModal())
    toast.success('Cotizacion cambio de estado con exito', {
      autoClose: 1000
    })
  }

  const handle = async () => {
    dispatch(closeModal())
  }

  return (
    <>
      <h1 className="text-4xl text-center font-bold">¿Estas seguro?</h1>
      <p className="text-lg">¿Estas seguro de <b>cambiar el estado</b> de esta cotizacion?</p>
      <div className="px-6 py-4 grid grid-cols-2  place-content-center" >
        <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" onClick={handleSubmit}>Cambiar de estado</button>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" onClick={handle}>Cancelar</button>
      </div>
    </>
  )
}

export function ChangeStatusButtonQuotation ({ quotation }) {
  const dispatch = useDispatch()
  const handleOpen = async () => {
    dispatch(setWidth({ width: '800px' }))
    dispatch(openModal({ title: 'Cambiar de estado' }))
    dispatch(setAction({ action: 'changingStatus' }))
    dispatch(setChangeStatusData({ changeStatusData: quotation }))
  }

  return (
    <button type="button" onClick={ handleOpen }>
      <BsCheckCircle className="h-5 w-5 mr-2" />
    </button>
  )
}

export default ChangeStatusQuotation
