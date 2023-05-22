import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function SupplyModal ({ isEditingInfo, isEditing, setIsEditingInfo, get }) {
  const [dataForm, setDataForm] = useState({
    name: '',
    minimunUnitMeasureId: 0,
    dangerIndicators: '',
    useInstructions: '',
    advices: '',
    supplyType: 0,
    sortingWord: 0,
    quantity: 0,
    averageCost: 0,
    statedAt: true,
    idWarehouse: 0
  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      const newValorMinimunUnitMeasureId = 1
      const newValorSupplyType = 1
      const newValorSortingWord = 1
      const newValorIdWarehouse = 1

      setDataForm({
        ...dataForm,
        minimunUnitMeasureId: newValorMinimunUnitMeasureId,
        supplyType: newValorSupplyType,
        sortingWord: newValorSortingWord,
        idWarehouse: newValorIdWarehouse
      })
      const { data } = await clientAxios.post('/supply', dataForm)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      const newValorMinimunUnitMeasureId = 1
      const newValorSupplyType = 1
      const newValorSortingWord = 1
      const newValorIdWarehouse = 1

      console.log(isEditingInfo)
      setIsEditingInfo({
        ...isEditingInfo,
        minimunUnitMeasureId: newValorMinimunUnitMeasureId,
        supplyType: newValorSupplyType,
        sortingWord: newValorSortingWord,
        idWarehouse: newValorIdWarehouse
      })
      console.log(isEditingInfo)
      const { data } = await clientAxios.put(`/supply/${isEditingInfo.idSupply}`, isEditingInfo)
      console.log(data)
      console.log(isEditingInfo)
      get()
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
                Nombre insumo
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
                htmlFor="useInstructions"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Instrucciones
              </label>
              <input
                type="text"
                name="useInstructions"
                id="useInstructions"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Instrucciones"
                value={isEditingInfo.useInstructions}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, useInstructions: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="dangerIndicators"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Indicadores de peligro insumo
              </label>
              <input
                type="text"
                name="dangerIndicators"
                id="dangerIndicators"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Indicadores de peligro"
                value={isEditingInfo.dangerIndicators}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, dangerIndicators: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="advices"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Consejos
              </label>
              <input
                type="text"
                name="advices"
                id="advices"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Consejos"
                value={isEditingInfo.advices}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, advices: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Cantidad
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Cantidad"
                value={isEditingInfo.quantity}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, quantity: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="averageCost"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Costo Promedio
              </label>
              <input
                type="number"
                name="averageCost"
                id="averageCost"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Costo Promedio"
                value={isEditingInfo.averageCost}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, averageCost: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar insumo
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
                Nombre insumo
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
                htmlFor="useInstructions"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Instrucciones
              </label>
              <input
                type="text"
                name="useInstructions"
                id="useInstructions"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Instrucciones"
                value={dataForm.useInstructions}
                onChange={e =>
                  setDataForm({ ...dataForm, useInstructions: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="dangerIndicators"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Indicadores de peligro insumo
              </label>
              <input
                type="text"
                name="dangerIndicators"
                id="dangerIndicators"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Indicadores de peligro"
                value={dataForm.dangerIndicators}
                onChange={e =>
                  setDataForm({ ...dataForm, dangerIndicators: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="advices"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Consejos
              </label>
              <input
                type="text"
                name="advices"
                id="advices"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Consejos"
                value={dataForm.advices}
                onChange={e =>
                  setDataForm({ ...dataForm, advices: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Cantidad
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Cantidad"
                value={dataForm.quantity}
                onChange={e =>
                  setDataForm({ ...dataForm, quantity: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="averageCost"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Costo Promedio
              </label>
              <input
                type="number"
                name="averageCost"
                id="averageCost"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Costo Promedio"
                value={dataForm.averageCost}
                onChange={e =>
                  setDataForm({ ...dataForm, averageCost: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Crear insumo
            </button>
          </form>
        </>
          )}
    </>
  )
}

export default SupplyModal
