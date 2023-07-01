import { usePutMachineByIdMutation } from '../../context/Api/Common'
import { changeAction, closeModal, openEditing, openModal, setAction, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'

const validationSchema = Yup.object().shape({
  name: Yup.string('Campo no valido').required('Campo requerido'),
  minimumHeight: Yup.number().required('Campo requerido'),
  minimumWidth: Yup.number().required('Campo requerido'),
  maximumHeight: Yup.number().required('Campo requerido'),
  maximumWidth: Yup.number().required('Campo requerido'),
  costByHour: Yup.number().required('Campo requerido'),
  costByUnit: Yup.number().required('Campo requerido'),

})

function UpdateMachine () {
  const dispatch = useDispatch()
  const { editingData } = useSelector((state) => state.modal)
  const [updateMachine, { error, isLoading }] = usePutMachineByIdMutation()

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />
    await updateMachine(values)

    dispatch(changeAction())
    dispatch(closeModal())
    toast.success('Maquina actualizado con exito',{
      autoClose:1000

    })
  }



  return (
    <Formik
      initialValues={{
        id: editingData.id,
        name: editingData.name,
        minimumHeight: editingData.minimumHeight,
        minimumWidth: editingData.minimumWidth,
        maximumHeight: editingData.maximumHeight,
        maximumWidth: editingData.maximumWidth,
        costByUnit: editingData.costByUnit,
        costByHour:editingData.costByHour,
        
    
      }}
      onSubmit={(values) => {
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
  Actualizar Maquina 
</button>
</Form>
          
      
    </Formik>
  )
}

export function UpdateButtomMachine ({ machine }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleEdit = (data) => {
    dispatch(setWidth({ width: '-[1500px]' }))
    dispatch(openModal({ title: 'Editar Maquinas' }))
    dispatch(setAction({ action: 'editing' }))
    dispatch(openEditing({ editingData: data }))
  }
  // ?

  return (
    <button type="button" onClick={() => {
      handleEdit(machine)
    }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    </button>
  )
}

export default UpdateMachine
