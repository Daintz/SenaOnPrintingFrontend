import { useDispatch, useSelector } from 'react-redux'
import { openModal, setAction, setDetailsData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { GrView } from 'react-icons/gr'
import { useGetProductByIdQuery } from '../../context/Api/Common'



function DetailsOrderProduction () {
  const { detailsData } = useSelector((state) => state.modal);
  const { productId } = detailsData;

  // Manejo de datos del producto
  const { data: productInfo, isLoading, isError } = useGetProductByIdQuery(productId);
  // const { name, materialReception, programVersion,productId, colorProfile, specialInk, inkCode, idPaperCut, image, observations, statedAt, orderStatus, program, scheme} = detailsData
  // const { data: productInfo, isLoading, isError } = useGetProductByIdQuery(detailsData.productId);
  console.log(productInfo)
  const productProperties = Object.entries(productInfo || {});
  const middleIndex = Math.ceil(productProperties.length / 2);
  const firstColumnProperties = productProperties.slice(0, middleIndex);
  const secondColumnProperties = productProperties.slice(middleIndex);

  return (
    <>
    <div className="flex gap-5 grid-cols-4 mb-3">
    <div className="w-2/4">
    <p><b>Cotización:</b> {detailsData.name}</p>
      <p><b>Recepción del material:</b> {detailsData.materialReception}</p>
      <p><b>Programa:</b> {detailsData.program}</p>
      <p><b>Versión programa:</b> {detailsData.programVersion}</p>
      <p><b>Pefil de color:</b> {detailsData.colorProfile}</p>
    <p><b>Esquema:</b> <img src={detailsData.scheme} width={200} height={200}/></p>
    <ul>
          {firstColumnProperties.map(([property, value]) => (
            <li key={property}>
              <strong>{property}:</strong> {value}
            </li>
          ))}
        </ul>
    </div>
    <div className="w-2/4">
      <p><b>Observaciones:</b> {detailsData.observations}</p>
      <p><b>Estado de orden:</b> {detailsData.orderStatus}</p>
    <p><b>Imagen:</b><img src={detailsData.image} width={200} height={200}/></p>
    <ul>
          {secondColumnProperties.map(([property, value]) => (
            <li key={property}>
              <strong>{property}:</strong> {value}
            </li>
          ))}
        </ul>
    </div>
    </div>
      <p>
      <b>Estado:</b> {' '}
      {detailsData.statedAt
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
