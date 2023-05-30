import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function LineatureModal ({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {
  const [dataForm, setDataForm] = useState({
    lineature: '',
    typePoint: ''
  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/Lineature', dataForm)
      get()
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/Lineature/${isEditingInfo.id}`, isEditingInfo)
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
                htmlFor="lineature"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Lineatura
              </label>
              <input
                type="text"
                name="lineature"
                id="lineature"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={isEditingInfo.lineature}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, lineature: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="typePoint"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tipo de punto
              </label>
              <input
                type="text"
                name="typePoint"
                id="typePoint"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Descripción"
                value={isEditingInfo.typePoint}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, typePoint: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar lineatura
            </button>
          </form>
        </>
          )
        : (
          <>
          <form className="space-y-6" onSubmit={handleSubmitCreate}>
            <div>
              <label
                htmlFor="lineature"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Lineatura
              </label>
              <input
                type="text"
                name="lineature"
                id="lineature"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={dataForm.lineature}
                onChange={e =>
                  setDataForm({ ...dataForm, lineature: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="typePoint"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tipo de punto
              </label>
              <input
                type="text"
                name="typePoint"
                id="typePoint"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Descripción"
                value={dataForm.typePoint}
                onChange={e =>
                  setDataForm({ ...dataForm, typePoint: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Crear lineatura
            </button>
          </form>
        </>
          )}
    </>
  )
}

export default LineatureModal
