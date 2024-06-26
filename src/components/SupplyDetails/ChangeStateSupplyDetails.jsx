import { useDeleteSupplyDetailsByIdMutation } from '../../context/Api/Common'
import { changeAction, closeModal, openModal, setAction, setChangeStatusData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { toast } from 'react-toastify'

function ChangeStateSupplyDetails () {
  const dispatch = useDispatch()
  const [deleteSupplyDetails, { error, isLoading }] =
  useDeleteSupplyDetailsByIdMutation()
  const { changeStatusData } = useSelector((state) => state.modal)

  const handleSubmit = async () => {
    await deleteSupplyDetails(changeStatusData.id)
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />

    dispatch(changeAction())
    dispatch(closeModal())
    toast.success('Cambio de estado con exito', {
      autoClose: 1000 // Duración de 1 segundos
    })
  }

  const handle = async () => {
    dispatch(closeModal())
  }

  return (
    <>
      <p className="text-lg">Para cambiar de estado la compra de insumos debes darle click a <b>aceptar</b>.</p>
      <div className="px-6 py-4 grid grid-cols-2  place-content-center" >
        <button type="button" className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" onClick={handleSubmit}>Aceptar</button>
        <button type="button" className="text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" onClick={handle}>Cancelar</button>
      </div>
    </>
   
  )
}

export function ChangeStateButtonSupplyDetails ({ supplyDetails }) {
  const dispatch = useDispatch()
  const handleOpen = async () => {
    dispatch(setWidth({ width: 'w-[400px]' }))
    dispatch(openModal({ title: 'Cambiar de estado' }))
    dispatch(setAction({ action: 'changing' }))
    dispatch(setChangeStatusData({ changeStatusData: supplyDetails }))
  }

  return (
    <button type="button" alt="Icono cambiar de estado" title="Cambiar de estado la categoria de insumos" onClick={ handleOpen }>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  )
}

export default ChangeStateSupplyDetails
