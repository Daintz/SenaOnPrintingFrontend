import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import clientAxios from '../../config/clientAxios'
import * as Yup from 'yup'
import { usePostSupplyDetailsMutation } from '../../context/Api/Common'
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
import InvoiceItem from './InvoiceItem';
import incrementString from './helpers/IncrementString'
import { uid } from 'uid';


const validationSchema = Yup.object().shape({
  description: Yup.string().required('Campo requerido'),
  supplyCost: Yup.number().required('Campo requerido'),
  batch: Yup.string(),
  entryDate: Yup.date().required('Campo requerido'),
  expirationDate: Yup.date().required('Campo requerido'),
  supplyId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un insumo'),
  providerId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un proveedor'),
  warehouseId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir una bodega'),
});

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
        const warehouseId = result.data.map((Warehause) => ({
          'label': Warehause.warehouseTypeId,
          'value': Warehause.warehouseTypeId
        }));
        resolve(warehouseId);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

function CreateSupplyDetails() {
  const [supplyOptions, setSupplyOptions] = useState([]);
  const [providerOptions, setProviderOptions] = useState([]);
  const [warehauseOptions, setWarehauseOptions] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([]);
  const [batchNumber, setBatchNumber] = useState(1);
  const [entryDate, setEntryDate] = useState(new Date());
  // const optionsList = [
  //   {"value": "", "text": "Seleccione un insumo"},
  //   {"value": Supply.id, "text": Supply.name}
    
  // ]

  
const reviewInvoiceHandler = (event) => {
  event.preventDefault();
  setIsOpen(true);
};

const addNextInvoiceHandler = () => {
  const currentYear = entryDate.getFullYear();
  const nextBatchNumber = batchNumber + 1;
  const formattedBatchNumber = nextBatchNumber.toString().padStart(3, '0');
  const newBatchNumber = `${formattedBatchNumber}-${currentYear}`;
  setBatchNumber(nextBatchNumber);
  setInvoiceNumber((prevNumber) => incrementString(prevNumber));
  setItems([
    {
      id: uid(6),
      name: '',
      qty: 1,

    },
  ]);
  setFieldValue('batch', newBatchNumber);
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

const handleEntryDateChange = (date) => {
  setEntryDate(date);
  const currentYear = date.getFullYear();
  const formattedBatchNumber = (batchNumber % 1000).toString().padStart(3, '0');
  const newBatchNumber = `${formattedBatchNumber}-${currentYear}`;
  setFieldValue('batch', newBatchNumber);
};
  

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

  const dispatch = useDispatch();
  const [createSupplyDetails, { error, isLoading }] = usePostSupplyDetailsMutation();

  const handleSubmit = async (values) => {
    if (isLoading) return;

    try {

      const response = await createSupplyDetails(values);

      dispatch(changeAction());
      if (!response.error) {
        dispatch(closeModal());
      }

      toast.success('Compra de insumo creada con éxito', {
        autoClose: 1000 // Duración de 1 segundo
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={{
        description: '',
        supplyCost: 0,
        batch: '',
        entryDate: currentDate, //currentDate, Asignar la fecha actual al campo de fecha de entrada
        expirationDate: '',
        supplyId: 0,
        providerId: 0,
        warehouseId: 0,
        suppliesLabel: '',
        securityFile: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, handleSubmit, errors, touched }) => (
      <Form onSubmit={reviewInvoiceHandler}
       className="space-y-6">
      <div className='flex mb-2'>
        <div  className='w-1/2 mr-2'>
          <label htmlFor="description">Descripción</label>
          <Field
              type="text"
              name="description"
              id="description"
              placeholder="Descripción"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-500"
          />
        </div>
        <div  className='w-1/4 ml-2'>
          <label htmlFor="supplyCost">Costo insumo</label>
          <Field
              type="number"
              name="supplyCost"
              id="supplyCost"
              placeholder="Costo insumo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
          />
          <ErrorMessage
            name="supplyCost"
            component="div"
            className="text-red-500"
          />
        </div>
      </div>
      <div className='flex mb-2'>
      <div  className='w-1/4 ml-2'>
          <label htmlFor="batch">Lote</label>
          <Field
              type="text"
              name="batch"
              id="batch"
              placeholder="Lote"
              value={batchNumber.toString().padStart(3, '0') + '-' + new Date().getFullYear()}
              readOnly
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
              
          />
          <ErrorMessage
            name="batch"
            component="div"
            className="text-red-500"
          />
        </div>
        
        {/* <div  className='w-1/4 mr-2'>
          <label htmlFor="initialQuantity">Cantidad inicial</label>
          <Field
              type="number"
              name="initialQuantity"
              id="initialQuantity"
              placeholder="Cantidad inicial"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
          />
          <ErrorMessage
            name="initialQuantity"
            component="div"
            className="text-red-500"
          />
        </div> */}
        <div className="w-1/4 ml-2">
              <label htmlFor="entryDate">Fecha de entrada</label>
              <Field
                type="date"
                name="entryDate"
                id="entryDate"
                placeholder="Fecha de entrada"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.entryDate && touched.entryDate && (
                <div className="text-red-500">{errors.entryDate}</div>
              )}
        </div>

        <div  className='w-1/4 mr-2'>
          <label htmlFor="expirationDate">Fecha de caducidad</label>
          <Field
              type="date"
              name="expirationDate"
              id="expirationDate"
              placeholder="Fecha de caducidad"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
          />
          <ErrorMessage
            name="expirationDate"
            component="div"
            className="text-red-500"
          />
        </div>
        
      <div className='flex mb-2'>
        
        <div className='flex mb-2'>
        {/* <div  className='w-1/9 ml-2'>
          <label htmlFor="supplyId">Insumo</label>
          <br />
          <Field name="supplyId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5">
            <option value={0}>Seleccione un insumo</option>
            {supplyOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Field>
          <ErrorMessage
            name="supplyId"
            component="div"
            className="text-red-500"
          />
        </div> */}
        <div  className='w-1/9 ml-2'>
          <label htmlFor="providerId">Proveedor</label>
          <br />
          <Field name="providerId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5">
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
        </div>
        <div  className='w-1/9 ml-2'>
          <label htmlFor="warehouseId">Bodega</label>
          <br />
          <Field name="warehouseId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5">
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
      </div>
      <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="my-6 flex-1 space-y-2  rounded-md bg-white p-4 shadow-sm sm:space-y-4 md:p-6">
        <label
          htmlFor="supplyId"
          className="col-start-2 row-start-1 text-sm font-bold md:text-base"
        >
          Seleccione un insumo:
        </label>
        <Field name="supplyId" as="select" onChange={addItemHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5">
            <option value={0}>Seleccione un insumo</option>
            {supplyOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Field>
          <ErrorMessage
            name="supplyId"
            component="div"
            className="text-red-500"
          />
        {/* <button
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
          type="button"
          onClick={addItemHandler}
        >
          Add Item
        </button> */}
        <table className="w-full p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
              <th>Insumo</th>
              <th>Cantidad</th>
              <th className="text-center">Accion</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                qty={item.qty}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}

              />
            ))}
          </tbody>
        </table>
        
      </div>
                        

      </div>
      <button
        type="submit"
        className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Crear compra de insumo
      </button>
    </Form>
      )}
    </Formik>
  )
}

