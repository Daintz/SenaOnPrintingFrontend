import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import Select from 'react-select';
import { usePostSupplyMutation } from '../../context/Api/Common'
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
  name: Yup.string().required('Campo requerido'),
  dangerIndicators: Yup.string().required('Campo requerido'),
  useInstructions: Yup.string().required('Campo requerido'),
  advices: Yup.string().required('Campo requerido'),
  supplyType: Yup.number().required('Campo requerido'),
  sortingWord: Yup.number().required('Campo requerido'),
  quantity: Yup.number().required('Campo requerido'),
  averageCost: Yup.number().required('Campo requerido'),
})
//UnitMesure
const getUnitMesure = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/UnitMesure').then(
      (result) => {
        const UnitMesure = result.data.map((unitMeasuresId) => ({
          'label': unitMeasuresId.name,
          'value': unitMeasuresId.id
        }));
        resolve(UnitMesure);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const getSupplyPictograms = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/SupplyPictogrmas').then(
      (result) => {
        const SupplyPictogram = result.data.map((supplypictogram) => ({
          'label': supplypictogram.name,
          'value': supplypictogram.id
        }));
        resolve(SupplyPictogram);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const getSupplyCategories = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/SupplyCategory').then(
      (result) => {
        const SupplyCategory = result.data.map((supplyCategory) => ({
          'label': supplyCategory.name,
          'value': supplyCategory.id
        }));
        resolve(SupplyCategory);
      },
      (error) => {
        reject(error);
      }
    );
  });
};



