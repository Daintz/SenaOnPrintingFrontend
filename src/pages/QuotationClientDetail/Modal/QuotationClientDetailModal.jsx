import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function QuotationClientModal({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {
  const [dataForm, setdataForm] = useState({
    quotationClientId: 0,
    productId: 0,
    technicalSpecifications: '',
    productHeight: 0,
    productWidth: 0,
    numberOfPages: 0,
    inkQuantity: 0,
    productQuantity: 0,
    unitValue: 0,
    fullValue: 0,
    statedAt: true

  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/quotationclientDetail', dataForm)
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/quotationclientDetail/${isEditingInfo.id}`, isEditingInfo)
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
            <form className="space-y-6 overscroll-contain" onSubmit={handleSubmitEdit}>

              <div>
                <label
                  htmlFor="technicalSpecifications"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Especificaciones tecnicas
                </label>
                <input
                  type="text"
                  name="technicalSpecifications"
                  id="technicalSpecifications"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nombre"
                  value={isEditingInfo.technicalSpecifications}
                  onChange={e =>
                    setIsEditingInfo({ ...isEditingInfo, technicalSpecifications: e.target.value })
                  }
                  required
                />
              </div>
              <div class="flex">
                <div class="w-1/2">
                  <label
                    htmlFor="productHeight"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Altura producto
                  </label>
                  <input
                    type="number"
                    name="productHeight"
                    id="productHeight"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5"
                    placeholder="altura producto"
                    value={isEditingInfo.productHeight}
                    onChange={e =>
                      setIsEditingInfo({ ...isEditingInfo, productHeight: e.target.value })
                    }
                    required
                  />
                </div>
                <div class="w-1/2">
                  <label
                    htmlFor="materialReception"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Ancho producto
                  </label>
                  <input
                    type="number"
                    name="productWidth"
                    id="productWidth"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Ancho producto"
                    value={isEditingInfo.productWidth}
                    onChange={e =>
                      setIsEditingInfo({ ...isEditingInfo, productWidth: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="numberOfPages"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Numero de paginas
                </label>
                <input
                  type="number"
                  name="numberOfPages"
                  id="numberOfPages"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Instrucciones"
                  value={isEditingInfo.numberOfPages}
                  onChange={e =>
                    setIsEditingInfo({ ...isEditingInfo, numberOfPages: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="inkQuantity"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Cantidad de tintas
                </label>
                <input
                  type="number"
                  name="inkQuantity"
                  id="useInstructions"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Instrucciones"
                  value={isEditingInfo.inkQuantity}
                  onChange={e =>
                    setIsEditingInfo({ ...isEditingInfo, inkQuantity: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="productQuantity"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Cantidad de producto
                </label>
                <input
                  type="number"
                  name="productQuantity"
                  id="useInstructions"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Instrucciones"
                  value={isEditingInfo.productQuantity}
                  onChange={e =>
                    setIsEditingInfo({ ...isEditingInfo, productQuantity: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="unitValue"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Valor unico
                </label>
                <input
                  type="number"
                  name="unitValue"
                  id="useInstructions"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Instrucciones"
                  value={isEditingInfo.unitValue}
                  onChange={e =>
                    setIsEditingInfo({ ...isEditingInfo, unitValue: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="fullValue"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Valor total
                </label>
                <input
                  type="number"
                  name="fullValue"
                  id="useInstructions"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Instrucciones"
                  value={isEditingInfo.fullValue}
                  onChange={e =>
                    setIsEditingInfo({ ...isEditingInfo, fullValue: e.target.value })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Editar Cotizacion Cliente Detalles
              </button>
            </form>
          </>
        )
        : (
          <>
            <form className="space-y-6 overscroll-x-auto" onSubmit={handleSubmitCreate}>
              <div>
                <label
                  htmlFor="technicalSpecifications"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Especificaciones tecnicas
                </label>
                <input
                  type="text"
                  name="technicalSpecifications"
                  id="technicalSpecifications"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Nombre"
                  value={dataForm.technicalSpecifications}
                  onChange={e =>
                    setdataForm({ ...dataForm, technicalSpecifications: e.target.value })
                  }
                  required
                />
              </div>
              <div class="flex">
              <div class="w-1/2">
                <label
                  htmlFor="productHeight"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Altura del producto
                </label>
                <input
                  type="number"
                  name="productHeight"
                  id="useInstructions"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5"
                  placeholder="Instrucciones"
                  value={dataForm.productHeight}
                  onChange={e =>
                    setdataForm({ ...dataForm, productHeight: e.target.value })
                  }
                  required
                />
              </div>
              <div class="w-1/2">
                <label
                  htmlFor="productWidth"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Ancho del producto
                </label>
                <input
                  type="text"
                  name="productWidth"
                  id="useInstructions"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Instrucciones"
                  value={dataForm.productWidth}
                  onChange={e =>
                    setdataForm({ ...dataForm, productWidth: e.target.value })
                  }
                  required
                />
              </div>
              </div>
              <div>
                <label
                  htmlFor="numberOfPages"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Numero de paginas
                </label>
                <input
                  type="number"
                  name="numberOfPages"
                  id="numberOfPages"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Instrucciones"
                  value={dataForm.numberOfPages}
                  onChange={e =>
                    setdataForm({ ...dataForm, numberOfPages: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="inkQuantity"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Cantidad de tintas
                </label>
                <input
                  type="number"
                  name="inkQuantity"
                  id="useInstructions"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Instrucciones"
                  value={dataForm.inkQuantity}
                  onChange={e =>
                    setdataForm({ ...dataForm, inkQuantity: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="productQuantity"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Cantidad de producto
                </label>
                <input
                  type="number"
                  name="productQuantity"
                  id="useInstructions"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Instrucciones"
                  value={dataForm.productQuantity}
                  onChange={e =>
                    setdataForm({ ...dataForm, productQuantity: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="unitValue"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Valor unico
                </label>
                <input
                  type="number"
                  name="unitValue"
                  id="useInstructions"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Instrucciones"
                  value={dataForm.unitValue}
                  onChange={e =>
                    setdataForm({ ...dataForm, unitValue: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="fullValue"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Valor total
                </label>
                <input
                  type="number"
                  name="fullValue"
                  id="useInstructions"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Instrucciones"
                  value={dataForm.fullValue}
                  onChange={e =>
                    setdataForm({ ...dataForm, fullValue: e.target.value })
                  }
                  required
                />
              </div>
              <div class="flex">
              <div class="w-1/2">
                <label
                  htmlFor="quotationClientId"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Cotizacion Cliente Id
                </label>
                <input
                  type="number"
                  name="quotationClientId"
                  id="useInstructions"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5"
                  placeholder="Instrucciones"
                  value={dataForm.quotationClientId}
                  onChange={e =>
                    setdataForm({ ...dataForm, quotationClientId: e.target.value })
                  }
                  required
                />
              </div>
              <div class="w-1/2">
                <label
                  htmlFor="productId"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Producto Id
                </label>
                <input
                  type="number"
                  name="productId"
                  id="productId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Instrucciones"
                  value={dataForm.productId}
                  onChange={e =>
                    setdataForm({ ...dataForm, productId: e.target.value })
                  }
                  required
                />
              </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Crear Cotizacion Clientes Detalles
              </button>
            </form>
          </>
        )}
    </>
  )
}

export default QuotationClientModal