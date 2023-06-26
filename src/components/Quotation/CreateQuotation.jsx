import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostQuotationClientMutation, usePostQuotationClientDetailMutation } from '../../context/Api/Common'
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

const quotationStatusOptions = [
  { value: 1, label: 'En proceso' },
  { value: 2, label: 'Aprobado' },
  { value: 3, label: 'No aprobado' }
]

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

function CreateQuotation () {
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
  const [createQuotationClient, { error: clientError, isLoading: clientIsLoading }] = usePostQuotationClientMutation()
  const [createQuotationClientDetail, { error: detailError, isLoading: detailIsLoading }] = usePostQuotationClientDetailMutation()
  const [quotationDetails, setQuotationDetails] = useState([])
  const handleSubmit = async (values) => {
    console.log(values)
    if (clientIsLoading || detailIsLoading) return <Spinner />

    const response = await createQuotationClient(values)
    console.log(response)
    const response2 = await createQuotationClientDetail(values)
    console.log(response2)
    // Crear la cotización principal
    const quotationId = response.data.id // Obtener el ID de la cotización creada
    // Crear los detalles de cotización
    for (const detail of quotationDetails) {
      const detailData = { ...detail, quotationId }
    }
    dispatch(changeAction())
    if (!clientError && !detailError) {
      dispatch(closeModal())
    }
    toast.success('Cotización creada con éxito',  {
      autoClose: 100
    })
  }
  const handleAddDetail = () => {
    setQuotationDetails((prevDetails) => [
      ...prevDetails,
      {
        // Propiedades del detalle de cotización
      }
    ])
  }
  const clientInputs = [
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
  const detailInputs = [
    {
      key: 6,
      name: 'technicalSpecifications',
      title: 'Especificaciones tecnicas',
      type: 'text',
      placeholder: 'Especificaciones tecnicas'
    },
    {
      key: 7,
      name: 'productHeight',
      title: 'Altura del producto',
      type: 'number',
      placeholder: 'Altura del producto'
    },
    {
      key: 8,
      name: 'productWidth',
      title: 'Ancho del producto',
      type: 'number',
      placeholder: 'Ancho del producto'
    },
    {
      key: 9,
      name: 'numberOfPages',
      title: 'Numero de paginas',
      type: 'number',
      placeholder: 'Numero de paginas'
    },
    {
      key: 10,
      name: 'inkQuantity',
      title: 'Cantidad de tinta',
      type: 'number',
      placeholder: 'Cantidad de tinta'
    },
    {
      key: 11,
      name: 'productQuantity',
      title: 'Cantidad de producto',
      type: 'number',
      placeholder: 'Cantidad de producto'
    },
    {
      key: 12,
      name: 'unitValue',
      title: 'Valor unico',
      type: 'number',
      placeholder: 'Valor unico'
    },
    {
      key: 13,
      name: 'fullValue',
      title: 'Valor total',
      type: 'number',
      placeholder: 'Valor total'
    },
    {
      key: 14,
      name: 'quotationClientId',
      title: 'Cotizacion Cliente Id',
      type: 'number',
      placeholder: 'Cotizacion Cliente Id'
    },
    {
      key: 15,
      name: 'productId',
      title: 'Producto Id',
      type: 'number',
      placeholder: 'Producto Id'
    }
  ]
  return (
    <Formik
      initialValues={{
        orderDate: '',  
        deliverDate: '',
        quotationStatus: 0,
        userId: 0,
        clientId: 0,
        typeServiceId: 0,
        quotationClientId: '',
        productId: '',
        technicalSpecifications: '',
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
      }}
      validationSchema={validationSchema}
    >
        <Form className="space-y-6">
          {clientInputs.map(input => {
            return input.type == "select" ?
            <div key={input.key}>
              <label htmlFor={input.name}>{input.title}</label>
              <br />
              <Field name={input.name} as={input.type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
                <option value="0">Seleccione {input.title}</option>
                {input.data.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Field>
              <ErrorMessage
                name={input.name}
                component="div"
                className="text-red-500"
              />
            </div>:
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
})}
          <title>COTIZACION DETALLE</title>
       <button
  type="button"
  onClick={handleAddDetail}
  className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
>
  Agregar detalle de cotización
</button>
{quotationDetails.map((detail, index) => (
  <div key={index}>
    {detailInputs.map(input => (
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
    
  </div>
))}

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

export function CreateButtomQuotation () {
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

export default CreateQuotation
