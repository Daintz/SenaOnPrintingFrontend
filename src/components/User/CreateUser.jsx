import { toast } from 'react-toastify'
import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import { usePostUserMutation } from '../../context/Api/Common'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import clientAxios from '../../config/clientAxios'

async function checkEmailExistence (email) {
  try {
    const response = await clientAxios.get('/user')
    const users = response.data
    const emailExists = users.some(user => user.email === email)

    return { exists: emailExists }
  } catch (error) {
    console.error('Error al verificar la existencia del correo:', error)
    return { exists: false }
  }
}

async function checkDocumentExistence (document) {
  try {
    const response = await clientAxios.get('/user')
    const users = response.data
    const documentExists = users.some(user => user.documentNumber === document)

    return { exists: documentExists }
  } catch (error) {
    console.error('Error al verificar la existencia del numero de documento:', error)
    return { exists: false }
  }
}


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  surnames: Yup.string().required('Campo requerido'),
  typeDocumentId: Yup.number().required('Campo requerido').lessThan(0, 'Debe elegir un tipo de documento'),
  documentNumber: Yup.number().min(6, 'Documento debe tener al menos 6 digitos').max(12, 'Documento no puede tener mas de 12 digitos').required('Campo requerido').test('unique-document', 'El documento ya está en uso', async function (value) {
    const response = await checkDocumentExistence(value)
    return !response.exists // Devuelve false si el nombre ya existe
  }),
  phone: Yup.number().min(10, 'Telefono debe ser de 10 digitos').max(10, 'Telefono debe ser de 10 digitos').required('Campo requerido'),
  address: Yup.string().required('Campo requerido'),
  email: Yup.string().email("El correo no tiene el formato adecuado").required('Campo requerido').test('unique-email', 'El correo ya está en uso', async function (value) {
    const response = await checkEmailExistence(value)
    return !response.exists // Devuelve false si el nombre ya existe
  }),
  roleId: Yup.number().required('Campo requerido').lessThan(0, 'Debe elegir un rol'),
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
      name: 'name',
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
      type: 'number',
      placeholder: 'Numero de Documento del Usuario'
    },
    {
      key: 4,
      name: 'phone',
      title: 'Telefono',
      type: 'number',
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
        name: '',
        surnames: '',
        typeDocumentId: 0,
        documentNumber: 0,
        phone: 0,
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
          className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Crear Usuario' }))
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
      Crear Usuario
    </button>
  )
}

export default CreateUser
