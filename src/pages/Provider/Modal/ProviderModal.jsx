import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function ProviderModal ({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {
  const [dataForm, setDataForm] = useState({
    nameCompany: '',
    nitCompany: 0,
    email: '',
    phone: '',
    companyAddress: ''
  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/provider', dataForm)
      get()
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/provider/${isEditingInfo.id}`, isEditingInfo)
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
                htmlFor="nitCompany"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
               NIT de la empresa
              </label>
              <input
                type="number"
                name="nitCompany"
                id="nitCompany"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nit"
                value={isEditingInfo.nitCompany}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, nitCompany: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="nameCompany"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombre de la empresa
              </label>
              <input
                type="text"
                name="nameCompany"
                id="nameCompany"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={isEditingInfo.nameCompany}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, nameCompany: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
               Correo de la empresa
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Correo"
                value={isEditingInfo.email}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Telefono de la empresa
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Telefono"
                value={isEditingInfo.phone}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, phone: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="companyAddress"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Direccion de la empresa
              </label>
              <input
                type="text"
                name="companyAddress"
                id="companyAddress"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Direccion"
                value={isEditingInfo.companyAddress}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, companyAddress: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar Proveedor
            </button>
          </form>
        </>
          )
        : (
          <>
          <form className="space-y-6" onSubmit={handleSubmitCreate}>
            <div>
              <label
                htmlFor="nitCompany"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nit de la compañia
              </label>
              <input
                type="number"
                name="nitCompany"
                id="nitCompany"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nit"
                value={dataForm.nitCompany}
                onChange={e =>
                  setDataForm({ ...dataForm, nitCompany: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="nameCompany"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombre de la empresa
              </label>
              <input
                type="text"
                name="nameCompany"
                id="nameCompany"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={dataForm.nameCompany}
                onChange={e =>
                  setDataForm({ ...dataForm, nameCompany: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Correo de la empresa
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Correo"
                value={dataForm.email}
                onChange={e =>
                  setDataForm({ ...dataForm, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Telefono de la empresa
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Telefono"
                value={dataForm.phone}
                onChange={e =>
                  setDataForm({ ...dataForm, phone: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="companyAddress"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Direccion de la empresa
              </label>
              <input
                type="text"
                name="companyAddress"
                id="companyAddress"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Direccion"
                value={dataForm.companyAddress}
                onChange={e =>
                  setDataForm({ ...dataForm, companyAddress: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Registrar proveedor
            </button>
          </form>
        </>
          )}
    </>
  )
}

export default ProviderModal
