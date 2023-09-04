import { Formik, Form, Field, ErrorMessage, useFormikContext, FieldArray  } from 'formik'

import * as Yup from 'yup'
import { usePostQuotationClientMutation, usePostQuotationClientDetailMutation } from '../../context/Api/Common'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import clientAxios from '../../config/clientAxios'
import { useNavigate, Link } from 'react-router-dom'



const validationSchema = Yup.object().shape({
  // orderDate: Yup.date().required('Campo requerido').test('valid-deliver-date', 'La fecha de entrega debe ser igual a la fecha actual', function (value) {
  //   const currentDate = new Date()
  //   const selectedDate = new Date(value)
  //   // Compara si la fecha de entrega es igual a la fecha actual
  //   return selectedDate.toDateString() === currentDate.toDateString()
  // }),
  // deliverDate: Yup.date().default(() => new Date()).required('Campo requerido').test('valid-date', 'La fecha debe ser posterior o igual a la fecha actual', function (value) {
  //   const currentDate = new Date()
  //   const selectedDate = new Date(value)
  //   // Compara si la fecha seleccionada es mayor o igual a la fecha actual y si es del mismo día
  //   return selectedDate >= currentDate || selectedDate.toDateString() === currentDate.toDateString()
  // }),
  // quotationStatus: Yup.string().required('Campo requerido'),
  // userId: Yup.string().required('Campo requerido'),
  // clientId: Yup.string().required('Campo requerido'), 
 
 
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



const getProduct = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/Product').then(
      (result) => {
        const Product = result.data.map((product) => ({
          
          'label': product.name,
          'Cost': product.cost,
          'value': product.id
          
        }))
        resolve(Product)
      },
      (error) => {
        reject(error)
      }
    )
  })
}


function CreateQuotation() {
  const [createQuotationClient, { error: clientError, isLoading: clientIsLoading }] = usePostQuotationClientMutation()
  const [createQuotationclientDetail, { error: detailError, isLoading: detailIsLoading }] = usePostQuotationClientDetailMutation()

  const [clientsOptions, setClientsOptions] = useState([])
  const [userOptions, setUserOptions] = useState([])
  const [typeServiceOptions, setTypeServiceOptions] = useState([])
  const [productOptions, setProductOptions] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentDate1, setCurrentDate1] = useState(new Date().toISOString().split('T')[0]);
  const [lastCode, setLastCode] = useState(0);
  const navigate = useNavigate();



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
 
    getProduct().then((options) => {
      setProductOptions(options)
    })
  }
 
   useEffect(() => {
    fetchOptions()
}, []);
 

