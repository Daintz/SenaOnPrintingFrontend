import { Formik, Form, Field, ErrorMessage, useFormikContext  } from 'formik'
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
import { Link } from 'react-router-dom'

import { uid } from 'uid';
import { CreateButtonProduct } from '../Product/CreateProduct'

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
  quotationClientId: Yup.string().required('Campo requerido'),
  productId: Yup.string().required('Campo requerido'),
  productQuantity: Yup.string().required('Campo requerido'),
 
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
  return new Promise((resolve, reject) => {
    clientAxios.get('/QuotationClient').then(
      (result) => {
        const QuotationClient = result.data.map((quotationClient) => ({
          'label': quotationClient.id,
          'value': quotationClient.id
        }))
        resolve(QuotationClient)
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
          'price': product.cost,
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


function UpdateQuotation() {
  const [clientsOptions, setClientsOptions] = useState([])
  const [userOptions, setUserOptions] = useState([])
  const [typeServiceOptions, setTypeServiceOptions] = useState([])
  const [quotationclientOptions, setQuotationclientOptions] = useState([])
  const [productOptions, setProductOptions] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState('');
  const [tax, setTax] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([]);
  const [itemsMachine, setItemsMachine] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentDate1, setCurrentDate1] = useState(new Date().toISOString().split('T')[0]);



const reviewInvoiceHandler = (event) => {
  event.preventDefault();
  setIsOpen(true);
};

const addNextInvoiceHandler = () => {
  setInvoiceNumber((prevNumber) => incrementString(prevNumber));
  setItems([
    {
      id: uid(6),
      name: '',
      qty: 1,
      price: '1.00',
    },
  ]);
};

const addItemHandler = (event) => {
  const id = uid(6);
  const product = event.target[event.target.selectedIndex]
  console.log()
  setItems((prevItem) => [
    {
      id: id,
      name: product.text,
      qty: 1,
      price: product.getAttribute('price'),
    },
    ...prevItem,
  ]);
};
const addItemHandlerMachine = (event) => {
  const id = uid(6);
  const machine = event.target[event.target.selectedIndex]
  console.log()
  setItemsMachine((prevItem) => [
    {
      id: id,
      name: machine.text,
    },
    ...prevItem,
  ]);
};

const deleteItemHandler = (id) => {
  setItems((prevItem) => prevItem.filter((item) => item.id !== id));
};
const deleteItemHandlerMachine = (id) => {
  setItemsMachine((prevItem) => prevItem.filter((item) => item.id !== id));
};

const edtiItemHandler = (event) => {
  const editedItem = {
    id: event.target.id,
    name: event.target.name,
    value: event.target.value,
  };

  const newItems = items.map((items) => {
    for (const key in items) {
      if (key === editedItem.name && items.id === editedItem.id) {
        items[key] = editedItem.value;
      }
    }
    return items;
  });
  const newItemsMachine = itemsMachine.map((itemsMachine) => {
    for (const key in items) {
      if (key === editedItem.name && itemsMachine.id === editedItem.id) {
        itemsMachine[key] = editedItem.value;
      }
    }
    return itemsMachine;
  });

  setItemsMachine(newItemsMachine);
  setItems(newItems);
};

const subtotal = items.reduce((prev, curr) => {
  if (curr.name.trim().length > 0)
    return prev + Number(curr.price * Math.floor(curr.qty));
  else return prev;
}, 0);
const taxRate = (tax * subtotal) / 100;
const discountRate = (discount * subtotal) / 100;
const total = subtotal - discountRate + taxRate;



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
  const [createQuotationClient, { error: clientError, isLoading: clientIsLoading }] = usePostQuotationClientMutation()

   useEffect(() => {
    fetchOptions()
  }, [])
  const dispatch = useDispatch()
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
    toast.success('Cotización creada con éxito', {
      autoClose: 100
    })
  }

  return (
    <Formik
      initialValues={{
        orderDate: currentDate,
        deliverDate: currentDate1,
        quotationStatus: '',
        userId: '',
        clientId: '',
        typeServiceId: '',
        quotationClientId: '',
        productId: '',
        productQuantity: '',
      }}
      onSubmit={(values) => {
        handleSubmit(values)
        // const result = values.unitValue * values.productQuantity;
       /*  const { values } = useFormikContext(); // Obtiene los valores del formulario
        const selectedProductId = values.productId; // Obtiene el valor seleccionado de productId
      
        const findCostByProductId = (productId) => {
          const selectedProduct = productOptions.find((option) => option.value === productId);
          return selectedProduct ? selectedProduct.cost : 0
        }
        const cost = findCostByProductId(selectedProductId) */
      }}
      validationSchema={validationSchema}
    >
      {({ setFieldValue }) => (
        <Form
        onSubmit={reviewInvoiceHandler}
        >
        <div className="flex justify-between w-full">
          <div className="flex gap-5 grid-cols-5 mb-2">
          <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6 w-200 h-100">
          <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-4/4">
          <b>Codigo : 0001</b>
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
          <div className="flex gap-5 grid-cols-5 mb-2">
          <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between md:w-1/2">
            <span className="font-bold">Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Total:</span>
            <span className="font-bold">
              ${total % 1 === 0 ? total : total.toFixed(2)}
            </span>
          </div>
            </div>
        </div>
        <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-4/4">
              <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Estado de la Cotización <b className="text-red-700">*</b>
              </label>
              <Field
                as="text"
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
            <center>
            <button
                  type="submit"
                  className="text-white bg-custom-blue hover:bg-custom-blue-lighter focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-auto"
                >
                  Crear Cotización
                </button>
          </center>
          </div>
          </div>
          <div className="flex gap-5 grid-cols-5 mb-2">
          <div className="my-6 rounded-md bg-white shadow-sm md:p-10 w-[852px]">
          <label
          htmlFor="productList"
          className="col-start-2 row-start-1 text-sm font-bold md:text-base"
        >
          Seleccione un producto:  <b className="text-red-700">*</b>
        </label>
        <Field
                as="select"
                name="productList"
                id="productId"
                onChange={addItemHandler}
                value="0"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="100"
              >
                <option value={0}>Seleccione</option>
                {productOptions.map(option =>(
            <option key={option.value} value={option.value} price={option.price}>{option.label}</option>
          ))}
              </Field>
              <div className="w-full md:w-auto  md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-center md:space-x-3 flex-shrink-0 mt-10">
              <CreateButtonProduct />
            </div>
            <br></br>
        <table className="w-1/4 p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-xs md:text-base">
              <th className='text-xs'>Producto</th>
              <th className='text-xs'>Cantidad</th>
              <th className="text-center text-xs">Precio</th>
              <th className="text-center text-xs">Tipo de Servicio</th>
              <th className="text-center text-xs">Acción</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                qty={item.qty}
                price={item.price}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}
              />
            ))}
          </tbody>
        </table>
        
            </div>
        </div>
        </div>
        
        </Form>
      )}
    </Formik>
  )
}
export function CreateButtomQuotation() {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
   /*  dispatch(setWidth({ width: 'w-[1500px]' }))
    dispatch(openModal({ title: 'Crear Cotizacion Cliente' }))
    dispatch(setAction({ action: 'creating' })) 
  */} 
  // ?
  return (
    <button
      type="button"
      onClick={() => handleOpen()}
    ><Tooltip title="Crear Cotiazación" position="bottom"
    animation="fade">
      <Link to="/createQuotation">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          />
        </svg>
      </Link>
      </Tooltip>
    </button>
  )
}

export default UpdateQuotation
