import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function MachineModal ({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {
  const [dataForm, setDataForm] = useState({
    name: '',
    statedAt : true,
    minimumHeight: '',
    minimumWidth: '',
    maximumHeight: '',
    maximumWidth:'',
    costByUnit:'',
    costByHour :'',
  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/Machine', dataForm)
      get()
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/Machine/${isEditingInfo.id}`, isEditingInfo)
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
              Nombre de la maquina 
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nit"
                value={isEditingInfo.name}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="minimumHeight"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
               Altura Minima
              </label>
              <input
                type="number"
                name="minimumHeight"
                id="minimumHeight"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={isEditingInfo.minimumHeight}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, minimumHeight: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="minimumWidth"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
             Ancho minimo
              </label>
              <input
                type="number"
                name="minimumWidth"
                id="minimumWidth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Correo"
                value={isEditingInfo.minimumWidth}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, minimumWidth: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="maximumHeight"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
               Altura Maxima 
              </label>
              <input
                type="number"
                name="maximumHeight"
                id="maximumHeight"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Telefono"
                value={isEditingInfo.maximumHeight}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, maximumHeight : e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="maximumWidth"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Ancho Maximo
              </label>
              <input
                type="number"
                name="maximumWidth"
                id="maximumWidth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Direccion"
                value={isEditingInfo.maximumWidth}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, maximumWidth: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label
                htmlFor="costByUnit"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
            Costo por unidad
              </label>
              <input
                type="number"
                name="costByUnit"
                id="costByUnit"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Direccion"
                value={isEditingInfo.costByUnit}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, costByUnit: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="costByHour"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
          Costo Por hora
              </label>
              <input
                type="number"
                name="costByHour"
                id="costByHour"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Direccion"
                value={isEditingInfo.costByHour}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, costByHour : e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar Maquina 
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
               Nombre Maquina 
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nit"
                value={dataForm.name}
                onChange={e =>
                  setDataForm({ ...dataForm, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="minimumHeight"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Altura minima 
              </label>
              <input
                type="number"
                name="minimumHeight"
                id="minimumHeight"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={dataForm.minimumHeight}
                onChange={e =>
                  setDataForm({ ...dataForm, minimumHeight: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="minimumWidth"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Ancho minimo
              </label>
              <input
                type="number"
                name="minimumWidth"
                id="minimumWidth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Correo"
                value={dataForm.maximumWidth}
                onChange={e =>
                  setDataForm({ ...dataForm, minimumWidth: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="maximumHeight"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Altura maxima
              </label>
              <input
                type="number"
                name="maximumHeight"
                id="maximumHeight"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Telefono"
                value={dataForm.maximumHeight}
                onChange={e =>
                  setDataForm({ ...dataForm, maximumHeight: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="maximumWidth"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Ancho maximo
              </label>
              <input
                type="number"
                name="maximumWidth"
                id="maximumWidth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Direccion"
                value={dataForm.maximumWidth}
                onChange={e =>
                  setDataForm({ ...dataForm, maximumWidth: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="costByUnit"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
               Coste por Unidad
              </label>
              <input
                type="number"
                name="costByUnit"
                id="costByUnit"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Direccion"
                value={dataForm.costByUnit}
                onChange={e =>
                  setDataForm({ ...dataForm, costByUnit: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="costByHour"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
              Coste por hora
              </label>
              <input
                type="number"
                name="costByHour"
                id="costByHour"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Direccion"
                value={dataForm.costByHour}
                onChange={e =>
                  setDataForm({ ...dataForm, costByHour: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Registrar Maquina
            </button>
          </form>
        </>
          )}
    </>
  )
}

export default MachineModal
