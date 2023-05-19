import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function SupplyModal () {
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

  const handleSubmit = async e => {
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

    get()
  }

  const get = () => {
    window.location.reload()
  }

  return (
    <>
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Crear insumos
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre insumo
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Nombre"
                    value={dataForm.name}
                    onChange={e => setDataForm({ ...dataForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="useInstructions"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Instrucciones
                  </label>
                  <input
                    type="text"
                    name="useInstructions"
                    id="useInstructions"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Instrucciones"
                    value={dataForm.useInstructions}
                    onChange={e => setDataForm({ ...dataForm, useInstructions: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="dangerIndicators"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Indicadores de peligro insumo
                  </label>
                  <input
                    type="text"
                    name="dangerIndicators"
                    id="dangerIndicators"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Indicadores de peligro"
                    value={dataForm.dangerIndicators}
                    onChange={e => setDataForm({ ...dataForm, dangerIndicators: e.target.value })}
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Consejos"
                    value={dataForm.advices}
                    onChange={e => setDataForm({ ...dataForm, advices: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="quantity"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Cantidad
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Cantidad"
                    value={dataForm.quantity}
                    onChange={e => setDataForm({ ...dataForm, quantity: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="averageCost"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Costo Promedio
                  </label>
                  <input
                    type="number"
                    name="averageCost"
                    id="averageCost"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Costo Promedio"
                    value={dataForm.averageCost}
                    onChange={e => setDataForm({ ...dataForm, averageCost: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Crear insumo
                </button>
              </form>
    </>
  )
}

export default SupplyModal
