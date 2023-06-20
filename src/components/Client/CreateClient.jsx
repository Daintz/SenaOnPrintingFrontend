import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostClientMutation } from '../../context/Api/Common'
import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'
import Spinner from '../Spinner/Spinner'
import { toast } from 'react-toastify'
import clientAxios from '../../config/clientAxios'

async function checkEmailExistence(email) {
  try {
    const response = await clientAxios.get('/Client')
    const clients = response.data

    // Verificar si el correo electrónico ya existe en los clientes
    const emailExists = clients.some(client => client.email === email)

    return { exists: emailExists }
  } catch (error) {
    console.error('Error al verificar la existencia del correo electrónico:', error)
    // Manejar el error adecuadamente en tu aplicación
    return { exists: false }
  }
}

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3, 'El nombre debe tener como minimo 3 letras').required('Campo requerido'),
  phone: Yup.string().max(10, 'Telefono no puede tener mas de 10 digitos').required('Campo requerido').matches(/^[0-9]+$/, 'El teléfono solo puede contener números'),
  email: Yup.string().required('Campo requerido').email('El email debe ser valido example@email.com').test('unique-email', 'El correo ya está en uso', async function (value) {
    const response = await checkEmailExistence(value)
    return !response.exists // Devuelve false si el correo ya existe
  }),
  center: Yup.string().min(3, 'el centro debe tener como minimo 3 letras').max(70, 'el centro debe tener como maximo 70 letras').required('Campo requerido'),
  area: Yup.string().min(3, 'el area debe tener como minimo 3 letras').max(70, 'El area debe tener como maximo 70 letras').required('Campo requerido'),
  regional: Yup.string().min(3, 'La regional debe tener como minimo 3 letras').max(70, 'La regional debe tener como maximo 70 letras').required('Campo requerido')
})

function CreateClient () {
  const dispatch = useDispatch()
  const [createClient, { error, isLoading }] = usePostClientMutation()

  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    await createClient(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Cliente creado con exito')
  }

  const inputs = [
    {
      key: 0,
      name: 'name',
      title: 'Nombre cliente',
      type: 'text',
      placeholder: 'Nombre'
    },
    {
      key: 1,
      name: 'phone',
      title: 'Telefono cliente',
      type: 'text',
      placeholder: 'Telefono'
    },
    {
      key: 2,
      name: 'email',
      title: 'Correo cliente',
      type: 'text',
      placeholder: 'Correo'
    },
    {
      key: 3,
      name: 'center',
      title: 'Centro cliente',
      type: 'text',
      placeholder: 'Centro'
    },
    {
      key: 4,
      name: 'area',
      title: 'Area cliente',
      type: 'text',
      placeholder: 'Area'
    },
    {
      key: 5,
      name: 'regional',
      title: 'Regional cliente',
      type: 'text',
      placeholder: 'Regional'
    }
  ]

  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
        email: '',
        center: '',
        area: '',
        regional: ''
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
            Crear cliente
          </button>
        </Form>
    </Formik>
  )
}

export function CreateButtonClient () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Crear cliente' }))
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
      Crear cliente
    </button>
  )
}

export default CreateClient
