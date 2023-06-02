import { useDeleteSupplyCategoryByIdMutation } from '../../context/Api/Common'
import { changeAction } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch } from 'react-redux'

function ChangeStateSupplyCategory ({ supplyCategory }) {
  const dispatch = useDispatch()
  const [deleteSupplyCategory, { error, isLoading }] =
    useDeleteSupplyCategoryByIdMutation()

  const handleSubmit = async () => {
    await deleteSupplyCategory(supplyCategory.id)
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    dispatch(changeAction())
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

export default ChangeStateSupplyCategory
