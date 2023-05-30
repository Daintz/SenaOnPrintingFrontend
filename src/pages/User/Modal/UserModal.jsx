import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function UserModal ({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {

// const getRoles = async () => {
//   const { data } = await clientAxios.get('/role')
//   return data
// }

// const getTypeDocuments = async () => {
//   const { data } = await clientAxios.get('/type_document')
//   return data
// }

  const [dataForm, setDataForm] = useState({
    names: '',
    surnames: '',
    typeDocumentId: 0,
    documentNumber: 0,
    phone: '',
    address: '',
    email: '',
    roleId: 0,
    passwordDigest: '',
    statedAt: true,
  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/user', dataForm)
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/user/${isEditingInfo.id}`, isEditingInfo)
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
                htmlFor="names"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombres
              </label>
              <input
                type="text"
                name="names"
                id="names"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombres del Usuario"
                value={isEditingInfo.names}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, names: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="surnames"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Apellidos
              </label>
              <input
                type="text"
                name="surnames"
                id="surnames"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Apellidos del Usuario"
                value={isEditingInfo.surnames}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, surnames: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="typeDocumentId"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tipo de Documento
              </label>
              <input
                type="text"
                name="typeDocumentId"
                id="typeDocumentId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Tipo de Documento del Usuario"
                value={isEditingInfo.typeDocumentId}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, typeDocumentId: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="documentNumber"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Numero de Documento
              </label>
              <input
                type="number"
                name="documentNumber"
                id="documentNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Documento del Usuario"
                value={isEditingInfo.documentNumber}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, documentNumber: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Telefono
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Telefono del Usuario"
                value={isEditingInfo.phone}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, phone: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Direccion
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Direccion del Usuario"
                value={isEditingInfo.address}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, address: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Correo Electronico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Correo del Usuario"
                value={isEditingInfo.email}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="passwordDigest"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="passwordDigest"
                id="passwordDigest"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Contraseña del Usuario"
                value={isEditingInfo.passwordDigest}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, passwordDigest: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="roleId"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Rol
              </label>
              <input
                type="text"
                name="roleId"
                id="roleId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Rol del Usuario"
                value={isEditingInfo.roleId}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, roleId: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar Usuario
            </button>
          </form>
        </>
          )
        : (
        <>
          <form className="space-y-6" onSubmit={handleSubmitCreate}>
          <div>
              <label
                htmlFor="names"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombres
              </label>
              <input
                type="text"
                name="names"
                id="names"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombres del Usuario"
                value={dataForm.names}
                onChange={e =>
                  setDataForm({ ...dataForm, names: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="surnames"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Apellidos
              </label>
              <input
                type="text"
                name="surnames"
                id="surnames"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Apellidos del Usuario"
                value={dataForm.surnames}
                onChange={e =>
                  setDataForm({ ...dataForm, surnames: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="typeDocumentId"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tipo de Documento
              </label>
              <input
                type="text"
                name="typeDocumentId"
                id="typeDocumentId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Tipo de Documento del Usuario"
                value={dataForm.typeDocumentId}
                onChange={e =>
                  setDataForm({ ...dataForm, typeDocumentId: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="documentNumber"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Numero de Documento
              </label>
              <input
                type="number"
                name="documentNumber"
                id="documentNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Documento del Usuario"
                value={dataForm.documentNumber}
                onChange={e =>
                  setDataForm({ ...dataForm, documentNumber: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Telefono
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Telefono del Usuario"
                value={dataForm.phone}
                onChange={e =>
                  setDataForm({ ...dataForm, phone: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Direccion
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Direccion del Usuario"
                value={dataForm.address}
                onChange={e =>
                  setDataForm({ ...dataForm, address: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Correo Electronico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Correo del Usuario"
                value={dataForm.email}
                onChange={e =>
                  setDataForm({ ...dataForm, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="passwordDigest"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Contraseña
              </label>
              <input
                type="password"
                name="passwordDigest"
                id="passwordDigest"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Contraseña del Usuario"
                value={dataForm.passwordDigest}
                onChange={e =>
                  setDataForm({ ...dataForm, passwordDigest: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="roleId"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Rol
              </label>
              <input
                type="number"
                name="roleId"
                id="roleId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Rol del Usuario"
                value={dataForm.roleId}
                onChange={e =>
                  setDataForm({ ...dataForm, roleId: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Crear Usuario
            </button>
          </form>
        </>
          )}
    </>
  )
}

export default UserModal
