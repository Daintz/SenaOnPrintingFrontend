import { usePutUserByIdMutation } from '../../context/Api/Common'
import { changeAction, closeModal, openEditing, openModal, setAction, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import clientAxios from '../../config/clientAxios'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  surnames: Yup.string().required('Campo requerido'),
  typeDocumentId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un tipo de documento'),
  documentNumber: Yup.number().min(6, 'Documento debe tener al menos 6 digitos').max(12, 'Documento no puede tener mas de 12 digitos').required('Campo requerido'),
  phone: Yup.number().min(10, 'Telefono debe ser de 10 digitos').max(10, 'Telefono debe ser de 10 digitos').required('Campo requerido'),
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

function UpdateUser () {
  const dispatch = useDispatch()
  const { editingData } = useSelector((state) => state.modal)
  const [updateUser, { error, isLoading }] = usePutUserByIdMutation()
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


  const handleSubmit = async values => {
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />
    await updateUser(values)

    dispatch(changeAction())
    dispatch(closeModal())
    toast.success('Usuario actualizado con exito')
  }

  const inputs = [
    { key: 0, name: 'names', title: 'Nombres', type: 'text', placeholder: 'Nombres del Usuario' },
    { key: 1, name: 'surnames', title: 'Apellidos', type: 'text', placeholder: 'Apellidos del Usuario' },
    { key: 2, name: 'typeDocumentId', title: 'Tipo de Documento', type: 'select', data: typeDocumentOptions, placeholder: 'Tipo de Documento del Usuario' },
    { key: 3, name: 'documentNumber', title: 'Numero de Documento', type: 'number', placeholder: 'Numero de Documento del Usuario' },
    { key: 4, name: 'phone', title: 'Telefono', type: 'number', placeholder: 'Telefono del Usuario' },
    { key: 5, name: 'address', title: 'Dirección', type: 'text', placeholder: 'Dirección del Usuario' },
    { key: 6, name: 'email', title: 'Correo Electronico', type: 'email', placeholder: 'Correo Electronico del Usuario' },
    { key: 7, name: 'roleId', title: 'Rol', type: 'select', data: roleOptions, placeholder: 'Rol del Usuario' },
    { key: 8, name: 'passwordDigest', title: 'Contraseña', type: 'password', placeholder: 'Contraseña del Usuario' }
  ]

  return (
    <Formik
      initialValues={{
        id: editingData.id,
        names: editingData.names,
        surnames: editingData.surnames,
        typeDocumentId: editingData.typeDocumentId,
        documentNumber: editingData.documentNumber,
        phone: editingData.phone,
        address: editingData.address,
        email: editingData.email,
        roleId: editingData.roleId,
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
            Actualizar Usuario
          </button>
        </Form>
    </Formik>
  )
}

export function UpdateButtomUser ({ user }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleEdit = (data) => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Editar Usuario' }))
    dispatch(setAction({ action: 'editing' }))
    dispatch(openEditing({ editingData: data }))
  }
  // ?

  return (
    <button type="button" onClick={() => {
      handleEdit(user)
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

export default UpdateUser
