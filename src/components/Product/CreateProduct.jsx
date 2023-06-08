import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostProductMutation } from '../../context/Api/Common'
import {
  changeAction,
  closeModal,
  openModal
} from '../../context/Slices/Modal/ModalSlice'
import Spinner from '../Spinner/Spinner'
import { toast } from 'react-toastify'

const validationSchema = Yup.object().shape({
  typeProduct: Yup.string().required('Campo requerido'),
  name: Yup.string().required('Campo requerido'),
  characteristics: Yup.string().required('Campo requerido')
})

function CreateProduct () {
  const dispatch = useDispatch()
  const [createProduct, { error, isLoading }] = usePostProductMutation()

  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    await createProduct(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Producto creado con exito')
  }

  const inputs = [
    {
      key: 0,
      name: 'name',
      title: 'Nombre',
      type: 'text',
      placeholder: 'Nombre del producto'
    },
    {
      key: 1,
      name: 'typeProduct',
      title: 'Tipo',
      type: 'text',
      placeholder: 'Tipo de producto'
    },
    {
      key: 2,
      name: 'characteristics',
      title: 'Caracteristicas',
      type: 'text',
      placeholder: 'Caracteristicas del producto'
    }
  ]

  return (
    <Formik
      initialValues={{
        typeProduct: '',
        name: '',
        characteristics: ''
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
            Crear producto
          </button>
        </Form>
    </Formik>
  )
}

export function CreateButtomProduct () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(openModal({ title: 'Crear producto' }))
  }
  // ?

  return (
    <button
      className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5"
      type="button"
      onClick={() => handleOpen()}
    >
      Crear producto
    </button>
  )
}

export default CreateProduct
