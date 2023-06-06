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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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
      className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5"
      type="button"
      onClick={() => handleOpen()}
    >
      Crear categoria insumo
    </button>
  )
}

export function CreateMessageSupplyCategory () {
  const notify = () => toast('Categoria de insumo registrada exitosamente!')
  return (
    <div>
      <button onClick={notify}>
        Categoria de insumo registrada exitosamente!
      </button>
      <ToastContainer />
    </div>
  )
}

export default CreateSupplyCategory
