import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function SupplyModal () {
  const [name, setName] = useState('')
  const [minimunUnitMeasureId, setMinimunUnitMeasureId] = useState(0)
  const [dangerIndicators, setDangerIndicators] = useState('')
  const [useInstructions, setUseInstructions] = useState('')
  const [advices, setAdvices] = useState('')
  const [supplyType, setSupplyType] = useState(0)
  const [sortingWord, setSortingWord] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [averageCost, setAverageCost] = useState(0)
  const [statedAt, setStatedAt] = useState(true)
  const [idWarehouse, setIdWarehouse] = useState(0)

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setMinimunUnitMeasureId(1)
      setSupplyType(1)
      setSortingWord(1)
      setIdWarehouse(1)
      setStatedAt(true)
      const { data } = await clientAxios.post('/supply', { name, minimunUnitMeasureId, dangerIndicators, useInstructions, advices, supplyType, sortingWord, quantity, averageCost, statedAt, idWarehouse })
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
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Instrucciones
                  </label>
                  <input
                    type="text"
                    name="dangerIndicators"
                    id="dangerIndicators"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Instrucciones"
                    value={useInstructions}
                    onChange={e => setUseInstructions(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
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
                    value={dangerIndicators}
                    onChange={e => setDangerIndicators(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Consejos
                  </label>
                  <input
                    type="text"
                    name="useInstructions"
                    id="useInstructions"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Consejos"
                    value={advices}
                    onChange={e => setAdvices(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Cantidad
                  </label>
                  <input
                    type="text"
                    name="dangerIndicators"
                    id="dangerIndicators"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Cantidad"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Costo Promedio
                  </label>
                  <input
                    type="text"
                    name="dangerIndicators"
                    id="dangerIndicators"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Costo Promedio"
                    value={averageCost}
                    onChange={e => setAverageCost(e.target.value)}
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
