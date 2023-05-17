import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function SupplyCategoryModal () {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const { data } = await clientAxios.post('/supplyCategory', { name, description })
      console.log(data)
    } catch (err) {
      console.log(err)
    }

    get()
  }

  const get = () => {
    window.location.reload()
  }

  return (
    <>
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Crear insumo
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre categoria insumo
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Nombre"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Descripción categoria insumo
                  </label>
                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Descripción"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Crear categoria insumo
                </button>
              </form>
    </>
  )
}

export default SupplyCategoryModal
