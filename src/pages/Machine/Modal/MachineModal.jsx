import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'
import Machine from '../Machines'

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
                 Nombre De la maquina              </label>
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
                htmlFor="minimumHeight"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
               Altura Minima              </label>
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
                 Ancho Minimo               </label>
              <input
                type="text"
                name="minimumWidth"
                id="minimumWidth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={isEditingInfo.minimumWidth}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, minimumWidth: e.target.value })
                }
                required
              />
            </div>   <div>
              <label
                htmlFor="maximumHeight"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                 Altura maxima             </label>
              <input
                type="text"
                name="maximumHeight"
                id="maximumHeight"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={isEditingInfo.maximumHeight}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, maximumHeight: e.target.value })
                }
                required
              />
            </div>   <div>
              <label
                htmlFor="maximumWidth"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
              Ancho Maximo        </label>
              <input
                type="text"
                name="maximumWidth"
                id="maximumWidth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={isEditingInfo.maximumWidth}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, maximumWidth: e.target.value })
                }
                required
              />
            </div>   <div>
              <label
                htmlFor="costByUnit"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                 Costo Por unidad             </label>
              <input
                type="text"
                name="costByUnit"
                id="costByUnit"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
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
               Costo por Hora             </label>
              <input
                type="text"
                name="costByHour"
                id="costByHour"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={isEditingInfo.costByHour}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, costByHour: e.target.value })
                }
                required
              />
            </div>
           
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar insumo
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
                Nombre de la  Maquina
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
                htmlFor="minimumHeight"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
               Altura Minima
              </label>
              <input
                type="text"
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
               Ancho Minima
              </label>
              <input
                type="text"
                name="minimumWidth"
                id="minimumWidth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={dataForm.minimumWidth}
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
               Altura Maximo
              </label>
              <input
                type="text"
                name="maximumHeight"
                id="maximumHeight"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={dataForm.maximumHeight}
                onChange={e =>
                  setDataForm({ ...dataForm, maximumHeight: e.target.value })
                }
                required
              />
            </div>  <div>
              <label
                htmlFor="maximumWidth"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
               Ancho Maximo              </label>
              <input
                type="text"
                name="maximumWidth"
                id="maximumWidth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={dataForm.maximumWidth}
                onChange={e =>
                  setDataForm({ ...dataForm, maximumWidth: e.target.value })
                }
                required
              />
            </div>  <div>
              <label
                htmlFor="costByUnit"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
         Costo por unidad
              </label>
              <input
                type="text"
                name="costByUnit"
                id="costByUnit"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
                value={dataForm.costByUnit}
                onChange={e =>
                  setDataForm({ ...dataForm, costByUnit: e.target.value })
                }
                required
              />
            </div>  <div>
              <label
                htmlFor="costByHour"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                costo por Hora
              </label>
              <input
                type="text"
                name="costByHour"
                id="costByHour"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Nombre"
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
              Crear Maquina
            </button>
          </form>
        </>
          )}
    </>
  )
}

export default MachineModal
