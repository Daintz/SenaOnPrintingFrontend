import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostWarehauseMutation } from '../../context/Api/Common'
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

/* const validationSchema = Yup.object().shape({
  warehouseTypeId: Yup.string().required('Campo requerido'),
  name: Yup.string().required('Campo requerido'),
  ubication: Yup.string().required('Campo requerido')
}) */
const validationSchema = Yup.object().shape({
  ubication: Yup.string().required('Campo requerido'),
  typeServiceId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un tipo de boega'),
})

const getTypeService = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/TypeServices').then(
      (result) => {
        const TypeService = result.data.map((typeServiceId) => ({
          'label': typeServiceId.name,
          'value': typeServiceId.id
        }));
        resolve(TypeService);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

function CreateWarehause() {
  const [typeServiceIdOptions, settypeServiceIdOptions] = useState([]);
  const fetchOptions = () => {
    getTypeService().then((options) => {
      settypeServiceIdOptions(options);
    });
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const dispatch = useDispatch()
  const [createWarehause, { error, isLoading }] = usePostWarehauseMutation()

  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    await createWarehause(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Bodega creada con exito')
  }

  const inputs = [
    {
      key: 1,
      name: 'typeServiceId',
      title: 'Tipo de bodega',
      type: 'select',
      data: typeServiceIdOptions,
      placeholder: 'Tipo de de bodega'
    },

    {
      key: 2,
      name: 'ubication',
      title: 'Ubicación',
      type: 'text',
      placeholder: 'Ubicacion de la bodega'
    }
  ]

  return (
    <Formik
      initialValues={{
        typeServiceId: '',
        ubication: ''
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
        })}
        <button
          type="submit"
          className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:bg-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Registrar Bodega
        </button>
      </Form>
    </Formik>
  )
}

export function CreateButtomWarehause() {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Registrar Bodega' }))
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
      Registrar Bodega
    </button>
  )
}

export default CreateWarehause
