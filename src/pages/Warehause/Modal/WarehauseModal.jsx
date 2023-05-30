import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function WareHauseModal ({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {
  const [dataForm, setDataForm] = useState({
    name: '',
    ubication: '',
    warehouseTypeId: 0,
    statedAt: true
  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/warehause', dataForm)
      get()
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/warehause/${isEditingInfo.id}`, isEditingInfo)
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
               Nombre de la bodega
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre del tipo de bodega"
                value={isEditingInfo.name}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="ubication"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Ubicacion de la bodega
              </label>
              <textarea
                type="text"
                name="ubication"
                id="ubication"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ubicacion de la bodega "
                value={isEditingInfo.ubication}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, ubication: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="warehouseTypeId"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
               Tipo de bodega
              </label>
              <input
                type="number"
                name="warehouseTypeId"
                id="warehouseTypeId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ubicacion de la bodega "
                value={isEditingInfo.warehouseTypeId}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, warehouseTypeId: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar bodega
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
                Nombre de la bodega
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre tipo de bodega"
                value={dataForm.name}
                onChange={e =>
                  setDataForm({ ...dataForm, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="ubication"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Ubicacion
              </label>
              <input
                type="text"
                name="ubication"
                id="ubication"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ubicacion"
                value={dataForm.ubication}
                onChange={e =>
                  setDataForm({ ...dataForm, ubication: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="warehouseTypeId"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
               Tipo de Bodega
              </label>
              <input
                type="number"
                name="warehouseTypeId"
                id="warehouseTypeId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Descripcion"
                value={dataForm.warehouseTypeId}
                onChange={e =>
                  setDataForm({ ...dataForm, warehouseTypeId: e.target.value })
                }
                required
              />
              </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
             Registrar  bodega
            </button>
          </form>
        </>
          )}
    </>
  )
}

export default WareHauseModal
