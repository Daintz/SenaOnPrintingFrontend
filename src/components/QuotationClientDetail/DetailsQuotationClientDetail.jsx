import { useDispatch, useSelector } from 'react-redux'
import { openModal, setAction, setDetailsData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { BsClipboard2 } from 'react-icons/bs'

function DetailsQuotationClientDetail () {
  const { detailsData } = useSelector((state) => state.modal)
  const { quotationClientId, productId, technicalSpecifications, productHeight, productWidth, numberOfPages, inkQuantity, productQuantity, unitValue, fullValue, statedAt } = detailsData
  return (
    <>
      <p><b>Especificaciones Tecniacas:</b> {technicalSpecifications}</p>
      <p><b>Altura Producto:</b> {productHeight}</p>
      <p><b>Anchura Producto:</b> {productWidth}</p>
      <p><b>Numero de Paginas:</b> {numberOfPages}</p>
      <p><b>Cantidad de Tintas:</b> {inkQuantity}</p>
      <p><b>Cantidad de Producto:</b> {productQuantity}</p>
      <p><b>Valor Unico:</b> {unitValue}</p>
      <p><b>Valor Total:</b> {fullValue}</p>
      <p><b>Cotizacion Cliente ID:</b> {quotationClientId}</p>
      <p><b>Producto ID:</b> {productId}</p>
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

export function DetailsButtomQuotationClientDetail ({ quotationclientdetail }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '500px' }))
    dispatch(openModal({ title: 'Detalles cotizacion' }))
    dispatch(setAction({ action: 'details' }))
    dispatch(setDetailsData({ detailsData: quotationclientdetail }))
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

export default DetailsQuotationClientDetail
