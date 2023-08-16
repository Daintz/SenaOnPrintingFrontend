import { usePutSupplyByIdMutation } from '../../context/Api/Common'
import { changeAction, closeModal, openEditing, openModal, setAction, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  dangerIndicators: Yup.string().required('Campo requerido'),
  useInstructions: Yup.string().required('Campo requerido'),
  advices: Yup.string().required('Campo requerido'),
  supplyType: Yup.number().required('Campo requerido'),
  sortingWord: Yup.number().required('Campo requerido'),
  quantity: Yup.number().required('Campo requerido'),
  averageCost: Yup.number().required('Campo requerido'),

})

function UpdateSupply () {
  const dispatch = useDispatch()
  const { editingData } = useSelector((state) => state.modal)
  const [updateSupply, { error, isLoading }] = usePutSupplyByIdMutation()

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />

    if (values.sortingWord === 1) {
      values.name = values.name + ' Peligro'
    } else if (values.sortingWord === 2) {
      values.name = values.name + ' Atención'
    }
    if (values.supplyType === 1) {
      values.name = values.name + ' Devolutivo'
    } else if (values.supplyType === 2) {
      values.name = values.name + ' Consumible'
    }
    
    await updateSupply(values)

    dispatch(changeAction())
    dispatch(closeModal())
    toast.success('Insumo actualizado con exito',{
      autoClose:1000

    })
  }



  return (
    <Formik
      initialValues={{
        id: editingData.id,
        name: editingData.name,
        dangerIndicators: editingData.dangerIndicators,
        useInstructions: editingData.useInstructions,
        advices: editingData.advices,
        supplyType: editingData.supplyType,
        sortingWord: editingData.sortingWord,
        quantity: editingData.quantity,
        averageCost: editingData.averageCost,
        
    
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
     Nombre insumo
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
  <div className="w-1/4">
    <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
    Indicadores de peligro
    </label>
    <Field
      type="text"
      name="dangerIndicators"
      id="dangerIndicators"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      placeholder="Indicadores de peligro"
    />
        <ErrorMessage
      name="dangerIndicators"

      component="div"
      className="text-red-500"
    />
     

  </div>
  <div className="w-1/4">
    <label htmlFor="campo2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
     Instrucciones
    </label>
    <Field
      type="text"
      name="useInstructions"
      id="useInstructions"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      placeholder="Instrucciones"
    />
          <ErrorMessage
      name="useInstructions"

      component="div"
      className="text-red-500"
    />
     
  </div>
</div>

<div className="flex gap-5 grid-cols-5 mb-3">
  <div className="w-1/4">
    <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
  Consejos
    </label>
    <Field
      type="text"
      name="advices"
       id="advices"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      placeholder="Consejos"
    />
        <ErrorMessage
      name="advices"

      component="div"
      className="text-red-500"
    />
     
  </div>
  <div className="w-1/4">
          <label htmlFor="supplyType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
          Tipo insumo
          </label>
          <Field
            as="select"
            name="supplyType"
            id="supplyType"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          >
            <option value={1}>Devolutivo</option>
            <option value={2}>Consumible</option>
          </Field>
          <ErrorMessage
            name="supplyType"
            component="div"
            className="text-red-500"
          />
        </div>
  <div className="w-1/4">
          <label htmlFor="sortingWord" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Tipo de peligrosidad
          </label>
          <Field
            as="select"
            name="sortingWord"
            id="sortingWord"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          >
            <option value={1}>Peligro</option>
            <option value={2}>Atención</option>
          </Field>
          <ErrorMessage
            name="sortingWord"
            component="div"
            className="text-red-500"
          />
        </div>
  <div className="w-1/4">
    <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
      Cantidad
    </label>
    <Field
      type="number"
      name="quantity"
      id="quantity"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      placeholder="Cantidad"
    />
          <ErrorMessage
      name="quantity"

      component="div"
      className="text-red-500"
    />
     
  </div>
  <div className="w-1/4">
    <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
      Costo promedio
    </label>
    <Field
      type="number"
      name="averageCost"
      id="averageCost"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      placeholder="Costo promedio"
    />
          <ErrorMessage
      name="averageCost"

      component="div"
      className="text-red-500"
    />
     
  </div>
 </div>

<button
  type="submit"
  className="col-span-3 w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
>
  Actualizar insumo 
</button>
</Form>
          
      
    </Formik>
  )
}

export function UpdateButtomSupply ({ supply }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleEdit = (data) => {
    dispatch(setWidth({ width: '-[1500px]' }))
    dispatch(openModal({ title: 'Editar insumos' }))
    dispatch(setAction({ action: 'editing' }))
    dispatch(openEditing({ editingData: data }))
  }
  // ?

  return (
    <button type="button" onClick={() => {
      handleEdit(supply)
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

export default UpdateSupply
