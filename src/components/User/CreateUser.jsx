import { toast } from 'react-toastify'

import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'
import { useEffect, useState } from 'react' // Importar useState para mostrar los nombres
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import { usePostUserMutation } from '../../context/Api/Common'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import clientAxios from '../../config/clientAxios' // Importar clientAxios para poder hacer la consulta

const validationSchema = Yup.object().shape({
  names: Yup.string().required('Campo requerido'),
  surnames: Yup.string().required('Campo requerido'),
  typeDocumentId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un tipo de documento'),
  documentNumber: Yup.string('El campo solo puede tener numeros').min(6, 'Documento debe tener al menos 6 digitos').max(12, 'Documento no puede tener mas de 12 digitos').required('Campo requerido').matches(/^[0-9]+$/, 'El teléfono solo puede contener números'),
  phone: Yup.string('El campo solo puede tener numeros').min(10, 'Telefono debe ser de 10 digitos').max(10, 'Telefono debe ser de 10 digitos').required('Campo requerido').matches(/^[0-9]+$/, 'El teléfono solo puede contener números'),
  address: Yup.string().required('Campo requerido'),
  email: Yup.string().email().required('Campo requerido'),
  roleId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un rol'),
  passwordDigest: Yup.string().min(6, 'Contraseña debe ser de al menos 6 caracteres').max(12, 'Contraseña no puede tener mas de 12 caracteres').required('Campo requerido')
})

const getTypeDocuments = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/type_document').then(
      (result) => {
        const typeDocuments = result.data.map((type_document) => ({
          'label': type_document.name,
          'value': type_document.id
        }));
        resolve(typeDocuments);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const getRoles = async () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/role').then(
      (result) => {
        const roles = result.data.map((role) => ({
          'label': role.name,
          'value': role.id
        }));
        resolve(roles);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function CreateUser() {
  const [typeDocumentOptions, setTypeDocumentOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);

  const fetchOptions = () => {
    getTypeDocuments().then((options) => {
      setTypeDocumentOptions(options);
    });
    getRoles().then((options) => {
      setRoleOptions(options);
    });
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const dispatch = useDispatch()
  const [createUser, { error, isLoading }] = usePostUserMutation()

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />
    //if (error) return <Error type={error.status} message={error.error} />

    await createUser(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Usuario creado con exito')
  }

  const inputs = [
    {
      key: 0,
      name: 'names',
      title: 'Nombres',
      type: 'text',
      placeholder: 'Nombres del Usuario'
    },
    {
      key: 1,
      name: 'surnames',
      title: 'Apellidos',
      type: 'text',
      placeholder: 'Apellidos del Usuario'
    },
    {
      key: 2,
      name: 'typeDocumentId',
      title: 'Tipo de Documento',
      type: 'select',
      data: typeDocumentOptions,
      placeholder: 'Tipo de Documento del Usuario'
    },
    {
      key: 3,
      name: 'documentNumber',
      title: 'Numero de Documento',
      type: 'text',
      placeholder: 'Numero de Documento del Usuario'
    },
    {
      key: 4,
      name: 'phone',
      title: 'Telefono',
      type: 'text',
      placeholder: 'Telefono del Usuario'
    },
    {
      key: 5,
      name: 'address',
      title: 'Dirección',
      type: 'text',
      placeholder: 'Dirección del Usuario'
    },
    {
      key: 6,
      name: 'email',
      title: 'Correo Electronico',
      type: 'email',
      placeholder: 'Correo Electronico del Usuario'
    },
    {
      key: 7,
      name: 'roleId',
      title: 'Rol',
      type: 'select',
      data: roleOptions,
      placeholder: 'Rol del Usuario'
    },
    {
      key: 8,
      name: 'passwordDigest',
      title: 'Contraseña',
      type: 'password',
      placeholder: 'Contraseña del Usuario'
    }
  ]

  return (
    <Formik
      initialValues={{
        names: '',
        surnames: '',
        typeDocumentId: 0,
        documentNumber: '',
        phone: '',
        address: '',
        email: '',
        roleId: 0,
        passwordDigest: ''
      }}

      onSubmit={(values) => {
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
      <Form className="space-y-6">
        <div className='flex mb-2'>
          <div key='0' className='w-1/2 mr-2'>
            <label htmlFor="names">Nombres</label>
            <Field
                type="text"
                name="names"
                id="names"
                placeholder="Nombres del Usuario"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
            />
            <ErrorMessage
              name="names"
              component="div"
              className="text-red-500"
            />
          </div>
          <div key='1' className='w-1/2 ml-2'>
            <label htmlFor="names">Apellidos</label>
            <Field
                type="text"
                name="surnames"
                id="surnames"
                placeholder="Apellidos del Usuario"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
            />
            <ErrorMessage
              name="surnames"
              component="div"
              className="text-red-500"
            />
          </div>
        </div>
        <div className='flex mb-2'>
          <div key='2'>
            <label htmlFor="typeDocumentId">Tipo de Documento</label>
            <br />
            <Field name="typeDocumentId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5">
              <option value="0">Seleccione Tipo de Documento</option>
              {typeDocumentOptions.map(option => (
                <option value={option.value}>{option.label}</option>
              ))}
            </Field>
            <ErrorMessage
              name="typeDocumentId"
              component="div"
              className="text-red-500"
            />
          </div>
          <div key='3' className='w-1/2 ml-2'>
            <label htmlFor="documentNumber">Numero de Documento</label>
            <Field
                type="text"
                name="documentNumber"
                id="documentNumber"
                placeholder="Numero de Documento del Usuario"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
            />
            <ErrorMessage
              name="documentNumber"
              component="div"
              className="text-red-500"
            />
          </div>
        </div>
        <div className='flex mb-2'>
          <div key='4' className='w-1/2 mr-2'>
            <label htmlFor="phone">Telefono</label>
            <Field
                type="text"
                name="phone"
                id="phone"
                placeholder="Telefono del Usuario"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500"
            />
          </div>
          <div key='5' className='w-1/2 ml-2'>
            <label htmlFor="address">Dirección</label>
            <Field
                type="text"
                name="address"
                id="address"
                placeholder="Dirección del Usuario"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500"
            />
          </div>
        </div>
        <div className='flex mb-2'>
          <div key='6' className='w-1/2 mr-2'>
            <label htmlFor="email">Correo Electronico</label>
            <Field
                type="email"
                name="email"
                id="email"
                placeholder="Correo Electronico del Usuario"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
          </div>
          <div key='7' className='w-1/2 ml-2'>
            <label htmlFor="roleId">Rol</label>
            <br />
            <Field name="roleId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5">
              <option value="0">Seleccione Rol</option>
              {roleOptions.map(option => (
                <option value={option.value}>{option.label}</option>
              ))}
            </Field>
            <ErrorMessage
              name="roleId"
              component="div"
              className="text-red-500"
            />
          </div>
        </div>
        <div className='flex mb-2'>
          <div key='8' className='w-1/2'>
            <label htmlFor="passwordDigest">Contraseña</label>
            <Field
                type="password"
                name="passwordDigest"
                id="passwordDigest"
                placeholder="Contraseña del Usuario"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
            />
            <ErrorMessage
              name="passwordDigest"
              component="div"
              className="text-red-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Crear Usuario
        </button>
      </Form>
    </Formik>
  )
}

export function CreateButtomUser() {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: 'w-[2500]' }))
    dispatch(openModal({ title: 'Crear Usuario' }))
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
      Crear Usuario
    </button>
  )
}

export default CreateUser
