import { usePutClientByIdMutation } from '../../context/Api/Common'
import {
  changeAction,
  closeModal,
  openEditing,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'

import clientAxios from '../../config/clientAxios'

async function checkEmailExistence (email) {
  try {
    const response = await clientAxios.get('/Client')
    const clients = response.data

    // Verificar si el correo electrónico ya existe en los clientes
    const emailExists = clients.some(client => client.email === email)

    return { exists: emailExists }
  } catch (error) {
    console.error('Error al verificar la existencia del correo electrónico:', error)
    // Manejar el error adecuadamente en tu aplicación
    return { exists: false }
  }
}

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3, 'El nombre debe tener como mínimo 3 letras').required('Campo requerido'),
  phone: Yup.string()
    .max(10, 'El teléfono no puede tener más de 10 dígitos')
    .required('Campo requerido')
    .matches(/^[0-9]+$/, 'El teléfono solo puede contener números'),
  email: Yup.string()
    .required('Campo requerido')
    .email('El email debe ser válido')
    .test('unique-email', 'El Correo ya está en uso', async function (value) {
      const { path, createError } = this
      const initialEmail = this.resolve(Yup.ref('initialEmail'))

      console.log('initialEmail:', initialEmail)

      if (value === initialEmail) {
        return true
      }

      const response = await checkEmailExistence(value)
      return !response.exists // Devuelve false si el nombre ya existe
    }),
  center: Yup.string()
    .min(3, 'El centro debe tener como mínimo 3 letras')
    .max(70, 'El centro debe tener como máximo 70 letras')
    .required('Campo requerido'),
  area: Yup.string()
    .min(3, 'El área debe tener como mínimo 3 letras')
    .max(70, 'El área debe tener como máximo 70 letras')
    .required('Campo requerido'),
  regional: Yup.string()
    .min(3, 'La regional debe tener como mínimo 3 letras')
    .max(70, 'La regional debe tener como máximo 70 letras')
    .required('Campo requerido')
})

function UpdateClient () {
  const dispatch = useDispatch()
  const { editingData } = useSelector((state) => state.modal)
  const [updateClient, { error, isLoading }] = usePutClientByIdMutation()
  const [initialEmail, setInitialEmail] = useState('')

  useEffect(() => {
    if (editingData && editingData.email) {
      setInitialEmail(editingData.email)
    }
  }, [editingData])

  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />
    await updateClient(values)

    dispatch(changeAction())
    dispatch(closeModal())
    toast.success('Cliente actualizado con éxito')
  }

  const inputs = [
    {
      key: 0,
      name: 'name',
      title: 'Nombre cliente',
      type: 'text',
      placeholder: 'Nombre'
    },
    {
      key: 1,
      name: 'phone',
      title: 'Teléfono cliente',
      type: 'text',
      placeholder: 'Teléfono'
    },
    {
      key: 2,
      name: 'email',
      title: 'Correo cliente',
      type: 'text',
      placeholder: 'Correo'
    },
    {
      key: 3,
      name: 'center',
      title: 'Centro cliente',
      type: 'text',
      placeholder: 'Centro'
    },
    {
      key: 4,
      name: 'area',
      title: 'Área cliente',
      type: 'text',
      placeholder: 'Área'
    },
    {
      key: 5,
      name: 'regional',
      title: 'Regional cliente',
      type: 'text',
      placeholder: 'Regional'
    }
  ]

  return (
    <Formik
      enableReinitialize
      initialValues={{
        id: editingData.id,
        name: editingData.name,
        phone: editingData.phone,
        email: editingData.email,
        center: editingData.center,
        area: editingData.area,
        regional: editingData.regional,
        initialEmail: editingData.email
      }}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
      <Form className="space-y-6">
        {inputs.map((input) => (
          <div key={input.key}>
            <label htmlFor={input.name}>{input.title}</label>
            <Field
              type={input.type}
              name={input.name}
              id={input.name}
              placeholder={input.placeholder}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            <ErrorMessage name={input.name} component="div" className="text-red-500" />
          </div>
        ))}
        <button
          type="submit"
          className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Actualizar cliente
        </button>
      </Form>
    </Formik>
  )
}

export function UpdateButtonClient ({ client }) {
  const dispatch = useDispatch()
  const handleEdit = (data) => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Editar cliente' }))
    dispatch(setAction({ action: 'editing' }))
    dispatch(openEditing({ editingData: data }))
  }

  return (
    <button type="button" onClick={() => handleEdit(client)}>
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

export default UpdateClient