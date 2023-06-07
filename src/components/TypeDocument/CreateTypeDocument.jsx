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
import { usePostTypeDocumentMutation } from '../../context/Api/Common'
import { ErrorMessage, Field, Form, Formik } from 'formik'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  abbreviation: Yup.string().required('Campo requerido')
})

function CreateTypeDocument () {
  const dispatch = useDispatch()
  const [createTypeDocument, { error, isLoading }] = usePostTypeDocumentMutation()

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />

    await createTypeDocument(values)

    dispatch(changeAction())
    dispatch(closeModal())
  }

  const inputs = [
    {
      key: 0,
      name: 'name',
      title: 'Nombre',
      type: 'text',
      placeholder: 'Nombre del Tipo de Documento'
    },
    {
      key: 1,
      name: 'abbreviation',
      title: 'Abreviación',
      type: 'text',
      placeholder: 'Abreviación del Tipo de Documento'
    }
  ]

  return (
    <Formik
      initialValues={{
        name: '',
        abbreviation: ''
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
            Crear Tipo de Documento
          </button>
        </Form>
    </Formik>
  )
}

export function CreateButtomTypeDocument () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(openModal({ title: 'Crear Tipo de Documento' }))
  }
  // ?

  return (
    <button
      className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5"
      type="button"
      onClick={() => handleOpen()}
    >
      Crear Tipo de Documento
    </button>
  )
}

export function CreateMessageTypeDocument () {
  const notify = () => toast('Tipo de documento registrado exitosamente!')
  return (
    <div>
      <button onClick={notify}>
        Tipo de documento registrado exitosamente!
      </button>
      <ToastContainer />
    </div>
  )
}

export default CreateTypeDocument
