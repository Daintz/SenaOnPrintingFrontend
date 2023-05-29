import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function ProductModal ({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {
  const [dataForm, setDataForm] = useState({
    typeProduct: '',
    name: '',
    characteristics: ''
  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/product', dataForm)
      get()
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/product/${isEditingInfo.id}`, isEditingInfo)
      get()
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {isEditing
        ? (
        <>
          <form className="space-y-6" onSubmit={handleSubmitEdit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombre producto
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={isEditingInfo.name}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tipo producto
              </label>
              <input
                type="text"
                name="type"
                id="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Descripción"
                value={isEditingInfo.typeProduct}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, typeProduct: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="characteristics"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Caracteristicas producto
              </label>
              <input
                type="text"
                name="characteristics"
                id="characteristics"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Caracteristicas"
                value={isEditingInfo.characteristics}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, characteristics: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar producto
            </button>
          </form>
        </>
          )
        : (
          <>
          <form className="space-y-6" onSubmit={handleSubmitCreate}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombre producto
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={dataForm.name}
                onChange={e =>
                  setDataForm({ ...dataForm, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tipo de producto
              </label>
              <input
                type="text"
                name="type"
                id="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Descripción"
                value={dataForm.typeProduct}
                onChange={e =>
                  setDataForm({ ...dataForm, typeProduct: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="characteristics"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Caracteristicas producto
              </label>
              <input
                type="text"
                name="characteristics"
                id="characteristics"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Descripción"
                value={dataForm.characteristics}
                onChange={e =>
                  setDataForm({ ...dataForm, characteristics: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Crear producto
            </button>
          </form>
        </>
          )}
    </>
  )
}

export default ProductModal
