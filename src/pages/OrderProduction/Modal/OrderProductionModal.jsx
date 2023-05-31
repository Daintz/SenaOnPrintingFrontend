import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function OrderProductionModal({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {
  const [dataForm, setDataForm] = useState({
    quotationClientDetailId: 0,
    userId: 0,
    materialReception: '',
    programVersion: '',
    indented: 0,
    colorProfile: '',
    specialInk: '',
    inkCode: '',
    idPaperCut: 0,
    image: '',
    observations: '',
    statedAt: true,
    orderStatus: true,
    program: ''
  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/OrderProduction', dataForm)
      get()
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/OrderProduction/${isEditingInfo.id}`, isEditingInfo)
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
                  htmlFor="quotationClientDetailId"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Cotización
                </label>
                <input
                  type="text"
                  name="quotationClientDetailId"
                  id="quotationClientDetailId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nombre"
                  value={isEditingInfo.quotationClientDetailId}
                  onChange={e =>
                    setIsEditingInfo({ ...isEditingInfo, quotationClientDetailId: e.target.value })
                  }
                  required
                />
              </div>

              <div class="flex">
                <div class="w-1/2">
                  <label
                    htmlFor="userId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Usuario
                  </label>
                  <input
                    type="text"
                    name="userId"
                    id="userId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5"
                    placeholder="Nombre"
                    value={isEditingInfo.userId}
                    onChange={e =>
                      setIsEditingInfo({ ...isEditingInfo, userId: e.target.value })
                    }
                    required
                  />
                </div>
                <div class="w-1/2">
                  <label
                    htmlFor="materialReception"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Recepción material
                  </label>
                  <input
                    type="text"
                    name="materialReception"
                    id="materialReception"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Nombre"
                    value={isEditingInfo.materialReception}
                    onChange={e =>
                      setIsEditingInfo({ ...isEditingInfo, materialReception: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div class="flex">
                <div class="w-1/2">
                  <label
                    htmlFor="programVersion"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Versión del programa
                  </label>
                  <input
                    type="text"
                    name="programVersion"
                    id="programVersion"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5"
                    placeholder="Nombre"
                    value={isEditingInfo.programVersion}
                    onChange={e =>
                      setIsEditingInfo({ ...isEditingInfo, programVersion: e.target.value })
                    }
                    required
                  />
                </div>
                <div class="w-1/2">
                  <label
                    htmlFor="program"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Programa
                  </label>
                  <input
                    type="text"
                    name="program"
                    id="program"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Descripción"
                    value={isEditingInfo.program}
                    onChange={e =>
                      setIsEditingInfo({ ...isEditingInfo, program: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="indented"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Identado
                </label>
                <input
                  type="text"
                  name="indented"
                  id="indented"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nombre"
                  value={isEditingInfo.indented}
                  onChange={e =>
                    setIsEditingInfo({ ...isEditingInfo, indented: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="colorProfile"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Perfil de color
                </label>
                <input
                  type="text"
                  name="colorProfile"
                  id="colorProfile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nombre"
                  value={isEditingInfo.colorProfile}
                  onChange={e =>
                    setIsEditingInfo({ ...isEditingInfo, colorProfile: e.target.value })
                  }
                  required
                />
              </div>

              <div class="flex">
                <div class="w-1/2">
                  <label
                    htmlFor="specialInk"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Tinta especial
                  </label>
                  <input
                    type="text"
                    name="specialInk"
                    id="specialInk"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5"
                    placeholder="Nombre"
                    value={isEditingInfo.specialInk}
                    onChange={e =>
                      setIsEditingInfo({ ...isEditingInfo, specialInk: e.target.value })
                    }
                    required
                  />
                </div>
                <div class="w-1/2">
                  <label
                    htmlFor="inkCode"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Código de tinta
                  </label>
                  <input
                    type="text"
                    name="inkCode"
                    id="inkCode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Nombre"
                    value={isEditingInfo.inkCode}
                    onChange={e =>
                      setIsEditingInfo({ ...isEditingInfo, inkCode: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="idPaperCut"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Corte papel
                </label>
                <input
                  type="text"
                  name="idPaperCut"
                  id="idPaperCut"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nombre"
                  value={isEditingInfo.idPaperCut}
                  onChange={e =>
                    setIsEditingInfo({ ...isEditingInfo, idPaperCut: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Image
                </label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Descripción"
                  value={isEditingInfo.image}
                  onChange={e =>
                    setIsEditingInfo({ ...isEditingInfo, image: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="observations"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Observaciones
                </label>
                <input
                  type="text"
                  name="observations"
                  id="observations"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Descripción"
                  value={isEditingInfo.observations}
                  onChange={e =>
                    setIsEditingInfo({ ...isEditingInfo, observations: e.target.value })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Editar order de producción
              </button>
            </form>
          </>
        )
        : (
          <>
            <form className="space-y-6" onSubmit={handleSubmitCreate}>
              <div>
                <label
                  htmlFor="quotationClientDetailId"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Cotización cliente
                </label>
                <input
                  type="text"
                  name="quotationClientDetailId"
                  id="quotationClientDetailId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nombre"
                  value={dataForm.quotationClientDetailId}
                  onChange={e =>
                    setDataForm({ ...dataForm, quotationClientDetailId: e.target.value })
                  }
                  required
                />
              </div >
              <div class="flex">
                <div class="w-1/2">
                  <label
                    htmlFor="userId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Usuario
                  </label>
                  <input
                    type="text"
                    name="userId"
                    id="userId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5"
                    placeholder="Nombre"
                    value={dataForm.userId}
                    onChange={e =>
                      setDataForm({ ...dataForm, userId: e.target.value })
                    }
                    required
                  />
                </div>
                <div class="w-1/2">
                  <label
                    htmlFor="materialReception"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Recepción material
                  </label>
                  <input
                    type="text"
                    name="materialReception"
                    id="materialReception"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Nombre"
                    value={dataForm.materialReception}
                    onChange={e =>
                      setDataForm({ ...dataForm, materialReception: e.target.value })
                    }
                    required
                  />
                </div>
              </div>


              <div class="flex">
                <div class="w-1/2">
                  <label
                    htmlFor="programVersion"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Versión programa
                  </label>
                  <input
                    type="text"
                    name="programVersion"
                    id="programVersion"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5"
                    placeholder="Nombre"
                    value={dataForm.programVersion}
                    onChange={e =>
                      setDataForm({ ...dataForm, programVersion: e.target.value })
                    }
                    required
                  />
                </div>
                <div class="w-1/2">
                  <label
                    htmlFor="program"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Programa
                  </label>
                  <input
                    type="text"
                    name="program"
                    id="program"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Descripción"
                    value={dataForm.program}
                    onChange={e =>
                      setDataForm({ ...dataForm, program: e.target.value })
                    }
                    required
                  />
                </div>
              </div>


              <div>
                <label
                  htmlFor="indented"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Identado
                </label>
                <input
                  type="text"
                  name="indented"
                  id="indented"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nombre"
                  value={dataForm.indented}
                  onChange={e =>
                    setDataForm({ ...dataForm, indented: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="colorProfile"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Pefil de color
                </label>
                <input
                  type="text"
                  name="colorProfile"
                  id="colorProfile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nombre"
                  value={dataForm.colorProfile}
                  onChange={e =>
                    setDataForm({ ...dataForm, colorProfile: e.target.value })
                  }
                  required
                />
              </div>

              <div class="flex">

                <div class="w-1/2">
                  <label
                    htmlFor="specialInk"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Tinta especial
                  </label>
                  <input
                    type="text"
                    name="specialInk"
                    id="specialInk"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5"
                    placeholder="Nombre"
                    value={dataForm.specialInk}
                    onChange={e =>
                      setDataForm({ ...dataForm, specialInk: e.target.value })
                    }
                    required
                  />
                </div>
                <div class="w-1/2">
                  <label
                    htmlFor="inkCode"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Código tinta
                  </label>
                  <input
                    type="text"
                    name="inkCode"
                    id="inkCode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Nombre"
                    value={dataForm.inkCode}
                    onChange={e =>
                      setDataForm({ ...dataForm, inkCode: e.target.value })
                    }
                    required
                  />
                </div>
              </div>


              <div>
                <label
                  htmlFor="idPaperCut"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Corte papel
                </label>
                <input
                  type="text"
                  name="idPaperCut"
                  id="idPaperCut"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nombre"
                  value={dataForm.idPaperCut}
                  onChange={e =>
                    setDataForm({ ...dataForm, idPaperCut: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Imagen
                </label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Descripción"
                  value={dataForm.image}
                  onChange={e =>
                    setDataForm({ ...dataForm, image: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="observations"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Observaciones
                </label>
                <input
                  type="text"
                  name="observations"
                  id="observations"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Descripción"
                  value={dataForm.observations}
                  onChange={e =>
                    setDataForm({ ...dataForm, observations: e.target.value })
                  }
                  required
                />
              </div>


              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Crear imposición
              </button>
            </form>
          </>
        )}
    </>
  )
}

export default OrderProductionModal
