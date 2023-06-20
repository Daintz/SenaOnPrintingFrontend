import { usePutGrammageCaliberByIdMutation } from '../../context/Api/Common'
import { changeAction, closeModal, openEditing, openModal, setAction, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik'
import { toast } from 'react-toastify'
import clientAxios from '../../config/clientAxios'
import React, { useEffect, useState } from 'react'

async function checkNameExistence (name) {
  try {
    const response = await clientAxios.get('/GrammageCaliber')
    const grammage = response.data
    const nameExists = grammage.some(grammage => grammage.name === name)

    return { exists: nameExists }
  } catch (error) {
    console.error('Error al verificar la existencia del nombre:', error)
    return { exists: false }
  }
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Campo requerido')
    .max(15, 'El gramaje y/o calibre no puede tener más de 15 letras/dígitos')
    .test('unique-name', 'El Gramaje y/o calibre ya está en uso', async function (value) {
      const { path, createError } = this
      const initialName = this.resolve(Yup.ref('initialName'))

      console.log('initialName:', initialName) // Agrega este console.log para verificar el valor de initialName

      if (value === initialName) {
        // Si el valor es igual al valor inicial, se considera válido y no se realiza la verificación de existencia
        return true
      }

      const response = await checkNameExistence(value)
      return !response.exists // Devuelve false si el nombre ya existe
    }),
  type: Yup.string()
    .required('Campo requerido')
    .min(5, 'El tipo no puede tener menos de 5 letras')
    .max(10, 'El tipo no puede tener más de 10 letras/dígitos')
})

function UpdateGrammageCaliber() {
  const dispatch = useDispatch()
  const { editingData } = useSelector((state) => state.modal)
  const [updateGrammageCaliber, { error, isLoading }] = usePutGrammageCaliberByIdMutation()
  const [initialName, setInitialName] = useState('')

  useEffect(() => {
    if (editingData) {
      setInitialName(editingData.name)
    }
  }, [editingData])

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />

    await updateGrammageCaliber(values)

    dispatch(changeAction())
    dispatch(closeModal())
    toast.success('Gramaje y/o calibre actualizado con éxito')
  }

  const inputs = [
    {
      key: 0,
      name: 'type',
      title: 'Tipo',
      type: 'text',
      placeholder: 'Tipo'
    },
    {
      key: 1,
      name: 'name',
      title: 'Gramaje',
      type: 'text',
      placeholder: 'Gramaje'
    }
  ]

  return (
    <Formik
      enableReinitialize
      initialValues={{
        id: editingData.id,
        type: editingData.type,
        name: editingData.name,
        initialName: editingData.name
      }}
      onSubmit={(values) => {
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            />
            <ErrorMessage
              name={input.name}
              component="div"
              className="text-red-500"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Actualizar gramaje y/o calibre
        </button>
      </Form>
    </Formik>
  )
}

export function UpdateButtonGrammageCaliber ({ grammageCaliber }) {
  const dispatch = useDispatch()

  const handleEdit = (data) => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Editar gramaje y/o calibre' }))
    dispatch(setAction({ action: 'editing' }))
    dispatch(openEditing({ editingData: data, initialName: data.name }))
  }

  return (
    <button type="button" onClick={() => handleEdit(grammageCaliber)}>
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

export default UpdateGrammageCaliber
