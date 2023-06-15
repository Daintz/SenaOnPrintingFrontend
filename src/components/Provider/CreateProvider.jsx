import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostProviderMutation } from '../../context/Api/Common'
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
  nitCompany: Yup.string().required('Campo requerido'),
  nameCompany: Yup.string().required('Campo requerido'),
  email: Yup.string().required('Campo requerido'),
  phone: Yup.string().required('Campo requerido'),
  companyAddress: Yup.string().required('Campo requerido')
})

function CreateProvider () {
  const dispatch = useDispatch()
  const [createProvider, { error, isLoading }] = usePostProviderMutation()

  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    await createProvider(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Proveedor Registrado con exito')
  }

  const inputs = [
    {
      key: 0,
      name: 'nitCompany',
      title: 'NIT',
      type: 'text',
      placeholder: 'NIT de la empresa'
    },
    {
      key: 1,
      name: 'nameCompany',
      title: 'Empresa',
      type: 'text',
      placeholder: 'Nombre de la empresa'
    },
    {
      key: 2,
      name: 'email',
      title: 'Correo',
      type: 'text',
      placeholder: 'Correo de la empresa'
    },
    {
      key: 3,
      name: 'phone',
      title: 'Telefono',
      type: 'text',
      placeholder: 'Telefono de la empresa'
    },
    {
      key: 4,
      name: 'companyAddress',
      title: 'Direccion de la empresa',
      type: 'text',
      placeholder: 'Direccion de la empresa'
    }
  ]

  return (
    <Formik
      initialValues={{
        nitCompany: '',
        characteristics: '',
        email:'',
        phone:'',
        companyAddress:''
        
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
            Registrar Proveedor
          </button>
        </Form>
    </Formik>
  )
}

export function CreateButtomProvider () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Registrar Proveedor' }))
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
      Registrar Proveedor
    </button>
  )
}

export default CreateProvider
