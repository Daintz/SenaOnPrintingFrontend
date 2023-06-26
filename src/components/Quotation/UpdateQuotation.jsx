import { usePutQuotationClientByIdMutation, useGetQuotationClientDetailByIdQuery } from '../../context/Api/Common'
import { changeAction, closeModal, openEditing, openModal, setAction, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import Select from 'react-select'


const quotationStatusOptions = [
    { value: 1, label: 'En proceso'},
    { value: 2, label: 'Aprobado'},
    { value: 3, label: 'No aprobado'},
  ];

const validationSchema = Yup.object().shape({
    orderDate: Yup.string().required('Campo requerido'),
    deliverDate: Yup.string().required('Campo requerido'),
    quotationStatus: Yup.string().required('Campo requerido'),
    userId: Yup.string().required('Campo requerido'),
    clientId: Yup.string().required('Campo requerido'),
    typeServiceId: Yup.string().required('Campo requerido'),
    quotationClientId: Yup.string().required('Campo requerido'),
    productId: Yup.string().required('Campo requerido'),
    technicalSpecifications: Yup.string().required('Campo requerido'),
    productHeight: Yup.string().required('Campo requerido'),
    productWidth: Yup.string().required('Campo requerido'),
    numberOfPages: Yup.string().required('Campo requerido'),
    inkQuantity: Yup.string().required('Campo requerido'),
    productQuantity: Yup.string().required('Campo requerido'),
    unitValue: Yup.string().required('Campo requerido'),
    fullValue: Yup.string().required('Campo requerido'),
}) 

function updateQuotation () {
  const dispatch = useDispatch()
  const { editingData } = useSelector((state) => state.modal)
  const [updateQuotationClient, { error, isLoading }] = usePutQuotationClientByIdMutation()

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />
    await updateQuotationClient(values)

    dispatch(changeAction())
    dispatch(closeModal())
    toast.success('Cotizacion actualizado con exito')
  }

  const inputs = [
    {
        key: 0,
        name: 'orderDate',
        title: 'Fecha de orden',
        type: 'date',
        placeholder: 'Fecha de orden'
      },
      {
        key: 1,
        name: 'deliverDate',
        title: 'Fecha de entrega',
        type: 'date',
        placeholder: 'Fecha de entrega'
      },
      {
        key: 2,
        name: 'userId',
        title: 'Usuario Id',
        type: 'number',
        placeholder: 'Usuario Id'
      },
    
      {
        key: 3,
        name: 'clientId',
        title: 'Cliente Id',
        type: 'number',
        placeholder: 'Cliente Id'
      },
    
      {
        key: 4,
        name: 'typeServiceId',
        title: 'Tipo de servicio Id',
        type: 'number',
        placeholder: 'Tipo de servicio Id'
      },
      {
          key: 5,
          name: 'technicalSpecifications',
          title: 'Especificaciones tecnicas',
          type: 'text',
          placeholder: 'Especificaciones tecnicas'
        },
        {
          key: 6,
          name: 'productHeight',
          title: 'Altura del producto',
          type: 'number',
          placeholder: 'Altura del producto'
        },
        {
          key: 7,
          name: 'productWidth',
          title: 'Ancho del producto',
          type: 'number',
          placeholder: 'Ancho del producto'
        },
      
        {
          key: 8,
          name: 'numberOfPages',
          title: 'Numero de paginas',
          type: 'number',
          placeholder: 'Numero de paginas'
        },
      
        {
          key: 9,
          name: 'inkQuantity',
          title: 'Cantidad de tinta',
          type: 'number',
          placeholder: 'Cantidad de tinta'
        },
        {
          key: 10,
          name: 'productQuantity',
          title: 'Cantidad de producto',
          type: 'number',
          placeholder: 'Cantidad de producto'
        },
        {
          key: 11,
          name: 'unitValue',
          title: 'Valor unico',
          type: 'number',
          placeholder: 'Valor unico'
        },
        {
          key: 12,
          name: 'fullValue',
          title: 'Valor total',
          type: 'number',
          placeholder: 'Valor total'
        },
        {
          key: 13,
          name: 'quotationClientId',
          title: 'Cotizacion Cliente Id',
          type: 'number',
          placeholder: 'Cotizacion Cliente Id'
        },
        {
          key: 14,
          name: 'productId',
          title: 'Producto Id',
          type: 'number',
          placeholder: 'Producto Id'
        },
  ]


  return (
    <Formik
      initialValues={{
        orderDate: editingData.orderDate,
        deliverDate: editingData.deliverDate,
        quotationStatus:editingData.quotationStatus,
        userId:editingData.userId,
        clientId:editingData.clientId,
        typeServiceId:editingData.typeServiceId,
        quotationClientId: editingData.quotationClientId,
        productId: editingData.productId,
        technicalSpecifications: editingData.technicalSpecifications,
        productHeight: editingData.productHeight,
        productWidth: editingData.productWidth,
        numberOfPages: editingData.numberOfPages,
        inkQuantity: editingData.inkQuantity,
        productQuantity: editingData.productQuantity,
        unitValue: editingData.unitValue,
        fullValue: editingData.fullValue,
       
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
           <div>
         <label htmlFor="quotationStatus">Estado de la cotización</label>
         <Field name="quotationStatus">
           {({ field, form }) => (
             <Select
               id="quotationStatus"
               {...form}
               options={quotationStatusOptions}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
             />
           )}
         </Field>
         <ErrorMessage
           name="quotationStatus"
           component="div"
           className="text-red-500"
         />
       </div>
          <button
            type="submit"
            className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Actualizar Cotizacion
          </button>
        </Form>
    </Formik>
  )
}

export function UpdateButtomQuotation ({ quotation }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleEdit = (data) => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Editar Cotizacion' }))
    dispatch(setAction({ action: 'editing' }))
    dispatch(openEditing({ editingData: data }))
  }
  // ?

  return (
    <button type="button" onClick={() => {
      handleEdit(quotation)
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

export default updateQuotation