function CreateSupply() {
  const [unitMeasuresIdOptions, setunitmeaSuresIdOptions] = useState([]);
  const [SupplyPictogramsIdOptions, setSupplyPictogramsIdOptions] = useState([]);
  const [supplyCategoriesIdOptions, setsupplyCategoriesIdOptions] = useState([]);

  // Add state variables for selected options
  const [selectedUnitMeasures, setSelectedUnitMeasures] = useState([]);
  const [selectedSupplyPictograms, setSelectedSupplyPictograms] = useState([]);
  const [selectedSupplyCategories, setSelectedSupplyCategories] = useState([]);



  const fetchOptions = () => {
    getUnitMesure().then((options) => {
      setunitmeaSuresIdOptions(options);
      setSelectedUnitMeasures([]); // Clear selected options
    });
    getSupplyPictograms().then((options) => {
      setSupplyPictogramsIdOptions(options);
      setSelectedSupplyPictograms([]); // Clear selected options
    });
    getSupplyCategories().then((options) => {
      setsupplyCategoriesIdOptions(options);
      setSelectedSupplyCategories([]); // Clear selected options
    });
  };



  useEffect(() => {
    fetchOptions();
  }, []);



  const dispatch = useDispatch()
  const [createsupply, { error, isLoading }] = usePostSupplyMutation()

  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    // if (values.sortingWord === 1) {
    //   values.sortingWord = ' Peligro'
    // } else if (values.sortingWord === 2) {
    //   values.sortingWord = ' Atención'
    // }
    // if (values.supplyType === 1) {
    //   values.supplyType = ' Devolutivo'
    // } else if (values.supplyType === 2) {
    //   values.supplyType = ' Consumible'
    // }

    await createsupply(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Insumo creado con exito', {
      autoClose: 1000

    })
  }




  return (
    
    <Formik
    
      initialValues={{
        name: '',
        dangerIndicators: '',
        useInstructions: '',
        advices: '',
        supplyType: 1,
        sortingWord: 1,
        quantity: 0,
        averageCost: 0,
        statedAt: true,
        unitMeasuresId: [],
        supplyPictogramsId: [],
        supplyCategoriesId: []

      }}
      onSubmit={(values) => {
        console.log(values)
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue }) => (
      <Form>

        <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-1/4">
            <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Nombre
            </label>
            <Field
              type="text"
              name="name"
              id="Nombre"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
              placeholder="Nombre"
            />
            <ErrorMessage
              name="name"

              component="div"
              className="text-red-500"
            />

          </div>
          <div className="w-2/4">
            <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Indicadores de peligro
            </label>
            <Field
              type="text"
              name="dangerIndicators"
              id="dangerIndicators"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
              rows="6" cols="40"
              placeholder="Indicadores de peligro"
            />
            <ErrorMessage
              name="dangerIndicators"

              component="div"
              className="text-red-500"
            />


          </div>
          <div className="w-1/2">
            <label htmlFor="campo2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Instrucciones
            </label>
            <Field
              type="text"
              name="useInstructions"
              id="useInstructions"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
              placeholder="Instrucciones"
            />
            <ErrorMessage
              name="useInstructions"

              component="div"
              className="text-red-500"
            />

          </div>
        </div>

        <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-1/2">
            <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Consejos
            </label>
            <Field
              type="text"
              name="advices"
              id="advices"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
              placeholder="Consejos"
            />
            <ErrorMessage
              name="advices"

              component="div"
              className="text-red-500"
            />

          </div>
          <div className="w-1/4">
            <label htmlFor="supplyType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Tipo insumo
            </label>
            <Field
              as="select"
              name="supplyType"
              id="supplyType"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
            >
              <option value={1}>Devolutivo</option>
              <option value={2}>Consumible</option>
            </Field>
            <ErrorMessage
              name="supplyType"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="w-1/4">
            <label htmlFor="sortingWord" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Tipo de peligrosidad
            </label>
            <Field
              as="select"
              name="sortingWord"
              id="sortingWord"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
            >
              <option value={1}>Peligro</option>
              <option value={2}>Atención</option>
            </Field>
            <ErrorMessage
              name="sortingWord"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="w-1/8">
            <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Cantidad
            </label>
            <Field
              type="number"
              name="quantity"
              id="quantity"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
              placeholder="Cantidad"
            />
            <ErrorMessage
              name="quantity"

              component="div"
              className="text-red-500"
            />

          </div>
          <div className="w-1/7">
            <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Costo promedio
            </label>
            <Field
              type="number"
              name="averageCost"
              id="averageCost"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
              placeholder="Costo promedio"
            />
            <ErrorMessage
              name="averageCost"

              component="div"
              className="text-red-500"
            />

          </div>
        </div>
        <div className="flex gap-5 grid-cols-5 mb-3">
        <div className="w-2/4">
          <label htmlFor="unitMeasuresId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Unidad de medida
          </label>
          <Field name="unitMeasuresId">
            {({ field }) => (
              <Select
                {...field}
                options={unitMeasuresIdOptions}
                isMulti
                value={selectedUnitMeasures}
                onChange={(selectedOptions) =>{
                  setSelectedUnitMeasures(selectedOptions);
                  setFieldValue(
                    "unitMeasuresId",
                    selectedOptions.map((option) => option.value)
                  );
                }}
              />
            )}
          </Field>
        </div>
        
        <div className="w-2/4">
          <label htmlFor="supplyPictogramsId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Pictogramas de insumo
          </label>
          <Field name="supplyPictogramsId">
            {({ field }) => (
              <Select
                {...field}
                options={SupplyPictogramsIdOptions}
                isMulti
                value={selectedSupplyPictograms}
                onChange={(selectedOptions) => {
                  setSelectedSupplyPictograms(selectedOptions);
                  setFieldValue(
                    "supplyPictogramsId",
                    selectedOptions.map((option) => option.value)
                  );
                }}
              />
            )}
          </Field>
        </div>

        <div className="w-2/4">
          <label htmlFor="supplyCategoriesId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Categorías de insumo
          </label>
          <Field name="supplyCategoriesId">
            {({ field }) => (
              <Select
                {...field}
                options={supplyCategoriesIdOptions}
                isMulti
                value={selectedSupplyCategories}
                onChange={(selectedOptions) => {
                  setSelectedSupplyCategories(selectedOptions);
                  setFieldValue(
                    "supplyCategoriesId",
                    selectedOptions.map((option) => option.value)
                  );
                }}
              />
            )}
            </Field>
        </div>
        </div>
        <button
          type="submit"
          className="col-span-3 w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Crear Insumo
        </button>


      </Form>
      )}
    </Formik>
  )
}

export function CreateButtomSupply() {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '-[1500px]' }))
    dispatch(openModal({ title: 'Crear Insumo' }))
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
      Crear Insumo
    </button>
  )
}

export default CreateSupply
