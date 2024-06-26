import { useDeleteOrderProductionStatusMutation } from '../../context/Api/Common'
import { changeAction, closeModal, openModal, setAction, setChangeStatusData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { toast } from 'react-toastify'
import { BsCheckCircle } from 'react-icons/bs'


function ChangeStatusOrderProduction ({ orderProduction }) {
  const dispatch = useDispatch()
  const [deleteOrderProduction, { error, isLoading }] =
  useDeleteOrderProductionStatusMutation()
  const { changeStatusData } = useSelector((state) => state.modal)
  const handleSubmit = async () => {
    await deleteOrderProduction(changeStatusData.id)
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />

    dispatch(changeAction())
    dispatch(closeModal())
    toast.success('Orden de producción cambio de estado con exito', {
      autoClose: 1000
    })
  }

  const handle = async () => {
    dispatch(closeModal())
  }

  return (
    <>
<p className="text-lg">Para cambiar de proceso esta orden de producción debes darle click en <b>aceptar</b>.</p>
      <div className="px-6 py-4 grid grid-cols-2  place-content-center" >
      <button type="button" className="focus:outline-none text-white bg-custom-blue hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" onClick={handleSubmit}>Aceptar</button>
        <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" onClick={handle}>Cancelar</button>
      </div>
    </>
  )
}

export function ChangeStatusButtonOrderProduction ({ orderProduction }) {
  const dispatch = useDispatch()
  const handleOpen = async () => {
    if (!orderProduction.statedAt) {
      // Puedes mostrar una notificación o realizar alguna acción en caso de que no cumpla la condición
      toast.error('Para continuar con el proceso recuerda activar la orden');
    } else {
    dispatch(setWidth({ width: '800px' }))
    dispatch(openModal({ title: 'Cambiar proceso' }))
    dispatch(setAction({ action: 'changingStatus' }))
    dispatch(setChangeStatusData({ changeStatusData: orderProduction }))
  }}

  return (
    <button type="button" onClick={ handleOpen }>
      <BsCheckCircle alt="Icono detalles" title="Cambiar proceso OP" className="h-5 w-5 mr-2"  />
    </button>
  )
}

export default ChangeStatusOrderProduction
