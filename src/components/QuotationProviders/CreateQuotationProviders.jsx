import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Provider, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostQuotationProvidersMutation } from '../../context/Api/Common'
import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'
import Spinner from '../Spinner/Spinner'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { data } from 'autoprefixer'
import clientAxios from '../../config/clientAxios'

const validationSchema = Yup.object().shape({
  quotationDate: Yup.date().required('Campo requerido'),
  quotationFile: Yup.string().required('Campo requerido'),
  fullValue: Yup.number().required('Campo requerido'),
  providerId: Yup.number().required('Campo requerido')
})



function CreateQuotationProviders () {
  const [ProviderOptions, setProviderOptions] = useState([]);

  
  useEffect(() => {
    fetchOptions();
  }, []);

  //GET PARA EL SELECT
  const getProvider = () => {
    return new Promise((resolve, reject) => {
      clientAxios.get('/Provider').then(
        (result) => {
          const Providers = result.data.map((provider) => ({
            'id': provider.id,
            'name': provider.nameCompany
        }))
          resolve(Providers)
        },
        (error) => {
          reject(error)
        }
      )
    })
  }
 //CERRADO
 const fetchOptions = () => {
  getProvider().then((options) => {
    setProviderOptions(options);
  });

};
  const dispatch = useDispatch()
  const [createQuotationProviders, { error, isLoading }] = usePostQuotationProvidersMutation()
  const [previewImage, setPreviewImage] = useState(null)


  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    const formData = new FormData()
    formData.append('quotationDate', values.quotationDate)
    formData.append('quotationFileInfo', values.quotationFile)
    formData.append('fullValue', values.fullValue)
    formData.append('providerId', values.providerId)
    for (const num of formData.entries()) {
      console.log(num)
    }

    await createQuotationProviders(formData)
    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }

    toast.success('Cotización a proveedores creada con exito', { autoClose: 1000 })
  }
  const handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Formik
      initialValues={{
        quotationDate: '',
        quotationFile: '',
        fullValue: '',
        providerId: ''

      }}
      onSubmit={(values) => {
        console.log(values)
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
      {({ setFieldValue }) => (
  <Form className="space-y-6">

  <label
    htmlFor="quotationDate"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
  >
    fecha de la cotización
        </label>
        <Field
        type="date"
        name="quotationDate"
        id="quotationDate"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
        placeholder="Fecha de la cotización"
        />
        <ErrorMessage
      name="quotationDate"
      component="div"
      className="text-red-500"
    />
        <div>
        <label
              htmlFor="quotationFile"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Documento Cotización
            </label>
            {previewImage && <img src={previewImage} alt="Preview" width={100} height={100} />}
            <input
              type="file"
              name="quotationFile"
              id="quotationFile"
              placeholder="Cotización"
              onChange={event => {
                setFieldValue('quotationFile', event.target.files[0])
                handleFileChange(event)
              }}
            />
            <ErrorMessage
      name="quotationFile"
      component="div"
      className="text-red-500"
    />
        </div>

        <label
          htmlFor="fullValue"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Valor de la cotización
        </label>
        <Field
          type="number"
          name="fullValue"
          id="fullValue"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="Valor de la cotización"
        />
        <ErrorMessage
      name="fullValue"
      component="div"
      className="text-red-500"
    />
        <label
          htmlFor="providerId"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Proveedor
          </label>
        <Field
          as="select"
          name="providerId"
          id="providerId"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="id del proveedor">
          {/* Opciones del select */}
          {ProviderOptions && ProviderOptions.map(provider => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        
        <ErrorMessage
      name="providerId"
      component="div"
      className="text-red-500"
    /> 
    </Field>
        <button
        type="submit"
        className="flex items-center justify-center border border-gray-700 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-700 font-medium rounded-lg text-sm px-10 py-2"
      
        >
          Crear Cotización a proveedores
            
        </button>
      </Form>
      )}
    </Formik>
  )
}

export function CreateButtomQuotationProviders () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Crear Cotización a proveedores' }))
    dispatch(setAction({ action: 'creating' }))
  }
  // ?

  return (
    <button
    className="flex items-center justify-center border border-gray-400 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
    onClick={() => handleOpen()}
  >
  <svg
      className="h-3.5 w-3.5 mr-2"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
      />
    </svg>
      Crear Cotización a proveedores
    </button>
  )
}

export default CreateQuotationProviders