const handleSubmit = async (values) => {
  try {
    // Realiza la llamada a la mutación para crear la cotización
   const clientResponse = await createQuotationClient(values); 
    console.log(values)
    // Verifica si hubo errores en la respuesta
    if (clientResponse.error) {
      // Maneja el error, muestra un mensaje, etc.
      console.error('Error en la creación de la cotización (client):', clientResponse.error);
      return;
    }

    // Obtén el ID de la cotización creada
 

    // Luego, itera a través de los detalles de la cotización y crea cada uno
 

    // Si todo se creó correctamente, puedes redirigir al usuario a la página de cotizaciones o mostrar un mensaje de éxito.
    toast.success('La cotización se creó correctamente');
    // Aquí puedes redirigir al usuario a la página de cotizaciones, por ejemplo:
     navigate('/Quotation');
  } catch (error) {
    console.error('Error:', error);
    // Handle any unexpected errors here
  }
};

  return (
    <Formik
      initialValues={{
        orderDate: currentDate,
        deliverDate: currentDate1,
        userId: 0,
        clientId: 0,
        code: 19,
        quotationStatus: 1,
        FullValue: 87,
        StatedAt: true,
        quotationClientDetailCreateDto: [{ProductId: 0, Quantity: 0, Cost: 0, TypeServiceId: 0, StatedAt: true}], 
      }}
      onSubmit={(values) => {
        handleSubmit(values);
        //console.log(values);
      }}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, values }) => (
        <Form>
        <div className="flex justify-between w-full">
          <div className="flex gap-5 grid-cols-5 mb-2">
          <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6 w-200 h-100">
          <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-4/4">
          Codigo {1}
            </div>
            <div className="w-4/4">
             <b>Fecha: {new Date().toISOString().split('T')[0]}</b>
            </div>
          </div>
          <hr className="mb-4" />
          <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-4/4">
              <label htmlFor="deliverDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Fecha de Entrega <b className="text-red-700">*</b>
              </label>
              <Field
                type="date"
                name="deliverDate"
                id="deliverDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Libreta"
                min={new Date().toISOString().split('T')[0]}
              />
              <ErrorMessage
                name="deliverDate"

                component="div"
                className="text-red-500"
              />
            </div>
            </div>
            <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-4/4">
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
                <option value={0}>Seleccione</option>
                  {userOptions.map((option) => (
          <option key={option.value} value={parseInt(option.value)}>
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
            </div>
          <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-4/4">
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
                  <option value={0}>Seleccione</option>
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
            
          </div>
          <div>
          </div>
        <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-4/4">
              <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Estado de la Cotización <b className="text-red-700">*</b>
              </label>
              <Field
  as="select"
  name="quotationStatus"
  id="quotationStatus"
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
  placeholder="100"
>
  <option value={1}>En proceso</option>
</Field>
              <ErrorMessage
                name="quotationStatus"

                component="div"
                className="text-red-500"
              />
            </div>
          </div>
          </div>
          </div>
          <div className="flex gap-5 grid-cols-5 mb-2">
          <div className="my-6 rounded-md bg-white shadow-sm md:p-10 w-[852px]">
        <FieldArray name="quotationClientDetailCreateDto">
        {({ push, remove }) => (
          <div>
            {values.quotationClientDetailCreateDto.map((product, index) => (
              <div key={index}>
                <div className="flex gap-5 grid-cols-5 mb-3">
                  <div className="w-4/4">
                    <label htmlFor={`quotationClientDetailCreateDto[${index}].ProductId`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Producto {index + 1}
                    </label>
                    <Field
                      type="number"
                      as="select"
                      name={`quotationClientDetailCreateDto[${index}].ProductId`}
                      id={`quotationClientDetailCreateDto[${index}].ProductId`}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                      placeholder="Seleccionar producto"
                    >
                       <option value={0}>Seleccione</option>
                  {productOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
                    </Field>
                  </div>
                  <div className="w-4/4">
                    <label htmlFor={`quotationClientDetailCreateDto[${index}].Quantity`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Cantidad {index + 1}
                    </label>
                    <Field
                      type="number"
                      name={`quotationClientDetailCreateDto[${index}].Quantity`}
                      id={`quotationClientDetailCreateDto[${index}].Quantity`}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                      
                    >
                   
                    </Field>
                  </div>
                  <div className="w-4/4">
                    <label htmlFor={`quotationClientDetailCreateDto[${index}].Cost`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Precio Unitario {index + 1}
                    </label>
                    <Field
                      type="number"
                      name={`quotationClientDetailCreateDto[${index}].Cost`}
                      id={`quotationClientDetailCreateDto[${index}].Cost`}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                    >
                     
                    </Field>
                  </div>
                  <div className="w-4/4">
                    <label htmlFor={`quotationClientDetailCreateDto[${index}].TypeServiceId`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Tipo de servicio {index + 1}
                    </label>
                    <Field
                      type="number"
                      as="select"
                      name={`quotationClientDetailCreateDto[${index}].TypeServiceId`}
                      id={`quotationClientDetailCreateDto[${index}].TypeServiceId`}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                      placeholder="Seleccionar producto"
                    >
                        <option value={0}>Seleccione</option>
                  {typeServiceOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
                    </Field>
                  </div>
                </div>
              
                <button type="button" onClick={() => remove(index)}>
                  Eliminar Producto
                </button>
              </div>
            ))}
            
       
            <button
              type="button"
              onClick={() => push({ ProductId: 0, Quantity: 0, Cost: 0, TypeServiceId: 0 })}
            >
              Agregar Producto
            </button>
          </div>
        )}
      </FieldArray> 
            </div>
            
       
        </div>
        </div>
        <button type="submit" className="text-white bg-custom-blue hover:bg-custom-blue-lighter focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-auto"
                >
                  Crear Cotización
                </button>
        
        </Form>
      )}
    </Formik>
  )
}
export function CreateButtomQuotation() {
  const { handleSubmit } = useFormikContext();

  return (
    <button
      className="flex items-center justify-center border border-gray-400 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
      type="button"
      onClick={handleSubmit}
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
      Crear Cotiazicion
    </button>
  );
}

export default CreateQuotation
