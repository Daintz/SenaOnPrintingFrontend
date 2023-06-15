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

function CreateQuotationClientDetail () {
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

  const inputs = [
    {
      key: 0,
      name: 'technicalSpecifications',
      title: 'Especificaciones tecnicas',
      type: 'text',
      placeholder: 'Especificaciones tecnicas'
    },
    {
      key: 1,
      name: 'productHeight',
      title: 'Altura del producto',
      type: 'number',
      placeholder: 'Altura del producto'
    },
    {
      key: 2,
      name: 'productWidth',
      title: 'Ancho del producto',
      type: 'number',
      placeholder: 'Ancho del producto'
    },
  
    {
      key: 3,
      name: 'numberOfPages',
      title: 'Numero de paginas',
      type: 'number',
      placeholder: 'Numero de paginas'
    },
  
    {
      key: 4,
      name: 'inkQuantity',
      title: 'Cantidad de tinta',
      type: 'number',
      placeholder: 'Cantidad de tinta'
    },
    {
      key: 5,
      name: 'productQuantity',
      title: 'Cantidad de producto',
      type: 'number',
      placeholder: 'Cantidad de producto'
    },
    {
      key: 6,
      name: 'unitValue',
      title: 'Valor unico',
      type: 'number',
      placeholder: 'Valor unico'
    },
    {
      key: 7,
      name: 'fullValue',
      title: 'Valor total',
      type: 'number',
      placeholder: 'Valor total'
    },
    {
      key: 8,
      name: 'quotationClientId',
      title: 'Cotizacion Cliente Id',
      type: 'number',
      placeholder: 'Cotizacion Cliente Id'
    },
    {
      key: 9,
      name: 'productId',
      title: 'Producto Id',
      type: 'number',
      placeholder: 'Producto Id'
    },
  ]

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
        <Form className="space-y-6">
          {inputs.map(input => (
            <div key={input.key}>
              <label htmlFor={input.name}>{input.title}</label>
              <Field
                type={input.type}
                name={input.name}
                id={input.name}
                placeholder={input.placeholder}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              />
              <ErrorMessage
                name={input.name}
                component="div"
                className="text-red-500"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Crear Cotizacion
          </button>
        </Form>
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
