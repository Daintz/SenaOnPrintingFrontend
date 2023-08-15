import { useDispatch, useSelector } from 'react-redux'
import { openModal, setAction, setDetailsData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { BsClipboard2 } from 'react-icons/bs'

function DetailsSupply () {
  const { detailsData } = useSelector((state) => state.modal)
  const { name, dangerIndicators, useInstructions, advices, supplyType, sortingWord, quantity, averageCost, statedAt } = detailsData
  return (
    <>
    
    <p><b>Nombre insumo:</b> {name}</p>
      <p><b>Indicadores de peligro insumo:</b> {dangerIndicators}</p>
      <p><b>Instrucciones:</b> {useInstructions}</p>
      <p><b>Consejos:</b> {advices}</p>
      <p><b>Tipo insumo:</b> {supplyType === 1 ? 'Devolutivo' : 'Consumible'}</p>
      <p><b>Tipo peligrosidad:</b> {sortingWord === 1 ? 'Peligro' : 'Atención'}</p>
      <p><b>Cantidad:</b> {quantity}</p>
      <p><b>Costo promedio:</b> {averageCost}</p>
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

export function DetailsButtomSupply ({ supply }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '500px' }))
    dispatch(openModal({ title: 'Detalles de insumos ' }))
    dispatch(setAction({ action: 'details' }))
    dispatch(setDetailsData({ detailsData: supply }))
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

export default DetailsSupply
