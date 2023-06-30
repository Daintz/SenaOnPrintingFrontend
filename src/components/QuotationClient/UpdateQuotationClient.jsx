import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { usePutQuotationClientByIdMutation } from '../../context/Api/Common'
import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'
import Spinner from '../Spinner/Spinner'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import clientAxios from '../../config/clientAxios'

const validationSchema = Yup.object().shape({
  orderDate: Yup.date().required('Campo requerido').test('valid-deliver-date', 'La fecha de entrega debe ser igual a la fecha actual', function (value) {
    const currentDate = new Date()
    const selectedDate = new Date(value)
    // Compara si la fecha de entrega es igual a la fecha actual
    return selectedDate.toDateString() === currentDate.toDateString()
  }),
  deliverDate: Yup.date().default(() => new Date()).required('Campo requerido').test('valid-date', 'La fecha debe ser posterior o igual a la fecha actual', function (value) {
    const currentDate = new Date()
    const selectedDate = new Date(value)
    // Compara si la fecha seleccionada es mayor o igual a la fecha actual y si es del mismo día
    return selectedDate >= currentDate || selectedDate.toDateString() === currentDate.toDateString()
  }),
  quotationStatus: Yup.string().required('Campo requerido'),
  userId: Yup.string().required('Campo requerido'),
  clientId: Yup.string().required('Campo requerido'),
  typeServiceId: Yup.string().required('Campo requerido'),
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

function updateQuotationClient () {
  const [clientsOptions, setClientsOptions] = useState([])
  const [userOptions, setUserOptions] = useState([])
  const [typeServiceOptions, setTypeServiceOptions] = useState([])

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
  }

  useEffect(() => {
    fetchOptions()
  }, [])
  const dispatch = useDispatch()
  const { editingData } = useSelector((state) => state.modal)
  const [UpdateQuotationClient, { error, isLoading }] = usePutQuotationClientByIdMutation()

  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    await UpdateQuotationClient(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Cotizacion creada con exito')
  }

  return (
   <Formik
   initialValues={{
    id: editingData.id,
    orderDate: editingData.orderDate,
    deliverDate: editingData.deliverDate,
    clientId: editingData.clientId,
    typeServiceId: editingData.typeServiceId,
    quotationStatus: editingData.quotationStatus,
  }}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
        {({ setFieldValue }) => (
        <Form>
          <div className="flex linea-horizontal mb-2">
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
            <div className="w-2/4">
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
            <div className="w-2/4">
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
            <div className="w-2/4">
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
          </div>
          <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-2/4">
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
        <button
          type="submit"
          className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Crear Cotizacion
        </button>
      </Form>
      )}
    </Formik>
  )
}

export function UpdateButtomQuotationClient ({ quotationclient }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleEdit = (data) => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Editar Cotizacion Cliente' }))
    dispatch(setAction({ action: 'editing' }))
    dispatch(openEditing({ editingData: data }))
  }
  // ?

  return (
    <button type="button" onClick={() => {
      handleEdit(quotationclient)
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

export default updateQuotationClient