export function CreateButtomSupplyDetails () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Crear compra de insumo' }))
    dispatch(setAction({ action: 'creating' }))
  }
  // ?

  return (
    <button
      className="flex items-center justify-center border border-gray-400 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
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
      Crear compra de insumo
    </button>
  )
}

export default CreateSupplyDetails




// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import * as Yup from 'yup'
// import { usePostSupplyDetailsMutation } from '../../context/Api/Common'
// import {
//   changeAction,
//   closeModal,
//   openModal,
//   setAction,
//   setWidth
// } from '../../context/Slices/Modal/ModalSlice'
// import Spinner from '../Spinner/Spinner'
// import { toast } from 'react-toastify'
// import clientAxios from '../../config/clientAxios'

// const validationSchema = Yup.object().shape({
//   description: Yup.string().required('Campo requerido'),
//   supplyCost: Yup.number().required('Campo requerido'),
//   batch: Yup.string().required('Campo requerido'),
//   initialQuantity: Yup.number().required('Campo requerido'),
//   entryDate: Yup.date().required('Campo requerido'),
//   expirationDate: Yup.date().required('Campo requerido'),
//   actualQuantity: Yup.number().required('Campo requerido'),
//   supplyId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un insumo'),
//   providerId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un proveedor'),
//   warehouseId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir una bodega'),
//   securityFile: Yup.number().required('Campo requerido'),
//   suppliesLabel: Yup.number().required('Campo requerido')
// })

