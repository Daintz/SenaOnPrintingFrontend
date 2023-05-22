import { useEffect, useState } from 'react'
import clientAxios from '../../config/clientAxios'
import Modal from '../../components/Modal/Modal'
import SupplyModal from './Modal/SupplyModal'

const Supply = () => {
  const [dataSupplies, setDataSupplies] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingInfo, setIsEditingInfo] = useState({
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

  useEffect(() => {
    get()
  }, [])

  const get = async () => {
    const { data } = await clientAxios('/supply')
    setDataSupplies(data)
  }

  const getSupply = async (id) => {
    const { data } = await clientAxios(`/supply/${id}`)
    setIsEditingInfo(data)
  }

  const deleteSupply = async (id) => {
    await clientAxios.delete(`/supply/${id}`)
    get()
  }

  const changeStatusSupply = async (id, status) => {
    const changeState = !status
    await clientAxios.delete(`/supply/status/${id}?statedAt=${changeState}`)
    get()
  }

  const handleIsOpen = (state) => {
    setIsOpen(!isOpen)
    switch (state) {
      case 'creating':
        setIsEditing(false)
        break
      case 'editing':
        setIsEditing(true)
        break
    }
  }

  return (
    <>
      <div className="p-4">
        <div className="p-4 border-gray-200 border-dashed rounded-lg">
          <div className="flex items-center justify-center rounded">
            <div className="relative overflow-x-auto">
              <button
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
                onClick={() => handleIsOpen('creating')}
              >
                Crear insumo
              </button>
              <Modal>
                <SupplyModal />
              </Modal>
              <Modal
                title={'insumo'}
                isOpen={isOpen}
                isEditing={isEditing}
                handleIsOpen={handleIsOpen}
              >
                <SupplyModal
                  isEditing={isEditing}
                  isEditingInfo={isEditingInfo}
                  setIsEditingInfo={setIsEditingInfo}
                  get={get}
                />
              </Modal>
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Usar instrucciones
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Indicadores de peligro
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Consejos
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Cantidad
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Costo promedio
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Editar
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Eliminar
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Cambiar estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataSupplies
                    ? (
                        dataSupplies.map(supply => (
                      <tr
                        className="bg-white border-b"
                        key={supply.idSupply}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {supply.name}
                        </th>
                        <td className="px-6 py-4">{supply.dangerIndicators}</td>
                        <td className="px-6 py-4">{supply.useInstructions}</td>
                        <td className="px-6 py-4">{supply.advices}</td>
                        <td className="px-6 py-4">{supply.quantity}</td>
                        <td className="px-6 py-4">{supply.averageCost}</td>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                            onClick={() => {
                              getSupply(supply.idSupply)
                              handleIsOpen('editing')
                            }}
                          >
                            Editar
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                            onClick={() => {
                              deleteSupply(supply.idSupply)
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            className="focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                            onClick={() => {
                              changeStatusSupply(supply.idSupply, supply.statedAt)
                            }}
                          >
                            {supply.statedAt ? 'Activo' : 'Inactivo'}
                          </button>
                        </td>
                      </tr>
                        ))
                      )
                    : (
                    <p>No hay registros guardados</p>
                      )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Supply
