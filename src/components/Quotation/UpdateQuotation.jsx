import { usePutQuotationClientByIdMutation, useGetQuotationClientDetailByIdQuery } from '../../context/Api/Common'
import { changeAction, closeModal, openEditing, openModal, setAction, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import clientAxios from '../../config/clientAxios'

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

const getClient = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/Client').then(
      (result) => {
        const clients = result.data.map((client) => ({
          'label': client.name,
          'value': client.id
        }))
        resolve(clients)
      },
      (error) => {
        reject(error)
      }
    );
  });
};
const getUser = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/user').then(
      (result) => {
        const User = result.data.map((user) => ({
          'label': user.names,
          'value': user.id
        }))
        resolve(User)
      },
      (error) => {
        reject(error)
      }
    );
  });
};
const getTypeService = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/TypeServices').then(
      (result) => {
        const TypeService = result.data.map((typeServices) => ({
          'label': typeServices.name,
          'value': typeServices.id
        }))
        resolve(TypeService)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

const getQuotationClient = () => {
  return new Promise((resolve, reject)=> {
    clientAxios.get('/QuotationClient').then(
      (result)=> {
        const QuotationClient = result.data.map((quotationClient) => ({
          'label':quotationClient.id,
          'value': quotationClient.id 
        }))
        resolve(QuotationClient)
      },
      (error)=> {
        reject(error)
      }
    )
  })
}

const getProduct = () => {
  return new Promise((resolve, reject)=> {
    clientAxios.get('/Product').then(
      (result)=> {
        const Product = result.data.map((product)=> ({
          'label': product.name,
          'value': product.id
        }))
        resolve(Product)
      },
      (error)=> {
        reject(error)
      }
    )
  })
}
function updateQuotation () {
  const [clientsOptions, setClientsOptions] = useState([])
  const [userOptions, setUserOptions] = useState([])
  const [typeServiceOptions, setTypeServiceOptions] = useState([])
  const [quotationclientOptions, setQuotationclientOptions] = useState([])
  const [productOptions, setProductOptions] = useState([])

  const fetchOptions = () => {
    getClient().then((options) => {
      setClientsOptions(options)
    })
    getUser().then((options) => {
      setUserOptions(options)
    })
    getTypeService().then((options) => {
      setTypeServiceOptions(options)
    })
    getQuotationClient().then((options) => {
      setQuotationclientOptions(options)
    })
    getProduct().then((options) => {
      setProductOptions(options)
    })
  }
 

  useEffect(() => {
    fetchOptions()
  }, [])
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




  return (
    <Formik
    initialValues={{
      orderDate: '',
      deliverDate: '',
      quotationStatus: '',
      userId: '',
      clientId: '',
      typeServiceId: '',
      quotationClientId: '',
      productId: '',
      technicalSpecifications: 0,
      productHeight: '',
      productWidth: '',
      numberOfPages: '',
      inkQuantity: '',
      productQuantity: '',
      unitValue: '',
      fullValue: ''
    }}
    onSubmit={(values) => {
      handleSubmit(values)
     // const result = values.unitValue * values.productQuantity;
    }}
    validationSchema={validationSchema}
  >
    {({ setFieldValue }) => (
      <Form>
        <div className="flex linea-horizontal mb-2
        ">
          <div className="w-1/2">
          <b>Codigo: </b>
          </div>
        </div>
        <hr className="mb-4" />
        <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-2/4">
            <label htmlFor="orderDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Fecha de Incio <b className="text-red-700">*</b>
            </label>
            <Field
              type="date"
              name="orderDate"
              id="orderDate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="Drive"
            />
             <ErrorMessage
              name="orderDate"
     
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="w-2/4">
            <label htmlFor="deliverDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Fecha de Entrega <b className="text-red-700">*</b>
            </label>
            <Field
              type="date"
              name="deliverDate"
              id="deliverDate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="Libreta"
            />
             <ErrorMessage
              name="deliverDate"
     
              component="div"
              className="text-red-500"
            />
          </div>
        </div>
        <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-1/4">
            <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Usuario <b className="text-red-700">*</b>
            </label>
            <Field
              type="number"
              as="select"
              name="userId"
              id="userId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="100"
            >
              {userOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
            </Field>
            <ErrorMessage
              name="userId"

              component="div"
              className="text-red-500"
            />
          </div>
          <div className="w-1/4">
            <label htmlFor="clientId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Cliente <b className="text-red-700">*</b>
            </label>
            <Field
              type="number"
              as="select"
              name="clientId"
              id="clientId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="100"
            >
                {clientsOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
            </Field>
            <ErrorMessage
              name="clientId"
     
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="w-1/4">
            <label htmlFor="typeServiceId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Tipo de Servicio <b className="text-red-700">*</b>
            </label>
            <Field
              as="select"
              name="typeServiceId"
              id="typeServiceId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="100"
            >
                 {typeServiceOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
        ))}
            </Field>
            <ErrorMessage
              name="typeServiceId"
     
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="w-1/4">
            <label htmlFor="campo2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Maquina <b className="text-red-700">*</b>
            </label>
            <Field
              as="select"
              name="campo2"
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="100"
            >
              // ? aqui van los campos del select
            </Field>
          </div>
        </div>
        <div>
        <br></br>
        <p><b className='text-black-700 text-justify'>COTIZACION DETALLES</b></p>
        <br></br>
        </div>
        <div className="flex gap-5 grid-cols-5 mb-3">
        <div className="w-2/4">
            <label htmlFor="productId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Producto <b className="text-red-700">*</b>
            </label>
            <Field
            type="text"
              as="select"
              name="productId"
              id="productId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="100"
            >
              {productOptions.map((option) => (
          <option key={option.value} value={option.value}>
          {option.label}
          </option>
           ))}
            </Field>
            <ErrorMessage
              name="productId"
              component="div"
              className="text-red-500"
            />
            </div>
        <div className="w-2/4">
            <label htmlFor="technicalSpecifications" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Especificaciones tecnicas  <b className="text-red-700">*</b>
            </label>
            <textarea
              type="text"
              name="technicalSpecifications"
              id="technicalSpecifications"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              rows="6" cols="40"
              placeholder="El producto contara..."
            />
             <ErrorMessage
              name="technicalSpecifications"
     
              component="div"
              className="text-red-500"
            />
          </div>
          

        </div>
        <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-1/4">
            <label htmlFor="productHeight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Altura del producto <b className="text-red-700">*</b>
            </label>
            <Field
              type="number"
              name="productHeight"
              id="productHeight"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="1.0.5"
            />
             <ErrorMessage
              name="productHeight"
     
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="w-1/4">
            <label htmlFor="productWidth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Ancho del producto <b className="text-red-700">*</b>
            </label>
            <Field
              type="number"
              name="productWidth"
              id="productWidth"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="1.0.5"
            />
     <ErrorMessage
              name="productWidth"
     
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="w-1/4">
            <label htmlFor="numberOfPages" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Numero de paginas <b className="text-red-700">*</b>
            </label>
            <Field
              type="number"
              name="numberOfPages"
              id="numberOfPages"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="1.0.5"
            />
             <ErrorMessage
              name="numberOfPages"
     
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="w-1/4">
            <label htmlFor="inkQuantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Cantidad de tinta <b className="text-red-700">*</b>
            </label>
            <Field
              type="number"
              name="inkQuantity"
              id="inkQuantity"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="1.0.5"
            />
             <ErrorMessage
              name="inkQuantity"
     
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="w-1/4">
            <label htmlFor="productQuantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Cantidad de producto <b className="text-red-700">*</b>
            </label>
            <Field
              type="number"
              name="productQuantity"
              id="productQuantity"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="1.0.5"
            />
            <ErrorMessage
            name="productQuantity"
            component="div"
            className="text-red-500"
            />
          </div>
        </div>
        <div className="flex gap-5 grid-cols-5 mb-3">
        <div className="w-2/4">
            <label htmlFor="unitValue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Valor unico <b className="text-red-700">*</b>
            </label>
            <Field
              type="number"
              name="unitValue"
              id="unitValue"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="1.0.5"
            />
             <ErrorMessage
              name="unitValue"
     
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="w-2/4">
            <label htmlFor="fullValue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Valor total <b className="text-red-700">*</b>
            </label>
            <Field
             type="number"
             name="fullValue"
             id="fullValue"
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
             placeholder="1.0.5"
            />
            <ErrorMessage
            name="fullValue"
            component="div"
            className="text-red-500"
            />
          </div>
        </div>


        <div className="flex gap-5 grid-cols-5 mb-3">
        <div className="w-2/4">
            <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Cotizacion CLiente <b className="text-red-700">*</b>
            </label>
            <Field
            type="number"
              as="select"
              name="quotationClientId"
              id="quotationClientId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="100"
            >
               {quotationclientOptions.map((option) => (
          <option key={option.value} value={option.value}>
          {option.label}
          </option>
          ))}
            </Field>
            <ErrorMessage
              name="quotationClientId"
     
              component="div"
              className="text-red-500"
            />
            </div>
        <div className="w-2/4">
            <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Acabados <b className="text-red-700">*</b>
            </label>
            <Field
              as="select"
              name="userId"
              data= {userOptions}
              id="userId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="100"
            >
              // ? aqui van los campos del select
            </Field>
            </div>
        <div className="w-2/4">
            <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Sustratos <b className="text-red-700">*</b>
            </label>
            <Field
              as="select"
              name="userId"
              data= {userOptions}
              id="userId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="100"
            >
              // ? aqui van los campos del select
            </Field>
            </div>
        <div className="w-2/4">
            <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Gramaje <b className="text-red-700">*</b>
            </label>
            <Field
              as="select"
              name="userId"
              data= {userOptions}
              id="userId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="100"
            >
              // ? aqui van los campos del select
            </Field>
            </div>
        </div>
        <div className="flex gap-5 grid-cols-5 mb-3">
        <div className="w-1/4">
            <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Estado de la Cotizacion <b className="text-red-700">*</b>
            </label>
            <Field
              as="select"
              name="quotationStatus"
              id="quotationStatus"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              placeholder="100"
            >
              <option value={0}>Seleccione</option>
              <option value={1}>En proceso</option>
              <option value={2}>Aprobado</option>
              <option value={3}>No Aprobado</option>
            </Field>
            <ErrorMessage
              name="quotationStatus"
     
              component="div"
              className="text-red-500"
            />
            </div>
        </div>
          <center>
        <button
          type="submit"
          className="col-span-3 w-50% text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Crear orden de producción
        </button>
        </center>
      </Form>
    )}
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
