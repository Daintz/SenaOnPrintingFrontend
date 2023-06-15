import { toast } from 'react-toastify'
import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { usePostTypeDocumentMutation } from '../../context/Api/Common'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  abbreviation: Yup.string().required('Campo requerido')
})

function CreateTypeDocument () {
  const dispatch = useDispatch()
  const [createTypeDocument, { error, isLoading }] = usePostTypeDocumentMutation()

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />
    //if (error) return <Error type={error.status} message={error.error} />

    await createTypeDocument(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Tipo de documento creado con exito')
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
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Crear Tipo de Documento' }))
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
      Crear Tipo de Documento
    </button>
  )
}

export default CreateTypeDocument
