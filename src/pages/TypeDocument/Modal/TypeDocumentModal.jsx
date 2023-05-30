import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function TypeDocumentModal ({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {
  const [dataForm, setDataForm] = useState({
    name: '',
    abbreviation: '',
    statedAt: true,
  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/type_document', dataForm)
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/type_document/${isEditingInfo.id}`, isEditingInfo)
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
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre del Tipo de Documento"
                value={isEditingInfo.name}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="abbreviation"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Abreviacion
              </label>
              <input
                type="text"
                name="abbreviation"
                id="abbreviation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Abreviacion del Tipo de Documento"
                value={isEditingInfo.abbreviation}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, abbreviation: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar Tipo de Documento
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
                Nombre
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre del Tipo de Documento"
                value={dataForm.name}
                onChange={e =>
                  setDataForm({ ...dataForm, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="abbreviation"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Abreviacion
              </label>
              <input
                type="text"
                name="abbreviation"
                id="abbreviation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Abreviacion del Tipo de Documento"
                value={dataForm.abbreviation}
                onChange={e =>
                  setDataForm({ ...dataForm, abbreviation: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Crear Tipo de Documento
            </button>
          </form>
        </>
          )}
    </>
  )
}


export default TypeDocumentModal
