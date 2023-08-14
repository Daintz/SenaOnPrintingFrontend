import { useDispatch, useSelector } from 'react-redux'
import { openModal, setAction, setDetailsData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { GrView } from 'react-icons/gr'

function DetailsOrderProduction () {
  
  const { detailsData } = useSelector((state) => state.modal)
  const { name, materialReception, programVersion, colorProfile, specialInk, inkCode, idPaperCut, image, observations, statedAt, orderStatus, program, scheme} = detailsData
  return (
    <>
    <div className="flex gap-5 grid-cols-4 mb-3">
    <div className="w-2/4">
    <p><b>Cotización:</b> {name}</p>
      <p><b>Recepción del material:</b> {materialReception}</p>
      <p><b>Programa:</b> {program}</p>
      <p><b>Versión programa:</b> {programVersion}</p>
      <p><b>Pefil de color:</b> {colorProfile}</p>
    <p><b>Esquema:</b> <img src={scheme} width={200} height={200}/></p>

    </div>
    <div className="w-2/4">
    <p><b>Tinta especial:</b> {specialInk}</p>
    <p><b>Código de tinta:</b> {inkCode}</p>
      <p><b>Corte de papel:</b> {idPaperCut}</p>
      <p><b>Observaciones:</b> {observations}</p>
      <p><b>Estado de orden:</b> {orderStatus}</p>
    <p><b>Imagen:</b><img src={image} width={200} height={200}/></p>
    </div>
    </div>
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

export function DetailsButtonOrderProduction ({ orderProduction }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: 'w-[900px]' }))
    dispatch(openModal({ title: 'Detalles orden de producción' }))
    dispatch(setAction({ action: 'details' }))
    dispatch(setDetailsData({ detailsData: orderProduction }))
  }
  // ?

  return (
    
      <button type="button" onClick={() => {
        handleOpen()
      }}
      >
      <GrView alt="Icono detalles" title="Ver detalles de OP" className="opacity-60 h-5 w-5 mr-2" />
      </button>
      
  )
}

export default DetailsOrderProduction
