import { useState } from 'react'
import clientAxios from '../../../config/clientAxios'

function QuotationProvidersModal ({ isEditingInfo, isEditing, setIsEditingInfo, get, setIsOpen }) {
  const [dataForm, setDataForm] = useState({
    quotationDate: '',
    quotationFile:'',
    fullValue:0,
    providerId:1,


  })

  const handleSubmitCreate = async e => {
    e.preventDefault()

    try {
      await clientAxios.post('/QuotationProviders', dataForm)
      get()
      setIsOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitEdit = async e => {
    e.preventDefault()

    try {
      await clientAxios.put(`/QuotationProviders/${isEditingInfo.id}`, isEditingInfo)
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
                htmlFor="quotationDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Fecha de la Cotización
              </label>
              <input
                type="text"
                name="quotationDate"
                id="quotationDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Fecha"
                value={isEditingInfo.quotationDate}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, quotationDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="quotitationFile"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Documento de cotización
              </label>
              <input
                type="text"
                name="quotationFile"
                id="quotationFile"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Documento de cotización"
                value={isEditingInfo.quotationFile}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, quotationFile: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="FullValue"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Valor total de la cotizacion
              </label>
              <input
                type="number"
                name="fullValue"
                id="fullValue"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Descripcion"
                value={isEditingInfo.fullValue}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, fullValue: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Id de proveedor
              </label>
              <input
                type="number"
                name="providerId"
                id="providerId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="providerId"
                value={isEditingInfo.providerId}
                onChange={e =>
                  setIsEditingInfo({ ...isEditingInfo, providerId: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Editar Pictograma
            </button>
          </form>
        </>
          )
        : (
          <>
          <form className="space-y-6" onSubmit={handleSubmitCreate}>
            <div>
              <label
                htmlFor="code"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Fecha de la cotización
              </label>
              <input
                type="date"
                name="quotationDate"
                id="quotationDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="quotationDate"
                value={dataForm.quotationDate}
                onChange={e =>
                  setDataForm({ ...dataForm, quotationDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="quotationDate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Documento de la cotización
              </label>
              <input
                type="text"
                name="quotationFile"
                id="quotationFile"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Documento"
                value={dataForm.quotationFile}
                onChange={e =>
                  setDataForm({ ...dataForm, quotationFile: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="Valor total"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Valor de la cotización
              </label>
              <input
                type="number"
                name="fullValue"
                id="fullValue"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="fullValue"
                value={dataForm.fullValue}
                onChange={e =>
                  setDataForm({ ...dataForm, fullValue: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label
                htmlFor="pictogrmaFile"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Id del proveedor
              </label>
              <input
                type="number"
                name="providerId"
                id="providerId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="providerId"
                value={dataForm.providerId}
                onChange={e =>
                  setDataForm({ ...dataForm, providerId: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Crear Pictograma
            </button>
          </form>
        </>
          )}
    </>
  )
}

export default QuotationProvidersModal
