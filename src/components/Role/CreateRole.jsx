import { toast } from 'react-toastify'
import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import { usePostRoleMutation } from '../../context/Api/Common'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  description: Yup.string().required('Campo requerido'),
  permissionIds: Yup.array().min(1, 'Seleccione un permiso')
})

function CreateRole() {
  const dispatch = useDispatch()
  const [createRole, { error, isLoading }] = usePostRoleMutation()

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />

    await createRole(values)

    console.log(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Rol creado con exito')
  }
  const permissions = [{ label: "Configuración", value: 1 }, { label: "Usuarios", value: 2 }, { label: "Bodega", value: 3 }, { label: "Insumos", value: 4 }, { label: "Proveedores", value: 5 }, { label: "Clientes", value: 6 }, { label: "Producción", value: 7 }];
  const inputs = [
    {
      key: 0,
      name: 'name',
      title: 'Nombre',
      type: 'text',
      placeholder: 'Nombre del Rol'
    },
    {
      key: 1,
      name: 'description',
      title: 'Descripción',
      type: 'text',
      placeholder: 'Descripción del Rol'
    }
  ]

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        permissionIds: []
      }}
      onSubmit={(values) => {
        console.log(values)
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
      <Form className="space-y-6">
        {inputs.map(input => (
          <div key={input.key}>
            <label htmlFor={input.name}>{input.title}</label>
            <Field
              type={input.type}
              name={input.name}
              id={input.name}
              placeholder={input.placeholder}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
            />
            <ErrorMessage
              name={input.name}
              component="div"
              className="text-red-500"
            />
          </div>
        ))}
        <div id="permissionIds" className="title">Lista de Permisos:</div>
        <div id="permissions_container">
          <FieldArray
            name="permissionIds"
            render={arrayHelper => (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }} role="group" aria-labelledby="permissionIds">
                {permissions.map((option, index) => (
                  <label key={`permission${index}`} className='ml-5'>
                    <input
                      className='mr-2'
                      type="checkbox"
                      onChange={e => {
                        if (e.target.checked) arrayHelper.push(option.value);
                        else {
                          const idx = arrayHelper.form.values.permissionIds.indexOf(option.value);
                          arrayHelper.remove(idx);
                        }
                        console.log(arrayHelper.form.values.permissionIds)
                      }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            )}
          />
          <ErrorMessage
              name={"permissionIds"}
              component="div"
              className="text-red-500"
            />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Crear Rol
        </button>
      </Form>
    </Formik>
  )
}

export function CreateButtomRole() {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Crear Rol' }))
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
      Crear Rol
    </button>
  )
}

export default CreateRole
