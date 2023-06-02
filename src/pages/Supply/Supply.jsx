import { useEffect, useState } from 'react'
import clientAxios from '../../config/Axios/clientAxios'
import Modal from '../../components/Modal/Modal'
import SupplyModal from './Modal/SupplyModal'

const Supply = () => {
  const [dataSupplies, setDataSupplies] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingInfo, setIsEditingInfo] = useState({
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

  useEffect(() => {
    get()
  }, [])

  const get = async () => {
    const { data } = await clientAxios('/supply')
    setDataSupplies(data)
  }

  const getSupply = async id => {
    const { data } = await clientAxios(`/supply/${id}`)
    setIsEditingInfo(data)
  }

  const deleteSupply = async id => {
    await clientAxios.delete(`/supply/${id}`)
    get()
  }

  const changeStatusSupply = async (id, status) => {
    const changeState = !status
    await clientAxios.delete(`/supply/status/${id}?statedAt=${changeState}`)
    get()
  }

  const handleIsOpen = state => {
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
                  setIsOpen={setIsOpen}
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
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataSupplies
                    ? (
                        dataSupplies.map(supply => (
                      <tr className="bg-white border-b" key={supply.IdSupply}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {supply.Name}
                        </th>
                        <td className="px-6 py-4">{supply.DangerIndicators}</td>
                        <td className="px-6 py-4">{supply.UseInstructions}</td>
                        <td className="px-6 py-4">{supply.Advices}</td>
                        <td className="px-6 py-4">{supply.Quantity}</td>
                        <td className="px-6 py-4">{supply.AverageCost}</td>
                        <td className="px-6 py-4">
                          {supply.StatedAt
                            ? (
                            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                              Activo
                            </span>
                              )
                            : (
                            <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                              Inactivo
                            </span>
                              )}
                        </td>
                        <td className=" px-6 py-4 grid grid-cols-2  place-content-center">
                          <button
                            type="button"
                            onClick={() => {
                              getSupply(supply.IdSupply)
                              handleIsOpen('editing')
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              deleteSupply(supply.IdSupply)
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              changeStatusSupply(supply.IdSupply, supply.StatedAt)
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
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
