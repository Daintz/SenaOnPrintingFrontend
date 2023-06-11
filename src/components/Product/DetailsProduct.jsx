import { useDispatch } from 'react-redux'
import { openModal, setAction } from '../../context/Slices/Modal/ModalSlice'
import { BsClipboard2 } from 'react-icons/bs'

function DetailsProduct () {
  return (<p>Details</p>
  )
}

export function DetailsButtomProduct () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(openModal({ title: 'Detalles categoria de insumos' }))
    dispatch(setAction({ action: 'details' }))
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

export default DetailsProduct