// const getSupply = () => {
//   return new Promise((resolve, reject) => {
//     clientAxios.get('/Supply').then(
//       (result) => {
//         const supplyId = result.data.map((Supply) => ({
//           'label': Supply.name,
//           'value': Supply.id
//         }));
//         resolve(supplyId);
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });
// };

// const getProviders = async () => {
//   return new Promise((resolve, reject) => {
//     clientAxios.get('/Provider').then(
//       (result) => {
//         const providerId = result.data.map((Provider) => ({
//           'label': Provider.nameCompany,
//           'value': Provider.id
//         }));
//         resolve(providerId);
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });
// };

// const getWarehause = () => {
//   return new Promise((resolve, reject) => {
//     clientAxios.get('/Warehause').then(
//       (result) => {
//         const warehouseId = result.data.map((Warehause) => ({
//           'label': Warehause.warehouseTypeId,
//           'value': Warehause.warehouseTypeId
//         }));
//         resolve(warehouseId);
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });
// };

// function CreateSupplyDetails () {
//   const [supplyOptions, setSupplyOptions] = useState([]);
//   const [providerOptions, setProviderOptions] = useState([]);
//   const [warehauseOptions, setWarehauseOptions] = useState([]);

//   const fetchOptions = () => {
//     getSupply().then((options) => {
//       setSupplyOptions(options);
//     });
//     getProviders().then((options) => {
//       setProviderOptions(options);
//     });
//     getWarehause().then((options) => {
//       setWarehauseOptions(options);
//     });
//   };

//   useEffect(() => {
//     fetchOptions();
//   }, []);

//   const dispatch = useDispatch()
//   const [createSupplyDetails, { error, isLoading }] = usePostSupplyDetailsMutation()
//   const [previewImage, setPreviewImage] = useState(null)
//   const handleSubmit = async (values) => {
//     if (isLoading) return <Spinner />

//     const formData = new FormData();
//     formData.append('description', values.description)
//     formData.append('supplyCost', values.supplyCost);
//     formData.append('batch', values.batch);
//     formData.append('initialQuantity', values.initialQuantity);
//     formData.append('entryDate', values.entryDate);
//     formData.append('expirationDate', values.expirationDate);
//     formData.append('actualQuantity', values.actualQuantity);
//     formData.append('supplyId', values.supplyId);
//     formData.append('providerId', values.providerId);
//     formData.append('warehouseId', values.warehouseId);
//     formData.append('securityFileInfo', values.securityFile);
//     formData.append('suppliesLabelInfo', values.suppliesLabel);
//     for (const num of formData.entries()) {
//       console.log(num)
//     }
//     await createSupplyDetails(formData);

//     dispatch(changeAction())
//     if (!error) {
//       dispatch(closeModal())
//     }
//     toast.success('Lote de insumo creado con exito', {
//       autoClose: 1000
//     })
//   }
//   const handleFileChange = event => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const inputs = [
//     {
//       key: 0,
//       name: 'description',
//       title: 'Descripción',
//       type: 'text',
//       placeholder: 'Descripción'
//     },
    
//     {
//       key: 1,
//       name: 'supplyCost',
//       title: 'Costo insumo',
//       type: 'number',
//       placeholder: 'Costo insumo'
//     },

