import { useDispatch, useSelector } from 'react-redux'
import { openModal, setAction, setDetailsData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { GrView } from 'react-icons/gr'

function DetailsRole () {
  const { detailsData } = useSelector((state) => state.modal)
  const { name, description, statedAt } = detailsData
  return (
    <>
      <p><b>Nombre:</b> {name}</p>
      <p><b>Descripción:</b> {description}</p>
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

export function DetailsButtonRole ({ role }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '500px' }))
    dispatch(openModal({ title: 'Detalles Rol' }))
    dispatch(setAction({ action: 'details' }))
    dispatch(setDetailsData({ detailsData: role }))
  }
  // ?

  return (
      <button type="button" onClick={() => {
        handleOpen()
      }}>
        <GrView alt="Icono detalles" title="Ver detalles del rol" className="opacity-60 h-5 w-5 mr-2" />
      </button>
  )
}

export default DetailsRole
