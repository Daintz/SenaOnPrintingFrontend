import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostPaperCutsMutation } from '../../context/Api/Common'
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

async function checkNameExistence (name) {
  try {
    const response = await clientAxios.get('/PaperCuts')
    const grammage = response.data
    const nameExists = grammage.some(grammage => grammage.name === name)

    return { exists: nameExists }
  } catch (error) {
    console.error('Error al verificar la existencia del nombre:', error)
    return { exists: false }
  }
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido').min(3, 'El corte de papel debe tener menos de 3 letras/digitos').max(15, 'El corte de papel no puede tener más de 15 letras/digitos').test('unique-name', 'El corte de papel ya está en uso', async function (value) {
    const response = await checkNameExistence(value)
    return !response.exists // Devuelve false si el nombre ya existe
  })
})

function CreatePaperCuts () {
  const dispatch = useDispatch()
  const [createPaperCuts, { error, isLoading }] = usePostPaperCutsMutation()

  const handleSubmit = async (values) => { 
    if (isLoading) return <Spinner />

    await createPaperCuts(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('corte de papel creado con exito')
  }

  const inputs = [
    {
      key: 0,
      name: 'name',
      title: 'Corte papel',
      type: 'text',
      placeholder: 'Nombre'
    }
  ]

  return (
    <Formik
      initialValues={{
        name: ''
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
            Crear corte de papel
          </button>
        </Form>
    </Formik>
  )
}

export function CreateButtonPaperCuts () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Crear corte de papel' }))
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
      Crear corte de papel
    </button>
  )
}

export default CreatePaperCuts
