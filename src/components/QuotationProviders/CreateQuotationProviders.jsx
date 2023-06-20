import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
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


const validationSchema = Yup.object().shape({
  quotationDate: Yup.date().required('Campo requerido'),
  quotationFile: Yup.string().required('Campo requerido'),
  fullValue: Yup.number().required('Campo requerido'),
  providerId:Yup.number().required('Campo requerido')
})

function CreateQuotationProviders () {
  const dispatch = useDispatch()
  const [createQuotationProviders, { error, isLoading }] = usePostQuotationProvidersMutation()

  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    if (error) return <Error type={error.status} message={error.error} />

    await createQuotationProviders(values)

    dispatch(changeAction())
    if(!error){
      dispatch(closeModal())
    }

    toast.success('Cotización a clientes creada con exito')
  }

  const inputs = [
    {
      key: 0,
      name: 'quotationDate',
      title:'fecha',
      type:'date',
      placeholder:'fecha de la cotización'

    },
    {
      key: 1,
      name: 'quotationFile',
      title:'Documento',
      type:'text',
      placeholder:'Documento de la cotización'

    },
    {
      key: 2,
      name: 'fullValue',
      title:'Valor',
      type:'number',
      placeholder:'Valor total'

    },
    {
      key: 3,
      name: 'ProviderId',
      title:'Proveedor',
      type:'number',
      placeholder:'id Proveedor'

    }
  ]

  return (
    <Formik
      initialValues={{
      quotationDate: '',
      quotationFile:'',
      fullValue:'',
      providerId:0

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
          Crear Cotización a proveedores
        </button>
      </Form>
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
      Crear Cotización a proveedores
    </button>
  )
}

export default CreateQuotationProviders
