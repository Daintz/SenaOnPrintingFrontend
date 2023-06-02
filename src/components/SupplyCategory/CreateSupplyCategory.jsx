import { useState } from 'react'
import { usePostSupplyCategoryMutation } from '../../context/Api/Common'
import { changeAction, closeModal, openModal } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch } from 'react-redux'

function CreateSupplyCategory () {
  const dispatch = useDispatch()
  const [createSupplyCategory, { error, isLoading }] = usePostSupplyCategoryMutation()
  const [dataForm, setDataForm] = useState({
    name: '',
    description: ''
  })

  const handleSubmit = async e => {
    e.preventDefault()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    await createSupplyCategory(dataForm)

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
        Crear categoria insumo
      </button>
    </form>
  )
}

export function CreateButtomSupplyCategory () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(openModal({ title: 'Crear categoria de insumos' }))
  }
  // ?

  return (
    <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5"
        type="button"
        onClick={() => handleOpen()}
      >
        Crear categoria insumo
    </button>
  )
}

export default CreateSupplyCategory
