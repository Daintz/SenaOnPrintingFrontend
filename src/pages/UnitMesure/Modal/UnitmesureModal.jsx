import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'
import UnitMesure from '../UnitMesure'

function UnitMesureModal ({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {
  const [dataForm, setDataForm] = useState({
    name: '',
    statedAt: true,
    abbreviation: '',
    type: '',
    conversionFactor: '',

  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/UnitMesure', dataForm)
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/UnitMesure/${isEditingInfo.id}`, isEditingInfo)
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
                 Nombre            </label>
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
                htmlFor="abbreviation"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
           Abreviatura           </label>
              <input
                type="text"
                name="abbreviation"
                id="abbreviation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={isEditingInfo.abbreviation}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, abbreviation: e.target.value })
                }
                required
              />
            </div>
              <div>
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                 Tipo               </label>
              <input
                type="text"
                name="type"
                id="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={isEditingInfo.type}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, type: e.target.value })
                }
                required
              />
            </div>   <div>
              <label
                htmlFor="conversionFactor"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                 Factor            </label>
              <input
                type="text"
                name="conversionFactor"
                id="conversionFactor"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={isEditingInfo.conversionFactor}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, conversionFactor: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar Unidad
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
                htmlFor="abbreviation"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
               Abreviatura
              </label>
              <input
                type="text"
                name="abbreviation"
                id="abbreviation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={dataForm.abbreviation}
                onChange={e =>
                  setDataForm({ ...dataForm, abbreviation: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
               Tipo
              </label>
              <input
                type="number"
                name="type"
                id="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={dataForm.type}
                onChange={e =>
                  setDataForm({ ...dataForm, type: e.target.value })
                }
                required
              />
            </div>
             <div>
              <label
                htmlFor="conversionFactor"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
               Factor
              </label>
              <input
                type="number"
                name="conversionFactor"
                id="conversionFactor"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={dataForm.conversionFactor}
                onChange={e =>
                  setDataForm({ ...dataForm, conversionFactor: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Crear Unidad
            </button>
          </form>
        </>
          )}
    </>
  )
}

export default UnitMesureModal
