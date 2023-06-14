import { useDeleteLineatureByIdMutation } from '../../context/Api/Common'
import { changeAction } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { toast } from 'react-toastify'

function ChangeStateLineature ({ lineature }) {
  const dispatch = useDispatch()
  const [deleteLineature, { error, isLoading }] =
    useDeleteLineatureByIdMutation()

  const handleSubmit = async () => {
    await deleteLineature(lineature.id)
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />

    dispatch(changeAction())
    toast.success('Lineatura cambio de estado con exito')
  }

  return (
    <button type="button" onClick={ handleSubmit }>
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

export default ChangeStateLineature
