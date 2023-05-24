import { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import clientAxios from '../../config/clientAxios'
import ProviderModal from './Modal/ProviderModal'

const Provider = () => {
  const [dataProvider, setDataProvider] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isEditingInfo, setIsEditingInfo] = useState({
    nameCompany: '',
    nitCompany: 0,
    email: '',
    phone: '',
    companyAddress: '',
    statedAt: true
  })

  useEffect(() => {
    get()
  }, [])

  const get = async () => {
    const { data } = await clientAxios('/provider')
    setDataProvider(data)
  }

  const getProvider = async (id) => {
    const { data } = await clientAxios(`/provider/${id}`)
    setIsEditingInfo(data)
  }

  const deleteSupply = async (id) => {
    await clientAxios.delete(`/provider/${id}`)
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
          <div className="grid items-center justify-center rounded">
            <div className="col-end-12  items-center justify-center rounded">
            <div className="col-end-12  grid justify-items-end m-3">
              <button
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
                onClick={() => handleIsOpen('creating')}
              >
                Registrar proveedor
              </button>
              <Modal
                title={'Proveedor'}
                isOpen={isOpen}
                isEditing={isEditing}
                handleIsOpen={handleIsOpen}
              >
                <ProviderModal
                  isEditing={isEditing}
                  isEditingInfo={isEditingInfo}
                  setIsEditingInfo={setIsEditingInfo}
                  get={get}
                  setIsOpen={setIsOpen}
                />
              </Modal>
              </div>
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nit
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Empresa
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Correo
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Telefono
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Direccion
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Editar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataProvider
                    ? (
                        dataProvider.map(Provider => (
                      <tr
                        className="bg-white border-b"
                        key={Provider.idProvider}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {Provider.nitCompany}
                        </th>
                        <td className="px-6 py-4">{Provider.nameCompany}</td>
                        <td className="px-6 py-4">{Provider.email}</td>
                        <td className="px-6 py-4">{Provider.phone}</td>
                        <td className="px-6 py-4">{Provider.companyAddress}</td>
                        <td className="px-6 py-4">{Provider.statedAt ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Activo</span> : <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Inactivo</span>}</td>
                        <td className=" px-6 py-4 grid grid-cols-2  place-content-center">
                        <button
                          type="button"
                          onClick={() => {
                            getProvider(Provider.idProvider)
                            handleIsOpen('editing')
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>

                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            deleteSupply(Provider.idProvider)
                          }}

                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
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

export default Provider
