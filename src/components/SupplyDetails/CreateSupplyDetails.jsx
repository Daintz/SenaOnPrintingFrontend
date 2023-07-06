import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
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
import clientAxios from '../../config/clientAxios'

const validationSchema = Yup.object().shape({
  description: Yup.string().required('Campo requerido'),
  supplyCost: Yup.number().required('Campo requerido'),
  batch: Yup.string().required('Campo requerido'),
  initialQuantity: Yup.number().required('Campo requerido'),
  entryDate: Yup.date().required('Campo requerido'),
  expirationDate: Yup.date().required('Campo requerido'),
  actualQuantity: Yup.number().required('Campo requerido'),
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

function CreateSupplyDetails () {
  const [supplyOptions, setSupplyOptions] = useState([]);
  const [providerOptions, setProviderOptions] = useState([]);
  const [warehauseOptions, setWarehauseOptions] = useState([]);

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

  const dispatch = useDispatch()
  const [createSupplyDetails, { error, isLoading }] = usePostSupplyDetailsMutation()

  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    await createSupplyDetails(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Loteo de insumo creado con exito')
  }

  const inputs = [
    {
      key: 0,
      name: 'description',
      title: 'Descripción',
      type: 'text',
      placeholder: 'Descripción'
    },
    
    {
      key: 1,
      name: 'supplyCost',
      title: 'Costo insumo',
      type: 'number',
      placeholder: 'Costo insumo'
    },

    {
      key: 2,
      name: 'batch',
      title: 'Lote',
      type: 'text',
      placeholder: 'Lote'
    },
    {
      key: 3,
      name: 'initialQuantity',
      title: 'Cantidad inicial',
      type: 'number',
      placeholder: 'Cantidad inicial'
    },
    {
      key: 4,
      name: 'entryDate',
      title: 'Fecha de entrada',
      type: 'date',
      placeholder: 'Fecha de entrada'
    },
    {
      key: 5,
      name: 'expirationDate',
      title: 'Fecha de caducidad',
      type: 'date',
      placeholder: 'Fecha de caducidad'
    },
    {
      key: 6,
      name: 'actualQuantity',
      title: 'Cantidad actual',
      type: 'number',
      placeholder: 'Cantidad actual'
    },
    {
      key: 7,
      name: 'supplyId',
      title: 'Id insumo',
      type: 'select',
      data: supplyOptions,
      placeholder: 'Id insumo'
    },
    {
      key: 8,
      name: 'providerId',
      title: 'Id proveedor',
      type: 'select',
      data: providerOptions,
      placeholder: 'Id proveedor'
    },
    {
      key: 9,
      name: 'warehouseId',
      title: 'Id bodega',
      type: 'select',
      data: warehauseOptions,
      placeholder: 'Id bodega'
    },

  ]

  return (
    <Formik
      initialValues={{
        description: '',
        supplyCost: 0,
        batch: '',
        initialQuantity: 0,
        entryDate: 0,
        expirationDate: 0,
        actualQuantity: 0,
        supplyId: 1,
        providerId: 1,
        warehouseId:1
      }}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
      <Form className="space-y-6">
        <div className='flex mb-2'>
          <div key='0' className='w-1/2 mr-2'>
            <label htmlFor="description">Descripción</label>
            <Field
                type="text"
                name="description"
                id="description"
                placeholder="Descripción"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500"
            />
          </div>
          <div key='1' className='w-1/4 ml-2'>
            <label htmlFor="supplyCost">Costo insumo</label>
            <Field
                type="number"
                name="supplyCost"
                id="supplyCost"
                placeholder="Costo insumo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            <ErrorMessage
              name="supplyCost"
              component="div"
              className="text-red-500"
            />
          </div>
        </div>
        <div className='flex mb-2'>
          <div key='2' className='w-1/7 ml-2'>
            <label htmlFor="batch">Lote</label>
            <Field
                type="text"
                name="batch"
                id="batch"
                placeholder="Lote"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            <ErrorMessage
              name="batch"
              component="div"
              className="text-red-500"
            />
          </div>

          <div key='3' className='w-1/4 mr-2'>
            <label htmlFor="initialQuantity">Cantidad inicial</label>
            <Field
                type="number"
                name="initialQuantity"
                id="initialQuantity"
                placeholder="Cantidad inicial"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            <ErrorMessage
              name="initialQuantity"
              component="div"
              className="text-red-500"
            />
          </div>
          <div key='4' className='w-1/4 ml-2'>
            <label htmlFor="entryDate">Fecha de entrada</label>
            <Field
                type="date"
                name="entryDate"
                id="entryDate"
                placeholder="Fecha de entrada"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            <ErrorMessage
              name="entryDate"
              component="div"
              className="text-red-500"
            />
          </div>
          </div>
        <div className='flex mb-2'>
          <div key='5' className='w-1/4 mr-2'>
            <label htmlFor="expirationDate">Fecha de caducidad</label>
            <Field
                type="date"
                name="expirationDate"
                id="expirationDate"
                placeholder="Fecha de caducidad"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            <ErrorMessage
              name="expirationDate"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className='flex mb-2'>
          <div key='6' className='w-1/4 mr-2'>
            <label htmlFor="actualQuantity">Cantidad actual</label>
            <Field
                type="number"
                name="actualQuantity"
                id="actualQuantity"
                placeholder="Cantidad actual"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            <ErrorMessage
              name="actualQuantity"
              component="div"
              className="text-red-500"
            />
          </div>
          <div key='7' className='w-1/9 ml-2'>
            <label htmlFor="supplyId">Id insumo</label>
            <br />
            <Field name="supplyId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
              <option value="0">Seleccione un insumo</option>
              {supplyOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Field>
            <ErrorMessage
              name="supplyId"
              component="div"
              className="text-red-500"
            />
          </div>
          <div key='8' className='w-1/9 ml-2'>
            <label htmlFor="providerId">Id proveedor</label>
            <br />
            <Field name="providerId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
              <option value="0">Seleccione un proveedor</option>
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
          <div key='9' className='w-1/9 ml-2'>
            <label htmlFor="warehouseId">Id bodega</label>
            <br />
            <Field name="warehouseId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
              <option value="0">Seleccione una bodega</option>
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
        <button
          type="submit"
          className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Crear loteo de insumo
        </button>
      </Form>
    </Formik>
  )
}

export function CreateButtomSupplyDetails () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Registrar lote de insumo' }))
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
      Registrar Loteo de insumo
    </button>
  )
}

export default CreateSupplyDetails
