import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostQuotationClientDetailMutation } from '../../context/Api/Common'
import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'
import Spinner from '../Spinner/Spinner'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import clientAxios from '../../config/clientAxios'

const validationSchema = Yup.object().shape({
    quotationClientId: Yup.string().required('Campo requerido'),
    productId: Yup.string().required('Campo requerido'),
    technicalSpecifications: Yup.string().required('Campo requerido'),
    productHeight: Yup.string().required('Campo requerido'),
    productWidth: Yup.string().required('Campo requerido'),
    numberOfPages: Yup.string().required('Campo requerido'),
    inkQuantity: Yup.string().required('Campo requerido'),
    productQuantity: Yup.string().required('Campo requerido'),
    unitValue: Yup.string().required('Campo requerido'),
    fullValue: Yup.string().required('Campo requerido'),
})

const getQuotationClient = () => {
  return new Promise((resolve, reject)=> {
    clientAxios.get('/QuotationClient').then(
      (result)=> {
        const QuotationClient = result.data.map((quotationClient) => ({
          'label':quotationClient.id,
          'value': quotationClient.id 
        }))
        resolve(QuotationClient)
      },
      (error)=> {
        reject(error)
      }
    )
  })
}

const getProduct = () => {
  return new Promise((resolve, reject)=> {
    clientAxios.get('/Product').then(
      (result)=> {
        const Product = result.data.map((product)=> ({
          'label': product.name,
          'value': product.id
        }))
        resolve(Product)
      },
      (error)=> {
        reject(error)
      }
    )
  })
}

function CreateQuotationClientDetail () {

  const [quotationclientOptions, setQuotationclientOptions] = useState([])
  const [productOptions, setProductOptions] = useState([])

  const fetchOptions = () => {
    getQuotationClient().then((options) => {
      setQuotationclientOptions(options)
    })
    getProduct().then((options) => {
      setProductOptions(options)
    })
  }
  useEffect(() => {
    fetchOptions()
  }, [])
  const dispatch = useDispatch()
  const [createQuotationClientDetail, { error, isLoading }] = usePostQuotationClientDetailMutation()

  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    await createQuotationClientDetail(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Cotizacion creada con exito')
  }

  return (
    <Formik
      initialValues={{
    quotationClientId: '',
    productId: '',
    technicalSpecifications: '',
    productHeight: '',
    productWidth: '',
    numberOfPages: '',
    inkQuantity: '',
    productQuantity: '',
    unitValue: '',
    fullValue: '',
      }}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
        {({ setFieldValue }) => (
        <Form>
        <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-2/4">
              <label htmlFor="productId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Producto <b className="text-red-700">*</b>
              </label>
              <Field
              type="text"
                as="select"
                name="productId"
                id="productId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="100"
              >
                {productOptions.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
            </option>
             ))}
              </Field>
              <ErrorMessage
                name="productId"
                component="div"
                className="text-red-500"
              />
              </div>
          <div className="w-2/4">
              <label htmlFor="technicalSpecifications" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Especificaciones tecnicas  <b className="text-red-700">*</b>
              </label>
              <textarea
                type="text"
                name="technicalSpecifications"
                id="technicalSpecifications"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                rows="6" cols="40"
                placeholder="El producto contara..."
              />
               <ErrorMessage
                name="technicalSpecifications"
       
                component="div"
                className="text-red-500"
              />
            </div>
            

          </div>
          <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-1/4">
              <label htmlFor="productHeight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Altura del producto <b className="text-red-700">*</b>
              </label>
              <Field
                type="number"
                name="productHeight"
                id="productHeight"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="1.0.5"
              />
               <ErrorMessage
                name="productHeight"
       
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="productWidth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Ancho del producto <b className="text-red-700">*</b>
              </label>
              <Field
                type="number"
                name="productWidth"
                id="productWidth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="1.0.5"
              />
       <ErrorMessage
                name="productWidth"
       
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="numberOfPages" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Numero de paginas <b className="text-red-700">*</b>
              </label>
              <Field
                type="number"
                name="numberOfPages"
                id="numberOfPages"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="1.0.5"
              />
               <ErrorMessage
                name="numberOfPages"
       
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="inkQuantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Cantidad de tinta <b className="text-red-700">*</b>
              </label>
              <Field
                type="number"
                name="inkQuantity"
                id="inkQuantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="1.0.5"
              />
               <ErrorMessage
                name="inkQuantity"
       
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="productQuantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Cantidad de producto <b className="text-red-700">*</b>
              </label>
              <Field
                type="number"
                name="productQuantity"
                id="productQuantity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="1.0.5"
              />
              <ErrorMessage
              name="productQuantity"
              component="div"
              className="text-red-500"
              />
            </div>
          </div>
          <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-2/4">
              <label htmlFor="unitValue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Valor unico <b className="text-red-700">*</b>
              </label>
              <Field
                type="number"
                name="unitValue"
                id="unitValue"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="1.0.5"
              />
               <ErrorMessage
                name="unitValue"
       
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-2/4">
              <label htmlFor="fullValue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Valor total <b className="text-red-700">*</b>
              </label>
              <Field
               type="number"
               name="fullValue"
               id="fullValue"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
               placeholder="1.0.5"
              />
              <ErrorMessage
              name="fullValue"
              component="div"
              className="text-red-500"
              />
            </div>
          </div>


          <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-2/4">
              <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Cotizacion CLiente <b className="text-red-700">*</b>
              </label>
              <Field
              type="number"
                as="select"
                name="quotationClientId"
                id="quotationClientId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="100"
              >
                 {quotationclientOptions.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
            </option>
            ))}
              </Field>
              <ErrorMessage
                name="quotationClientId"
       
                component="div"
                className="text-red-500"
              />
              </div>
          
          </div>
          <button
            type="submit"
            className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Crear Cotizacion
          </button>
        </Form>
             )}
    </Formik>
  )
}

export function CreateButtomQuotationClientDetail () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Crear Cotizacion Cliente Detalles' }))
    dispatch(setAction({ action: 'creating' }))
  }
  // ?

  return (
    <button
      className="flex items-center justify-center border border-gray-400 text-black bg-green-600 hover:bg-white focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
      type="button"
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
      Crear Cotizacion
    </button>
  )
}

export default CreateQuotationClientDetail
