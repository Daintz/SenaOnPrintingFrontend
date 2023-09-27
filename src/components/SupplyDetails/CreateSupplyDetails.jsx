import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import clientAxios from '../../config/clientAxios'
import { usePostSupplyDetailsMutation} from '../../context/Api/Common'
import { useNavigate, Link } from 'react-router-dom'

const validationSchema = Yup.object().shape({
})

const getProviders = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/Provider').then(
      (result) => {
        const providers = result.data.map((provider) => ({
          'label': `${provider.nitCompany} - ${provider.nameCompany}`,
          'value': parseInt(provider.id)
        }))
        resolve(providers)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

const getWarehouses = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/Warehause').then(
      (result) => {
        const warehouses = result.data.map((warehouse) => ({
          'label': warehouse.ubication,
          'value': parseInt(warehouse.id)
        }))
        resolve(warehouses)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

const getUnitMeasures = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/UnitMesure').then(
      (result) => {
        const unit_measures = result.data.map((unit_measure) => ({
          'label': unit_measure.name,
          'value': parseInt(unit_measure.id)
        }))
        resolve(unit_measures)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

const getSupplies = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/Supply').then(
      (result) => {
        const supplies = result.data.map((supply) => ({
          'label': supply.name,
          'Cost': parseFloat(supply.averageCost),
          'value': parseInt(supply.id),
          'unitMeasures': supply.unitMeasuresXSupply.map((um) => ({ value: parseInt(um.id), label: um.name }))
        }))
        resolve(supplies)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

const initialValues = {

};



const CreateSupplyDetails = () => {
  const [providerOptions, setProviderOptions] = useState([])
  const [warehouseOptions, setWarehouseOptions] = useState([])
  const [unitMeasureOptions, setUnitMeasureOptions] = useState([])
  const [supplyOptions, setSupplyOptions] = useState([])
  const [createSupplyDetail, { error, isLoading }] = usePostSupplyDetailsMutation()
  const navigate = useNavigate();


  const onSubmit = async (values) => {
    const formData = new FormData();

    formData.append('description', values.description);
    formData.append('providerId', values.providerId);
    formData.append('entryDate', values.entryDate);

    values.buySuppliesDetails.forEach((detail, index) => {
      formData.append(`buySuppliesDetails[${index}].supplyId`, detail.supplyId);
      formData.append(`buySuppliesDetails[${index}].supplyCost`, detail.supplyCost);
      formData.append(`buySuppliesDetails[${index}].supplyQuantity`, detail.supplyQuantity);
      formData.append(`buySuppliesDetails[${index}].expirationDate`, detail.expirationDate);
      formData.append(`buySuppliesDetails[${index}].warehouseId`, detail.warehouseId);
      formData.append(`buySuppliesDetails[${index}].unitMeasuresId`, detail.unitMeasuresId);
      formData.append(`buySuppliesDetails[${index}].securityFileInfo`, detail.securityFileInfo);
    });
    if (isLoading) return <Spinner />

    const response = clientAxios.post('/buy_supplies', formData).then((response) => {
      return response.data
    }).then((resp) => {
      //alert(resp.message)
      toast.success('Compra creada con exito')
      navigate('/BuySupplies');
    }).catch((err) => {
      toast.error('Error al crear la compra')
    })
  };

  const fetchOptions = () => {
    getProviders().then((options) => {
      setProviderOptions(options)
    })
    getWarehouses().then((options) => {
      setWarehouseOptions(options)
    })
    getUnitMeasures().then((options) => {
      setUnitMeasureOptions(options)
    })
    getSupplies().then((options) => {
      setSupplyOptions(options)
    })
  }

  useEffect(() => {
    fetchOptions()
  }, []);

  return (
    <Formik
      initialValues={{
        description: '',
        providerId: 0,
        entryDate: '',
        buySuppliesDetails: [
          {
            supplyId: '',
            supplyCost: 0,
            supplyQuantity: 0,
            expirationDate: '',
            warehouseId: 0,
            securityFileInfo: null,
            unitMeasuresId: 0,
          },
        ],
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue }) => (
        <div className="relative bg-white py-10 px-20 shadow-2xl mdm:py-10 mdm:px-8">
          <div className="bg-white sm:rounded-lg overflow-hidden">
            <Form className="max-w-3xl mx-auto">
              <div className="flex mb-4">
                <div className="w-1/2 mr-2">
                  <label htmlFor="entryDate" className="block font-medium mb-1">
                    Fecha de la Compra
                  </label>
                  <div>
                    <Field
                      name="entryDate"
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-2">
                  <label htmlFor="providerId" className="block font-medium mb-1">
                    Proveedor
                  </label>
                  <Field name="providerId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5">
                    <option value="0">Seleccione un proveedor</option>
                    {providerOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
              <div className="mb-4">
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block font-medium mb-1">
                  Observaciones de la Compra
                </label>
                <Field
                  name="description"
                  type="textarea"
                  component="textarea"
                  row="5"
                  placeholder="Observaciones generales de la compra"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                />
              </div>

              <FieldArray name="buySuppliesDetails">
                {({ push, remove }) => (
                  <div>
                    <div className='flex justify-between'>
                    <button type="button" onClick={() => push(initialValues.buySuppliesDetails)} className="text-white bg-slate-500 hover:bg-custom-blue-lighter focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-auto mb-5">
                      Añadir Insumo
                    </button>

                    <button type="submit" className="text-white bg-custom-blue hover:bg-custom-blue-lighter focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-auto mb-5">
                      Crear Compra
                    </button>
                    </div>

                    {values.buySuppliesDetails.map((_, index) => (
                      <div key={index} className="border border-gray-300 rounded-md p-4 mb-4">
                        <div className='flex row justify-between'>
                          <h3 className="text-lg font-medium mb-2">Insumo {index + 1}</h3>
                          <button type="button" onClick={() => remove(index)} className="text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                            Eliminar Insumo
                          </button>
                        </div>
                        <div className="mb-4">
                          <label htmlFor={`buySuppliesDetails.${index}.supplyId`} className="block font-medium mb-1">
                            Insumo
                          </label>
                          <Field
                            name={`buySuppliesDetails.${index}.supplyId`}
                            as="select"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                          >
                            <option value="0">Seleccione un insumo</option>
                            {supplyOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className="mb-4">
                          <label htmlFor={`buySuppliesDetails.${index}.supplyQuantity`} className="block font-medium mb-1">
                            Cantidad
                          </label>
                          <Field
                            name={`buySuppliesDetails.${index}.supplyQuantity`}
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor={`buySuppliesDetails.${index}.unitMeasuresId`} className="block font-medium mb-1">
                            Unidad de Medida
                          </label>
                          <Field
                            name={`buySuppliesDetails.${index}.unitMeasuresId`}
                            as="select"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                          >
                            <option value="0">Seleccione una unidad</option>
                            {unitMeasureOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className="mb-4">
                          <label htmlFor={`buySuppliesDetails.${index}.supplyCost`} className="block font-medium mb-1">
                            Valor Unitario
                          </label>
                          <Field
                            name={`buySuppliesDetails.${index}.supplyCost`}
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor={`buySuppliesDetails.${index}.expirationDate`} className="block font-medium mb-1">
                            Fecha de Vencimiento
                          </label>
                          <Field
                            name={`buySuppliesDetails.${index}.expirationDate`}
                            type="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                          />
                        </div>

                        <div className="mb-4">
                          <label htmlFor={`buySuppliesDetails.${index}.warehouseId`} className="block font-medium mb-1">
                            Bodega
                          </label>
                          <Field name={`buySuppliesDetails.${index}.warehouseId`} as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5">
                            <option value="0">Seleccione una bodega</option>
                            {warehouseOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className="mb-4">
                          <label htmlFor={`buySuppliesDetails.${index}.securityFileInfo`} className="block font-medium mb-1">
                            Ficha de Seguridad
                          </label>
                          <input
                            type="file"
                            onChange={(event) => {
                              const file = event.target.files[0];
                              setFieldValue(`buySuppliesDetails.${index}.securityFileInfo`, file);
                            }}
                            multiple={false}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                          />
                        </div>
                      </div>
                    )).reverse()}

                  </div>
                )}
              </FieldArray>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export function CreateButtomSupplyDetails() {

  const handleOpen = () => {}
  return (

      <Link to="/BuySupplies/create">
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
          Crear Compra
        </button>
      </Link>

  );
}

export default CreateSupplyDetails;