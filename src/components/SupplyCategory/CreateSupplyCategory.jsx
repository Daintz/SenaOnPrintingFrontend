import { toast } from 'react-toastify'
import {
  changeAction,
  closeModal,
  openModal
} from '../../context/Slices/Modal/ModalSlice'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { usePostSupplyCategoryMutation } from '../../context/Api/Common'
import { ErrorMessage, Field, Form, Formik } from 'formik'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  description: Yup.string().required('Campo requerido')
})

function CreateSupplyCategory () {
  const dispatch = useDispatch()
  const [createSupplyCategory, { error, isLoading }] = usePostSupplyCategoryMutation()

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />

    await createSupplyCategory(values)

    dispatch(changeAction())
    dispatch(closeModal())
    toast.success('Categoria insumo creado con exito')
  }

  const inputs = [
    {
      key: 0,
      name: 'name',
      title: 'Nombre categoria insumo',
      type: 'text',
      placeholder: 'Nombre'
    },
    {
      key: 1,
      name: 'description',
      title: 'Descripción categoria insumo',
      type: 'text',
      placeholder: 'Descripción'
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
          Crear categoria insumo
        </button>
      </Form>
    </Formik>
  )
}

export function CreateButtomSupplyCategory () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(openModal({ title: 'Crear categoria de insumos' }))
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
      Crear categoria insumo
    </button>
  )
}

export default CreateSupplyCategory
