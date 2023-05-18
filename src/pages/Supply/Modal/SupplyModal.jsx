import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function SupplyModal () {
  const [dataApi, setDataApi] = useState({
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
      console.log(dataApi)
      const nuevoValorMinimunUnitMeasureId = 1
      const nuevoValorSupplyType = 2
      const nuevoValorSortingWord = 3
      const nuevoValorIdWarehouse = 4

      setDataApi({
        ...dataApi,
        minimunUnitMeasureId: nuevoValorMinimunUnitMeasureId,
        supplyType: nuevoValorSupplyType,
        sortingWord: nuevoValorSortingWord,
        idWarehouse: nuevoValorIdWarehouse
      })
      console.log(dataApi)
      const { data } = await clientAxios.post('/supply', dataApi)
      console.log(data)
    } catch (err) {
      console.log(err)
    }

    get()
  }

  const get = () => {
    // window.location.reload()
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
