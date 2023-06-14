import { useDispatch, useSelector } from 'react-redux'
import { openModal, setAction, setDetailsData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { BsClipboard2 } from 'react-icons/bs'

function DetailsQuotationClient () {
  const { detailsData } = useSelector((state) => state.modal)
  const { orderDate, deliverDate, userId, clientId, typeServiceId, statedAt } = detailsData
  return (
    <>
      <p><b>Fecha de orden:</b> {orderDate}</p>
      <p><b>Fecha de entrega:</b> {deliverDate}</p>
      <p><b>Usuario Id:</b> {userId}</p>
      <p><b>Cliente Id:</b> {clientId}</p>
      <p><b>Tipo de servicio Id:</b> {typeServiceId}</p>
      <p>
      <b>Estado:</b> {' '}
      {statedAt
        ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
            Activo
          </span>
        : <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            Inactivo
          </span>}
      </p>
    </>
  )
}

export function DetailsButtomQuotationClient ({ quotationclient }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '500px' }))
    dispatch(openModal({ title: 'Detalles categoria de insumos' }))
    dispatch(setAction({ action: 'details' }))
    dispatch(setDetailsData({ detailsData: quotationclient }))
  }
  // ?

  return (
      <button type="button" onClick={() => {
        handleOpen()
      }}>
        <BsClipboard2 className="h-5 w-5 mr-2" />
      </button>
  )
}

export default DetailsQuotationClient
