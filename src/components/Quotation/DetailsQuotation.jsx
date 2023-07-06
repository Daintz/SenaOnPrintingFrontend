import { useDispatch, useSelector } from 'react-redux'
import { openModal, setAction, setDetailsData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { BsClipboard2 } from 'react-icons/bs'

function DetailsQuotation() {
  const { detailsData } = useSelector((state) => state.modal)
  const { orderDate, deliverDate, userId, clientId, typeServiceId, quotationStatus, quotationClientId, productId, technicalSpecifications, productHeight, productWidth, numberOfPages, inkQuantity, productQuantity, unitValue, fullValue, statedAt } = detailsData
  console.log(detailsData)
  return (
    <>
    <div className="flex gap-5 grid-cols-4 mb-3">
    <div className="w-2/4">
    <p><b>Fecha Inicial:</b> {orderDate}</p>
      <p><b>Fecha de entrega:</b> {deliverDate}</p>
      <p><b>Usuario:</b> {userId}</p>
      <p><b>Cliente:</b> {clientId}</p>
      <p><b>Tipo de servicio:</b> {typeServiceId}</p>
      <p>
        <b>Estado de la cotización:</b> {quotationStatus === 1 ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
            En Proceso
          </span> : quotationStatus === 2 ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
            Aprobado
          </span> : quotationStatus === 3 ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
            No Aprobado
          </span> : 'No aprobado'}
      </p>

    </div>
    <div className="w-2/4">
    <p><b>Producto:</b> {productId}</p>
    <p><b>Observaciones:</b> {technicalSpecifications}</p>
    <p><b>Altura producto:</b> {productHeight}</p>
      <p><b>producto Ancho:</b> {productWidth}</p>
    </div>
    </div>
    </>
  )
}

export function DetailsButtomQuotation({ quotation }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: 'w-1000px' }))
    dispatch(openModal({ title: 'Detalles Cotizacion' }))
    dispatch(setAction({ action: 'details' }))
    dispatch(setDetailsData({ detailsData: quotation }))
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

export default DetailsQuotation
