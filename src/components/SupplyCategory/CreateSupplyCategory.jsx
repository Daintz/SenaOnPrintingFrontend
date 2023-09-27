import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostSupplyCategoryMutation } from '../../context/Api/Common'
import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'
import Spinner from '../Spinner/Spinner'
import { toast } from 'react-toastify'
import { FaAsterisk } from 'react-icons/fa'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido').min(3, 'Minimo 3 caracteres').max(30, 'Maximo 30 caracteres'),
  description: Yup.string().required('Campo requerido').min(20, 'Minimo 20 caracteres').max(255, 'Maximo 255 caracteres')
})

function CreateSupplyCategory () {
  const dispatch = useDispatch()
  const [createSupplyCategory, { error, isLoading }] =
    usePostSupplyCategoryMutation()

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />

    await createSupplyCategory(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Producto creado con exito', {
      autoClose: 1000 // Duración de 1 segundos
    })
  }

  const inputs = [
    {
      key: 0,
      name: 'name',
      title: 'Nombre categoría insumo',
      type: 'text',
      placeholder: 'Nombre'
    },
    {
      key: 1,
      name: 'description',
      title: 'Descripción categoría insumo',
      type: 'textarea',
      placeholder: 'Descripción'
    }
  ]

  return (
    <Formik
      initialValues={{
        name: '',
        description: ''
      }}
      onSubmit={values => {
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
      <Form className="space-y-6">
        {inputs.map(input => (
          <div key={input.key}>
          <div className='flex flex-row'>
            <label htmlFor={input.name}>
              {input.title}
            </label>
            <FaAsterisk className='w-2 h-2 ml-1 text-red-900' />
          </div>
            {input.type === 'textarea'
              ? (
              <Field
                as="textarea"
                name={input.name}
                id={input.name}
                placeholder={input.placeholder}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
              />
                )
              : (
              <Field
                type={input.type}
                name={input.name}
                id={input.name}
                placeholder={input.placeholder}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-ring-custom-blue-light focus:border-ring-custom-blue-light block w-full p-2.5"
              />
                )}
            <ErrorMessage
              name={input.name}
              component="div"
              className="text-red-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-ring-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Crear categoría insumo
        </button>
      </Form>
    </Formik>
  )
}

export function CreateButtonSupplyCategory () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: 'w-[400px]' }))
    dispatch(openModal({ title: 'Crear categoría de insumos' }))
    dispatch(setAction({ action: 'creating' }))
  }
  // ?

  return (
    <button
      className="flex items-center justify-center border border-gray-400 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
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
      Crear categoría insumo
    </button>
  )
}

export default CreateSupplyCategory