//     {
//       key: 2,
//       name: 'batch',
//       title: 'Lote',
//       type: 'text',
//       placeholder: 'Lote'
//     },
//     {
//       key: 3,
//       name: 'initialQuantity',
//       title: 'Cantidad inicial',
//       type: 'number',
//       placeholder: 'Cantidad inicial'
//     },
//     {
//       key: 4,
//       name: 'entryDate',
//       title: 'Fecha de entrada',
//       type: 'date',
//       placeholder: 'Fecha de entrada'
//     },
//     {
//       key: 5,
//       name: 'expirationDate',
//       title: 'Fecha de caducidad',
//       type: 'date',
//       placeholder: 'Fecha de caducidad'
//     },
//     {
//       key: 6,
//       name: 'actualQuantity',
//       title: 'Cantidad actual',
//       type: 'number',
//       placeholder: 'Cantidad actual'
//     },
//     {
//       key: 7,
//       name: 'supplyId',
//       title: 'Id insumo',
//       type: 'select',
//       data: supplyOptions,
//       placeholder: 'Id insumo'
//     },
//     {
//       key: 8,
//       name: 'providerId',
//       title: 'Id proveedor',
//       type: 'select',
//       data: providerOptions,
//       placeholder: 'Id proveedor'
//     },
//     {
//       key: 9,
//       name: 'warehouseId',
//       title: 'Id bodega',
//       type: 'select',
//       data: warehauseOptions,
//       placeholder: 'Id bodega'
//     },
//     {
//       key: 10,
//       name: 'suppliesLabel',
//       title: 'Etiqueta de insumo',
//       type: 'file',
//       placeholder: 'Etiqueta de insumo'
//     },
//     {
//       key: 11,
//       name: 'securityFile',
//       title: 'Ficha de seguridad',
//       type: 'file',
//       placeholder: 'Ficha de seguridad'
//     },

//   ]

//   return (
//     <Formik
//       initialValues={{
//         description: '',
//         supplyCost: 0,
//         batch: '',
//         initialQuantity: 0,
//         entryDate: 0,
//         expirationDate: 0,
//         actualQuantity: 0,
//         supplyId: 1,
//         providerId: 1,
//         warehouseId:1,
//         securityFile: '',
//         suppliesLabel:''

//       }}
//       onSubmit={(values) => {
//         console.log(values)
//         handleSubmit(values)
//       }}
//       validationSchema={validationSchema}
//     >
//       {({ setFieldValue }) => (
//       <Form className="space-y-6">
//         <div className='flex mb-2'>
//           <div key='0' className='w-1/2 mr-2'>
//             <label htmlFor="description">Descripción</label>
//             <Field
//                 type="text"
//                 name="description"
//                 id="description"
//                 placeholder="Descripción"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
//             />
//             <ErrorMessage
//               name="description"
//               component="div"
//               className="text-red-500"
//             />
//           </div>
//           <div key='1' className='w-1/4 ml-2'>
//             <label htmlFor="supplyCost">Costo insumo</label>
//             <Field
//                 type="number"
//                 name="supplyCost"
//                 id="supplyCost"
//                 placeholder="Costo insumo"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
//             />
//             <ErrorMessage
//               name="supplyCost"
//               component="div"
//               className="text-red-500"
//             />
//           </div>
//         </div>
//         <div className='flex mb-2'>
//           <div key='2' className='w-1/7 ml-2'>
//             <label htmlFor="batch">Lote</label>
//             <Field
//                 type="text"
//                 name="batch"
//                 id="batch"
//                 placeholder="Lote"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
//             />
//             <ErrorMessage
//               name="batch"
//               component="div"
//               className="text-red-500"
//             />
//           </div>

//           <div key='3' className='w-1/4 mr-2'>
//             <label htmlFor="initialQuantity">Cantidad inicial</label>
//             <Field
//                 type="number"
//                 name="initialQuantity"
//                 id="initialQuantity"
//                 placeholder="Cantidad inicial"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
//             />
//             <ErrorMessage
//               name="initialQuantity"
//               component="div"
//               className="text-red-500"
//             />
//           </div>
//           <div key='4' className='w-1/4 ml-2'>
//             <label htmlFor="entryDate">Fecha de entrada</label>
//             <Field
//                 type="date"
//                 name="entryDate"
//                 id="entryDate"
//                 placeholder="Fecha de entrada"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
//             />
//             <ErrorMessage
//               name="entryDate"
//               component="div"
//               className="text-red-500"
//             />
//           </div>
//           </div>
//         <div className='flex mb-2'>
//           <div key='5' className='w-1/4 mr-2'>
//             <label htmlFor="expirationDate">Fecha de caducidad</label>
//             <Field
//                 type="date"
//                 name="expirationDate"
//                 id="expirationDate"
//                 placeholder="Fecha de caducidad"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
//             />
//             <ErrorMessage
//               name="expirationDate"
//               component="div"
//               className="text-red-500"
//             />
//           </div>
//           <div className='flex mb-2'>
//           <div key='6' className='w-1/4 mr-2'>
//             <label htmlFor="actualQuantity">Cantidad actual</label>
//             <Field
//                 type="number"
//                 name="actualQuantity"
//                 id="actualQuantity"
//                 placeholder="Cantidad actual"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
//             />
//             <ErrorMessage
//               name="actualQuantity"
//               component="div"
//               className="text-red-500"
//             />
//           </div>
//           <div key='7' className='w-1/9 ml-2'>
//             <label htmlFor="supplyId">Id insumo</label>
//             <br />
//             <Field name="supplyId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5">
//               <option value="0">Seleccione un insumo</option>
//               {supplyOptions.map(option => (
//                 <option key={option.value} value={option.value}>{option.label}</option>
//               ))}
//             </Field>
//             <ErrorMessage
//               name="supplyId"
//               component="div"
//               className="text-red-500"
//             />
//           </div>
//           <div key='8' className='w-1/9 ml-2'>
//             <label htmlFor="providerId">Id proveedor</label>
//             <br />
//             <Field name="providerId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5">
//               <option value="0">Seleccione un proveedor</option>
//               {providerOptions.map(option => (
//                 <option key={option.value} value={option.value}>{option.label}</option>
                
