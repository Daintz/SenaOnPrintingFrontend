import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function SupplyDetailsModal ({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {
  const [dataForm, setDataForm] = useState({
    supplyId: 1,
    providerId: 1,
    description: '',
    supplyCost: 0,
    batch: '',
    initialQuantity: 0,
    entryDate: 0,
    expirationDate: 0,
    actualQuantity: 0,
    statedAt: true

  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/SupplyDetails', dataForm)
      get()
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/SupplyDetails/${isEditingInfo.id}`, isEditingInfo)
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
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Descripcion
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
                htmlFor="supplyCost"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Costo insumo
              </label>
              <input
                type="number"
                name="supplyCost"
                id="supplyCost"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Costo insumo"
                value={isEditingInfo.supplyCost}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, supplyCost: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="batch"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Lote
              </label>
              <input
                type="text"
                name="batch"
                id="batch"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Lote"
                value={isEditingInfo.batch}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, batch: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="initialQuantity"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Cantidad inicial
              </label>
              <input
                type="number"
                name="initialQuantity"
                id="initialQuantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Cantidad inicial"
                value={isEditingInfo.initialQuantity}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, initialQuantity: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="entryDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Fecha de entrada
              </label>
              <input
                type="text"
                name="entryDate"
                id="entryDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Fecha de entrada"
                value={isEditingInfo.entryDate}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, entryDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="expirationDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Fecha de caducidad
              </label>
              <input
                type="text"
                name="expirationDate"
                id="expirationDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Fecha de caducidad"
                value={isEditingInfo.expirationDate}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, expirationDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="actualQuantity"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Cantidad actual
              </label>
              <input
                type="number"
                name="actualQuantity"
                id="actualQuantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Cantidad actual"
                value={isEditingInfo.actualQuantity}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, actualQuantity: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar loteo de insumo
            </button>
          </form>
        </>
          )
        : (
          <>
          <form className="space-y-6" onSubmit={handleSubmitCreate}>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Descripcion
              </label>
              <input
                type="text"
                name="description"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Descripcion"
                value={dataForm.description}
                onChange={e =>
                  setDataForm({ ...dataForm, description: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="supplyCost"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Costo insumo
              </label>
              <input
                type="number"
                name="supplyCost"
                id="supplyCost"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Costo insumo"
                value={dataForm.supplyCost}
                onChange={e =>
                  setDataForm({ ...dataForm, supplyCost: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="batch"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Lote
              </label>
              <input
                type="text"
                name="batch"
                id="batch"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Lote"
                value={dataForm.batch}
                onChange={e =>
                  setDataForm({ ...dataForm, batch: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="initialQuantity"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Cantidad inicial
              </label>
              <input
                type="number"
                name="initialQuantity"
                id="initialQuantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Cantidad inicial"
                value={dataForm.initialQuantity}
                onChange={e =>
                  setDataForm({ ...dataForm, initialQuantity: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="entryDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Fecha de entrada
              </label>
              <input
                type="date"
                name="entryDate"
                id="entryDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Fecha de entrada"
                value={dataForm.entryDate}
                onChange={e =>
                  setDataForm({ ...dataForm, entryDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="expirationDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Fecha de caducidad
              </label>
              <input
                type="date"
                name="expirationDate"
                id="expirationDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Fecha de caducidad"
                value={dataForm.expirationDate}
                onChange={e =>
                  setDataForm({ ...dataForm, expirationDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="actualQuantity"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Cantidad actual
              </label>
              <input
                type="number"
                name="actualQuantity"
                id="actualQuantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Cantidad actual"
                value={dataForm.actualQuantity}
                onChange={e =>
                  setDataForm({ ...dataForm, actualQuantity: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="supplyId"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Id insumo
              </label>
              <input
                type="number"
                name="supplyId"
                id="supplyId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Id insumo"
                value={dataForm.supplyId}
                onChange={e =>
                  setDataForm({ ...dataForm, supplyId: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="providerId"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Id proveedor
              </label>
              <input
                type="number"
                name="providerId"
                id="providerId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Id proveedor"
                value={dataForm.providerId}
                onChange={e =>
                  setDataForm({ ...dataForm, providerId: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Crear loteo de insumo
            </button>
          </form>
        </>
          )}
    </>
  )
}

export default SupplyDetailsModal