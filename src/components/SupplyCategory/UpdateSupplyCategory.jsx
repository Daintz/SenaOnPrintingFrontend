import { useEffect, useState } from 'react'
import { usePutSupplyCategoryByIdMutation } from '../../context/Api/Common'
import { changeAction, closeModal, openEditing, openModal } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'

function UpdateSupplyCategory () {
  const dispatch = useDispatch()
  const { editingData } = useSelector((state) => state.modal)
  const [updateSupplyCategory, { error, isLoading }] = usePutSupplyCategoryByIdMutation()
  const [dataForm, setDataForm] = useState({
    id: 0,
    name: '',
    description: ''
  })

  useEffect(() => {
    setDataForm(editingData)
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />
    await updateSupplyCategory(dataForm)

    dispatch(changeAction())
    dispatch(closeModal())
  }

  const inputs = [
    { key: 0, name: 'name', title: 'Nombre categoria insumo', type: 'text', placeholder: 'Nombre' },
    { key: 1, name: 'description', title: 'Descripción categoria insumo', type: 'text', placeholder: 'Descripción' }
  ]

  return (
    <form className="space-y-6" onSubmit={e => handleSubmit(e)}>
      {inputs.map((input) => (
        <div key={input.key}>
          <label
            htmlFor={input.name}
          >{input.title}</label>
          <input
            type={input.type}
            name={input.name}
            id={input.name}
            placeholder={input.placeholder}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={dataForm[input.name]}
            onChange={e => setDataForm({ ...dataForm, [input.name]: e.target.value })}
            required
          />
        </div>))}
      <button
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Actializar categoria insumo
      </button>
    </form>
  )
}

export function UpdateButtomSupplyCategory ({ supplyCategory }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleEdit = (data) => {
    dispatch(openModal({ title: 'Editar categoria de insumos' }))
    dispatch(openEditing({ editingData: data }))
  }
  // ?

  return (
    <button type="button" onClick={() => {
      handleEdit(supplyCategory)
    }}>
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
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    </button>
  )
}

export default UpdateSupplyCategory
