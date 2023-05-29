import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function ClientsModal ({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {
  const [dataForm, setDataForm] = useState({
    name: '',
    phone: '',
    email: '',
    center: '',
    area: '',
    regional: ''
  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/Client', dataForm)
      get()
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/Client/${isEditingInfo.id}`, isEditingInfo)
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
                Nombre:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={isEditingInfo.name}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Telefono:
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
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Correo:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="example@email"
                value={isEditingInfo.email}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Centro
              </label>
              <input
                type="text"
                name="center"
                id="center"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="centro"
                value={isEditingInfo.center}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, center: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Area
              </label>
              <input
                type="text"
                name="area"
                id="area"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="area"
                value={isEditingInfo.area}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, area: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Regional
              </label>
              <input
                type="text"
                name="regional"
                id="regional"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="regional"
                value={isEditingInfo.regional}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, regional: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar cliente
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
                Nombre Cliente
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={dataForm.name}
                onChange={e =>
                  setDataForm({ ...dataForm, name: e.target.value })
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
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Correo
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="example@email.com"
                value={dataForm.email}
                onChange={e =>
                  setDataForm({ ...dataForm, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="center"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Centro
              </label>
              <input
                type="text"
                name="center"
                id="center"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Centro"
                value={dataForm.center}
                onChange={e =>
                  setDataForm({ ...dataForm, center: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="area"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Area
              </label>
              <input
                type="text"
                name="area"
                id="area"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Area"
                value={dataForm.area}
                onChange={e =>
                  setDataForm({ ...dataForm, area: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="regional"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Regional
              </label>
              <input
                type="text"
                name="regional"
                id="regional"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Regional"
                value={dataForm.regional}
                onChange={e =>
                  setDataForm({ ...dataForm, regional: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Crear cliente
            </button>
          </form>
        </>
          )}
    </>
  )
}

export default ClientsModal
