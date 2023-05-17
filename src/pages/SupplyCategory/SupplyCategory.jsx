import { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import clientAxios from '../../config/clientAxios'
import SupplyCategoryModal from './Modal/SupplyCategoryModal'

const SupplyCategory = () => {
  const [dataSupplies, setDataSupplies] = useState([])

  useEffect(() => {
    get()
  }, [])

  const get = async () => {
    const { data } = await clientAxios('/supplyCategory')
    setDataSupplies(data)
  }

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex items-center justify-center rounded">
            <div className="relative overflow-x-auto">
            <button
                data-modal-target="defaultModal"
                data-modal-toggle="defaultModal"
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Crear categoria insumo
              </button>
              <Modal>
                <SupplyCategoryModal />
              </Modal>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Edit
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataSupplies
                    ? dataSupplies.map(supply => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={supply.idSupplyCategory}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {supply.name}
                    </th>
                    <td className="px-6 py-4">{supply.description}</td>
                    <td className="px-6 py-4"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Editar</button></td>
                    <td className="px-6 py-4"><button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Elimar</button></td>
                  </tr>
                    ))
                    : <p>No hay registros guardados</p>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SupplyCategory
