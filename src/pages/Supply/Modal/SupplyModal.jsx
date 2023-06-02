import { useState } from 'react'
import clientAxios from '../../../config/Axios/clientAxios'

function SupplyModal ({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {
  const [dataForm, setDataForm] = useState({
    Name: '',
    IdUnitMeasure: 1,
    MinimunUnitMeasureId: 1,
    DangerIndicators: '',
    UseInstructions: '',
    Advices: '',
    SupplyType: 1,
    SortingWord: 1,
    Quantity: 0,
    AverageCost: 0,
    StatedAt: true,
    IdWarehouse: 1
  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/supply', dataForm)
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/supply/${isEditingInfo.IdSupply}`, isEditingInfo)
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
                Nombre insumo
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={isEditingInfo.Name}
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
                value={isEditingInfo.UseInstructions}
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
                value={isEditingInfo.DangerIndicators}
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
                value={isEditingInfo.Advices}
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
                value={isEditingInfo.Quantity}
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
                value={isEditingInfo.AverageCost}
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
                value={dataForm.Name}
                onChange={e =>
                  setDataForm({ ...dataForm, Name: e.target.value })
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
                value={dataForm.UseInstructions}
                onChange={e =>
                  setDataForm({ ...dataForm, UseInstructions: e.target.value })
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
                value={dataForm.DangerIndicators}
                onChange={e =>
                  setDataForm({ ...dataForm, DangerIndicators: e.target.value })
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
                value={dataForm.Advices}
                onChange={e =>
                  setDataForm({ ...dataForm, Advices: e.target.value })
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
                value={dataForm.Quantity}
                onChange={e =>
                  setDataForm({ ...dataForm, Quantity: e.target.value })
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
                value={dataForm.AverageCost}
                onChange={e =>
                  setDataForm({ ...dataForm, AverageCost: e.target.value })
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
