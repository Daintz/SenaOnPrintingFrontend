import { usePutSupplyDetailsByIdMutation } from '../../context/Api/Common'
import { changeAction, closeModal, openEditing, openModal, setAction, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import clientAxios from '../../config/clientAxios'
import { useEffect, useState } from 'react'

const validationSchema = Yup.object().shape({
  description: Yup.string(),
  supplyCost: Yup.number().required('Campo requerido'),
  // batch: Yup.string(),
  entryDate: Yup.date().required('Campo requerido'),
  expirationDate: Yup.date().required('Campo requerido'),
  supplyId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un insumo'),
  providerId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un proveedor'),
  warehouseId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir una bodega'),
})

const getSupply = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/Supply').then(
      (result) => {
        const supplyId = result.data.map((Supply) => ({
          'label': Supply.name,
          'value': Supply.id
        }));
        resolve(supplyId);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const getProviders = async () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/Provider').then(
      (result) => {
        const providerId = result.data.map((Provider) => ({
          'label': Provider.nameCompany,
          'value': Provider.id
        }));
        resolve(providerId);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const getWarehause = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/Warehause').then(
      (result) => {
        const warehouse_id = result.data.map((Warehause) => ({
          'label': Warehause.warehouseTypeId,
          'value': Warehause.warehouseTypeId
        }));
        resolve(warehouse_id);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

function updateSupplyDetails () {
  const dispatch = useDispatch()
  const { editingData } = useSelector((state) => state.modal)
  const [updateSupplyDetails, { error, isLoading }] = usePutSupplyDetailsByIdMutation()
  const [supplyOptions, setSupplyOptions] = useState([]);
  const [providerOptions, setProviderOptions] = useState([]);
  const [warehauseOptions, setWarehauseOptions] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([]);
  const [tax, setTax] = useState('');
  const [discount, setDiscount] = useState('');
  const [entryDate, setEntryDate] = useState(new Date());
  

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
    const name = uid(6);
    const Supply = event.target[event.target.selectedIndex]
    console.log()
    setItems((prevItem) => [
      {
        id: name,
        name: name,
        qty: 1,
        price: Supply.getAttribute('price'),
        
      },
      ...prevItem,
    ]);
  };
  
  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
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
    getSupply().then((options) => {
      setSupplyOptions(options);
    });
    getProviders().then((options) => {
      setProviderOptions(options);
    });
    getWarehause().then((options) => {
      setWarehauseOptions(options);
    });
    
  };

  useEffect(() => {
    fetchOptions();
  }, []);


  const handleSubmit = async values => {
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />
    await updateSupplyDetails(values)

    dispatch(changeAction())
    dispatch(closeModal())
    toast.success('Compra de insumo actualizada con exito')
  }

  const inputs = [
    // { key: 1, name: 'supplyCost', title: 'Costo insumo', type: 'number', placeholder: 'Costo insumo' },
    // { key: 2, name: 'batch', title: 'Lote', type: 'text', placeholder: 'Lote' },
    { key: 0, name: 'entryDate', title: 'Fecha de entrada', type: 'date', placeholder: 'Fecha de entrada' },
    { key: 1, name: 'expirationDate', title: 'Fecha de caducidad', type: 'date', placeholder: 'Fecha de caducidad' },
    // { key: 6, name: 'actualQuantity', title: 'Cantidad actual', type: 'number', placeholder: 'Cantidad actual' },
    { key: 2, name: 'providerId', title: 'Id proveedor', type: 'select', data: providerOptions, placeholder: 'Id proveedor' },
    { key: 3, name: 'warehouseId', title: 'Id bodega', type: 'select', data: warehauseOptions, placeholder: 'Id bodega' },
    { key: 4, name: 'description', title: 'Descripcion', type: 'text', placeholder: 'Descripcion' },
    { key: 5, name: 'supplyId', title: 'Id insumo', type: 'select', data: supplyOptions, placeholder: 'Id insumo' },
  ]

  return (
    <Formik
      initialValues={{
        id: editingData.id,
        entryDate: editingData.entryDate ? new Date(editingData.entryDate).toISOString().split('T')[0] : '',
        expirationDate: editingData.expirationDate ? new Date(editingData.expirationDate).toISOString().split('T')[0] : '',
        providerId: editingData.providerId,
        warehouseId: editingData.warehouseId,
        description: editingData.description,
        supplyId: editingData.supplyId,
        // supplyCost: editingData.supplyCost,
        // batch: editingData.batch,
        // actualQuantity: editingData.actualQuantity,
      }}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, values, handleSubmit, errors, touched }) => (
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
          <div key='0' className="w-1/4 ml-2">
              <label htmlFor="entryDate">Fecha de entrada</label>
              <Field
                type="date"
                name="entryDate"
                id="entryDate"
                placeholder="Fecha de entrada"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.entryDate && touched.entryDate && (
                <div className="text-red-500">{errors.entryDate}</div>
              )}
        </div>

        <div key='1' className='w-1/4 mr-2'>
          <label htmlFor="expirationDate">Fecha de caducidad</label>
          <Field
              type="date"
              name="expirationDate"
              id="expirationDate"
              placeholder="Fecha de caducidad"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              min={new Date().toISOString().split('T')[0]}
              />
              {errors.entryDate && touched.entryDate && (
                <div className="text-red-500">{errors.entryDate}</div>
              )}
        </div>
        </div>

          <div className="flex gap-5 grid-cols-5 mb-3">
          <div key='2' className='w-1/4 ml-2'>
          <label htmlFor="providerId">Proveedor</label>
          <br />
          <Field name="providerId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
            <option value={0}>Seleccione un proveedor</option>
            {providerOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>

            ))}
          </Field>
          <ErrorMessage
            name="providerId"
            component="div"
            className="text-red-500"
          />
        </div>

        <div key='3' className='w-1/4 ml-2'>
          <label htmlFor="warehouseId">Bodega</label>
          <br />
          <Field name="warehouseId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
            <option value={0}>Seleccione una bodega</option>
            {warehauseOptions.map(option =>  (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Field>
          <ErrorMessage
            name="warehouseId"
            component="div"
            className="text-red-500"
          />
        </div>
        </div>
        <div className="flex gap-5 grid-cols-5 mb-3">
        <div key='4' className='w-1/2 mr-2'>
          <label htmlFor="description">Descripción</label>
          <Field
              as="textarea"
              type="text"
              name="description"
              id="description"
              placeholder="Descripción"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              rows="6" cols="100"
          />
          <ErrorMessage
            name="description"
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
            <center>
            <button
                  type="submit"
                  className="text-white bg-custom-blue hover:bg-custom-blue-lighter focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-auto"
                >
                  Actualizar Compra de Insumos
                </button>
                
          </center>
          </div>
          </div>
          <div className="flex gap-5 grid-cols-5 mb-2">
          <div key='5' className="my-6 rounded-md bg-white shadow-sm md:p-10 w-[700px]">
        <label
          htmlFor="supplyId"
          className="col-start-2 row-start-1 text-sm font-bold md:text-base"
        >
          Seleccione un insumo:
        </label>
        <Field name="supplyId" as="select" onChange={addItemHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
            <option value={0}>Seleccione un insumo</option>
            {supplyOptions.map(option => (
              <option key={option.value} price={option.price} value={option.value}>{option.label}</option>
            ))}
          </Field>
              <div className="w-full md:w-auto  md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-center md:space-x-3 flex-shrink-0 mt-10">
              <UpdateButtomSupplyDetails />
            </div>
            <br></br>
        <table className="w-1/4 p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-xs md:text-base">
              <th className='text-xs'>Insumo</th>
              <th className='text-xs'>Cantidad</th>
              <th className="text-center text-xs">Precio</th>
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

export function UpdateButtomSupplyDetails ({ supplyDetails }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleEdit = (data) => {
    dispatch(setWidth({ width: 'w-[1000]' }))
    dispatch(openModal({ title: 'Editar compra de insumos' }))
    dispatch(setAction({ action: 'editing' }))
    dispatch(openEditing({ editingData: data }))
  }
  // ?

  return (
    <button type="button" onClick={() => {
      handleEdit(supplyDetails)
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

export default updateSupplyDetails
