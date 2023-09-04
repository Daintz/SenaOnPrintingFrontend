import { useDispatch, useSelector } from 'react-redux'
import { openModal, setAction, setDetailsData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { BsClipboard2 } from 'react-icons/bs'

function DetailsSupplyDetails () {
  const { detailsData } = useSelector((state) => state.modal)
  const { id, description, supplyCost, entryDate, expirationDate, actualQuantity, statedAt, supplyId, providerId , warehouseId} = detailsData
  return (
    <>
      {/* <p><b>Lote:</b> {id}</p> */}
      <p><b>Descripcion:</b> {description}</p>
      {/* <p><b>Costo insumo:</b> {supplyCost}</p> */}
      <p><b>Fecha de entrada:</b> {entryDate}</p>
      <p><b>Fecha de caducidad:</b> {expirationDate}</p>
      <p><b>Insumo:</b> {supplyId}</p>
      <p><b>Proveedor:</b> {providerId}</p>
      <p><b>Bodega:</b> {warehouseId}</p>
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

export function DetailsButtomSupplyDetails ({ supplyDetails }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: 'w-[500px]' }))
    dispatch(openModal({ title: 'Detalles compra de insumos' }))
    dispatch(setAction({ action: 'details' }))
    dispatch(setDetailsData({ detailsData: supplyDetails }))
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

export default DetailsSupplyDetails
