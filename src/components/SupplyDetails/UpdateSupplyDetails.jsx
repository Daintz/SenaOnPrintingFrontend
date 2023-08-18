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
  description: Yup.string().required('Campo requerido'),
  supplyCost: Yup.number().required('Campo requerido'),
  batch: Yup.string().required('Campo requerido'),
  entryDate: Yup.date().required('Campo requerido').test('entryDateValidation', 'La fecha de entrada no puede ser anterior a la fecha actual', function (value) {
    const currentDate = new Date();
    return new Date(value) >= currentDate;
  }),
  expirationDate: Yup.date().required('Campo requerido'),
  // actualQuantity: Yup.number().required('Campo requerido'),
  supplyId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un insumo'),
  providerId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un proveedor'),
  warehouseId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir una bodega')
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
    { key: 0, name: 'description', title: 'Descripcion', type: 'text', placeholder: 'Descripcion' },
    { key: 1, name: 'supplyCost', title: 'Costo insumo', type: 'number', placeholder: 'Costo insumo' },
    { key: 2, name: 'batch', title: 'Lote', type: 'text', placeholder: 'Lote' },
    { key: 3, name: 'entryDate', title: 'Fecha de entrada', type: 'date', placeholder: 'Fecha de entrada' },
    { key: 4, name: 'expirationDate', title: 'Fecha de caducidad', type: 'date', placeholder: 'Fecha de caducidad' },
    // { key: 6, name: 'actualQuantity', title: 'Cantidad actual', type: 'number', placeholder: 'Cantidad actual' },
    { key: 5, name: 'supplyId', title: 'Id insumo', type: 'select', data: supplyOptions, placeholder: 'Id insumo' },
    { key: 6, name: 'providerId', title: 'Id proveedor', type: 'select', data: providerOptions, placeholder: 'Id proveedor' },
    { key: 7, name: 'warehouseId', title: 'Id bodega', type: 'select', data: warehauseOptions, placeholder: 'Id bodega' }
  ]

  return (
    <Formik
      initialValues={{
        id: editingData.id,
        description: editingData.description,
        supplyCost: editingData.supplyCost,
        batch: editingData.batch,
        entryDate: editingData.entryDate ? new Date(editingData.entryDate).toISOString().split('T')[0] : '',
        expirationDate: editingData.expirationDate ? new Date(editingData.expirationDate).toISOString().split('T')[0] : '',
        // actualQuantity: editingData.actualQuantity,
        supplyId: editingData.supplyId,
        providerId: editingData.providerId,
        warehouseId: editingData.warehouseId,
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
          <div key='2' className='w-1/7 ml-2'>
            <label htmlFor="batch">Lote</label>
            <Field
                type="text"
                name="batch"
                id="batch"
                placeholder="Lote"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
            />
            <ErrorMessage
              name="batch"
              component="div"
              className="text-red-500"
            />
          </div>
{/* 
          <div key='3' className='w-1/4 mr-2'>
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
          <div key='3' className='w-1/4 ml-2'>
          <label htmlFor="entryDate">Fecha de entrada</label>
          <Field
            type="date"
            name="entryDate"
            id="entryDate"
            placeholder="Fecha de entrada"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
            
          />
          <ErrorMessage
            name="entryDate"
            component="div"
            className="text-red-500"
          />
        </div>
          </div>
        <div className='flex mb-2'>
        <div key='4' className='w-1/4 ml-2'>
          <label htmlFor="expirationDate">Fecha de caducidad</label>
          <Field
            type="date"
            name="expirationDate"
            id="expirationDate"
            placeholder="Fecha de caducidad"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
            
          />
          <ErrorMessage
            name="expirationDate"
            component="div"
            className="text-red-500"
          />
        </div>
          <div className='flex mb-2'>

          <div key='5' className='w-1/9 ml-2'>
            <label htmlFor="supplyId">Insumo</label>
            <br />
            <Field name="supplyId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5">
              <option value="0">Seleccione un insumo</option>
              {supplyOptions.map(option => (
                <option value={option.value}>{option.label}</option>
              ))}
            </Field>
            <ErrorMessage
              name="supplyId"
              component="div"
              className="text-red-500"
            />
          </div>
          <div key='6' className='w-1/9 ml-2'>
            <label htmlFor="providerId">Proveedor</label>
            <br />
            <Field name="providerId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5">
              <option value="0">Seleccione un proveedor</option>
              {providerOptions.map(option => (
                <option value={option.value}>{option.label}</option>
              ))}
            </Field>
            <ErrorMessage
              name="providerId"
              component="div"
              className="text-red-500"
            />
          </div>
          <div key='7' className='w-1/9 ml-2'>
            <label htmlFor="warehouseId">Bodega</label>
            <br />
            <Field name="warehouseId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5">
              <option value="0">Seleccione una bodega</option>
              {warehauseOptions.map(option => (
                <option value={option.value}>{option.label}</option>
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
          className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Actualizar compra de insumo
        </button>
      </Form>
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
