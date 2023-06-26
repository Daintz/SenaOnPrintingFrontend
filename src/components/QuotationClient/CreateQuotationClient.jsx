import { toast } from 'react-toastify'
import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import { usePostQuotationClientMutation } from '../../context/Api/Common'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import clientAxios from '../../config/clientAxios'

const quotationStatusOptions = [
  { value: 1, label: 'En proceso' },
  { value: 2, label: 'Aprobado' },
  { value: 3, label: 'No aprobado' }
]

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
  userId: Yup.number().required('Campo requerido'),
  clientId: Yup.number().required('Campo requerido'),
  typeServiceId: Yup.number().required('Campo requerido'),
  quotationStatus: Yup.string().required('Campo requerido'),
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

function CreateQuotationClient () {
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
     const [createQuotationClient, { error, isLoading }] = usePostQuotationClientMutation()

  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    await createQuotationClient(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Cotizacion creada con exito')
  }

 fetchOptions()
  }, [])
  const dispatch = useDispatch()
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
      type: 'select',
      data: userOptions,
      placeholder: 'Usuario Id'
    },
    {
      key: 3,
      name: 'clientId',
      title: 'Cliente Id',
      type: 'select',
      data: clientsOptions,
      placeholder: 'Cliente Id'
    },
    {
      key: 4,
      name: 'typeServiceId',
      title: 'Tipo de servicio Id',
      type: 'select',
      data: typeServiceOptions,
      placeholder: 'Tipo de servicio Id'
    },
    {
      key: 5,
      name: 'quotationStatus',
      title: 'Cotización',
      type: 'select',
      data: quotationStatusOptions,
      placeholder: 'Tipo de servicio Id'
    }
  ]

  return (
    <Formik
      initialValues={{
        orderDate: '',
        deliverDate: '',
        quotationStatus: 0,
        userId: '',
        clientId: '',
        typeServiceId: '',

      }}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
       <Form className="space-y-6">
        {inputs.map(input => {
          return input.type == "select" ?
            <div key={input.key}>
              <label htmlFor={input.name}>{input.title}</label>
              <br />
              <Field name={input.name} as={input.type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
                <option value="0">Seleccione {input.title}</option>
                {input.data.map(option => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </Field>
              <ErrorMessage
                name={input.name}
                component="div"
                className="text-red-500"
              />
            </div>
            :
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
        })

        }

        <button
          type="submit"
          className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Crear Cotizacion
        </button>
      </Form>
    </Formik>
  )
}

export function CreateButtomQuotationClient () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Crear Cotizacion Cliente' }))
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
      Crear Cotizacion
    </button>
  )
}

export default CreateQuotationClient
