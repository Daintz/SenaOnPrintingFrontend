import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function SupplyModelModal ({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {
  const [dataForm, setDataForm] = useState({
    name: '',
    code:'',
    description:'',
    pictogramFile:'',

  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/SupplyPictogrmas', dataForm)
      get()
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/SupplyPictogrmas/${isEditingInfo.id}`, isEditingInfo)
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
                htmlFor="code"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Codigo de pictograma
              </label>
              <input
                type="text"
                name="code"
                id="code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Codigo"
                value={isEditingInfo.code}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, code: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombre del pictograma
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
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Descripcion de pictograma
              </label>
              <input
                type="text"
                name="description"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Descripcion"
                value={isEditingInfo.description}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, description: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Documento de pictograma
              </label>
              <input
                type="text"
                name="pictogramFile"
                id="pictogramFile"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="pictogramFile"
                value={isEditingInfo.pictogramFile}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, pictogramFile: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar Pictograma
            </button>
          </form>
        </>
          )
        : (
          <>
          <form className="space-y-6" onSubmit={handleSubmitCreate}>
            <div>
              <label
                htmlFor="code"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Codigo del Pictograma
              </label>
              <input
                type="text"
                name="code"
                id="code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="code"
                value={dataForm.code}
                onChange={e =>
                  setDataForm({ ...dataForm, code: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="code"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombre del pictograma
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
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Descripcion del pictograma
              </label>
              <input
                type="text"
                name="description"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="description"
                value={dataForm.description}
                onChange={e =>
                  setDataForm({ ...dataForm, description: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="pictogrmaFile"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Documento del pictograma
              </label>
              <input
                type="text"
                name="pictogramFile"
                id="pictogramFile"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="pictogramFile"
                value={dataForm.pictogramFile}
                onChange={e =>
                  setDataForm({ ...dataForm, pictogramFile: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Crear Pictograma
            </button>
          </form>
        </>
          )}
    </>
  )
}

export default SupplyModelModal
