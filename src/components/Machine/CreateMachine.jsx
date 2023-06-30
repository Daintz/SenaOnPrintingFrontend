import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostMachineMutation } from '../../context/Api/Common'
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
  minimumHeight: Yup.number().required('Campo requerido'),
  minimumWidth: Yup.number().required('Campo requerido'),
  maximumHeight: Yup.number().required('Campo requerido'),
  maximumWidth: Yup.number().required('Campo requerido'),
  costByUnit: Yup.number().required('Campo requerido'),
  costByHour: Yup.number().required('Campo requerido'),
})

function CreateMachine () {
  const dispatch = useDispatch()
  const [createmachine, { error, isLoading }] = usePostMachineMutation()

  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    await createmachine(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Maquina creado con exito',{
      autoClose:1000

    })
    }

  


  return (
    <Formik
      initialValues={{
        name: '',
        minimumHeight:'',
        minimumWidth:'',
        maximumHeight: '',
        maximumWidth: '',
        costByUnit: '',
        costByHour:''
     
   
      }}
      onSubmit={(values) => {
        console.log(values)
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
        <Form>

          <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-1/4">
              <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
               Nombre
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Name"
              />
                 <ErrorMessage
                name="name"
       
                component="div"
                className="text-red-500"
              />
         
            </div>
            <div className="w-2/4">
              <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Ancho minimo
              </label>
              <Field
                type="Number"
                name="minimumHeight"
                id="minimumHeight"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Ancho Minimo"
              />
                  <ErrorMessage
                name="minimumHeight"
       
                component="div"
                className="text-red-500"
              />
               

            </div>
            <div className="w-1/4">
              <label htmlFor="campo2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
               Alto minimo
              </label>
              <Field
                type="Number"
                name="minimumWidth"
                id="minimumWidth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Alto Minimo"
              />
                    <ErrorMessage
                name="minimumWidth"
       
                component="div"
                className="text-red-500"
              />
               
            </div>
          </div>

          <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-1/4">
              <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
           Ancho maximo
              </label>
              <Field
                type="Number"
                name="maximumHeight"
                 id="maximumHeight"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Ancho Maximo"
              />
                  <ErrorMessage
                name="maximumHeight"
       
                component="div"
                className="text-red-500"
              />
               
            </div>
            <div className="w-1/4">
              <label htmlFor="campo2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Alto maximo
              </label>
              <Field
                type="Number"
                name="maximumWidth"
                id="maximumWidth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Alto Maximo"
              />
                    <ErrorMessage
                name="maximumWidth"
       
                component="div"
                className="text-red-500"
              />
               
            </div>
            <div className="w-1/4">
              <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Costo por hora
              </label>
              <Field
                type="Number"
                name="costByHour"
                id="costByHour"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Costo por hora"
              />
                    <ErrorMessage
                name="costByHour"
       
                component="div"
                className="text-red-500"
              />
               
            </div>
            <div className="w-1/4">
              <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Costo por unidad
              </label>
              <Field
                type="Number"
                name="costByUnit"
                id="costByUnit"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Costo por unidad"
              />
                    <ErrorMessage
                name="costByUnit"
       
                component="div"
                className="text-red-500"
              />
               
            </div>
           </div>
        
          <button
            type="submit"
            className="col-span-3 w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Crear Maquina
          </button>
        </Form>
      
    </Formik>
  )
}

export function CreateButtomMaquina () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '-[1500px]' }))
    dispatch(openModal({ title: 'Crear Maquina' }))
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
      Crear Maquina
    </button>
  )
}

export default CreateMachine
