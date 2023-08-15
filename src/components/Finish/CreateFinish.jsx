import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostFinishMutation } from '../../context/Api/Common'
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
  name: Yup.string().required('Campo requerido'),
  cost: Yup.number('El campo es numerico').required('Campo requerido'),

})

function Createfinish () {
  const dispatch = useDispatch()
  const [createfinish, { error, isLoading }] = usePostFinishMutation()

  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    await createfinish(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Acabado creado con exito',{
      autoClose:1000

    })
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
      name: 'cost',
      title: 'Costo',
      type: 'Number',
      placeholder: 'Costo del producto'
    },
  ]

  return (
    <Formik
      initialValues={{
   
        name: '',
        cost: '',
   
        
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
            className="flex items-center justify-center border border-gray-700 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-700 font-medium rounded-lg text-sm px-10 py-2"
          >
        Crear Acabado
          </button>
        </Form>
    </Formik>
  )
}

export function CreateButtomFinish () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '-[1500px]' }))
    dispatch(openModal({ title: 'Crear Acabado' }))
    dispatch(setAction({ action: 'creating' }))
  }
  // ?

  return (
    <button
       className="flex items-center justify-center border border-gray-400 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
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
      Crear acabado
    </button>
  )
}

export default Createfinish
