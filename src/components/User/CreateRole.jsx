import { ToastContainer, toast } from 'react-toastify'
import {
  changeAction,
  closeModal,
  openModal
} from '../../context/Slices/Modal/ModalSlice'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { usePostUserMutation } from '../../context/Api/Common'
import { ErrorMessage, Field, Form, Formik } from 'formik'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  description: Yup.string().required('Campo requerido')
})

function CreateUser () {
  const dispatch = useDispatch()
  const [createUser, { error, isLoading }] = usePostUserMutation()

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />

    await createUser(values)

    dispatch(changeAction())
    dispatch(closeModal())
  }

  const inputs = [
    {
      key: 0,
      name: 'name',
      title: 'Nombre',
      type: 'text',
      placeholder: 'Nombre del Rol'
    },
    {
      key: 1,
      name: 'description',
      title: 'Descripción',
      type: 'text',
      placeholder: 'Descripción del Rol'
    }
  ]

  return (
    <Formik
      initialValues={{
        name: '',
        description: ''
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Crear Rol
          </button>
        </Form>
    </Formik>
  )
}

export function CreateButtomUser () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(openModal({ title: 'Crear Rol' }))
  }
  // ?

  return (
    <button
      className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5"
      type="button"
      onClick={() => handleOpen()}
    >
      Crear Rol
    </button>
  )
}

export function CreateMessageUser () {
  const notify = () => toast('Rol registrado exitosamente!')
  return (
    <div>
      <button onClick={notify}>
        Rol registrado exitosamente!
      </button>
      <ToastContainer />
    </div>
  )
}

export default CreateUser