//               ))}
//             </Field>
//             <ErrorMessage
//               name="providerId"
//               component="div"
//               className="text-red-500"
//             />
//           </div>
//           <div key='9' className='w-1/9 ml-2'>
//             <label htmlFor="warehouseId">Id bodega</label>
//             <br />
//             <Field name="warehouseId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5">
//               <option value="0">Seleccione una bodega</option>
//               {warehauseOptions.map(option =>  (
//                 <option key={option.value} value={option.value}>{option.label}</option>
//               ))}
//             </Field>
//             <ErrorMessage
//               name="warehouseId"
//               component="div"
//               className="text-red-500"
//             />
//           </div>
//         </div>
//         </div>
//         <div className="flex gap-5 grid-cols-5 mb-3">
//             <div key='10' className="w-1/4">
//               <label htmlFor="suppliesLabel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
//                 Etiqueta de insumo
//               </label>
//               {previewImage && <img src={previewImage} alt="Preview" width={100} height={100} />}
//               <input
//                 type="file"
//                 name="suppliesLabel"
//                 id="suppliesLabel"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
//                 placeholder="Etiqueta de insumo"
//                 onChange={event => {
//                   setFieldValue("suppliesLabel", event.target.files[0]);
//                   handleFileChange(event);
//                 }}
  
//               />
//             </div>
            
//             <div key='11' className="w-1/4">
//               <label htmlFor="securityFile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
//                 Ficha de seguridad
//               </label>
//               {previewImage && <img src={previewImage} alt="Preview" width={100} height={100} />}
//               <input
//                 type="file"
//                 name="securityFile"
//                 id="securityFile"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
//                 placeholder="Ficha de seguridad"
//                 onChange={event => {
//                   setFieldValue("securityFile", event.target.files[0]);
//                   handleFileChange(event);
//                 }}
  
//               />
//             </div>

//           </div>
//         <button
//           type="submit"
//           className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//         >
//           Crear loteo de insumo
//         </button>
//       </Form>
//       )}
//     </Formik>
//   )
// }

// export function CreateButtomSupplyDetails () {
//   // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
//   const dispatch = useDispatch()
//   const handleOpen = () => {
//     dispatch(setWidth({ width: '1500px' }))
//     dispatch(openModal({ title: 'Registrar lote de insumo' }))
//     dispatch(setAction({ action: 'creating' }))
//   }
//   // ?

//   return (
//     <button
//     className="flex items-center justify-center border border-gray-400 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
//     type="button"
//     onClick={() => handleOpen()}
//   >
//     <svg
//       className="h-3.5 w-3.5 mr-2"
//       fill="currentColor"
//       viewBox="0 0 20 20"
//       xmlns="http://www.w3.org/2000/svg"
//       aria-hidden="true"
//     >
//       <path
//         clipRule="evenodd"
//         fillRule="evenodd"
//         d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
//       />
//     </svg>
//     Registrar loteo de insumo
//   </button>
// )
// }

// export default CreateSupplyDetails
