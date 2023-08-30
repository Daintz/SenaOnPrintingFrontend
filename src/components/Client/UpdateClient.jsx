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
import Select from 'react-select'
const regionalAreas = {
  'REGIONAL AMAZONAS': ['LETICIA'],
  'REGIONAL ANTIOQUIA': ['CALDAS', 'EL BAGRE', 'ITAGUI', 'MEDELLIN', 'CAUCASIA', 'PUERTO BERRIO', 'RIONEGRO', 'URABA'],
  'REGIONAL ARAUCA': ['ARAUCA'],
  'REGIONAL ATLANTICO': ['BARRANQUILLA', 'SABANALARGA'],
  'REGIONAL BOLIVAR': ['CARTAGENA'],
  'REGIONAL BOYACA': ['DUITAMA', 'TUNJA', 'MORCA', 'SOGAMOSO'],
  'REGIONAL CALDAS': ['LA DORADA', 'MANIZALES'],
  'REGIONAL CAQUETA': ['FLORENCIA'],
  'REGIONAL CASANARE': ['YOPAL'],
  'REGIONAL CAUCA': ['POPAYAN'],
  'REGIONAL CESAR': ['VALLEDUPAR', 'AGUACHICA'],
  'REGIONAL CHOCO': ['QUIBDO'],
  'REGIONAL CORDOBA': ['MONTERIA'],
  'REGIONAL CUNDINAMARCA': ['SOACHA', 'VILLETA', 'FUSAGASUGA', 'GIRARDOT', 'MOSQUERA', 'CHIA'],
  'REGIONAL DISTRITO CAPITAL': ['BOGOTÁ'],
  'REGIONAL GUAINIA': ['PUERTO INIRIDA'],
  'REGIONAL GUAVIARE': ['SAN JOSE DEL GUAVIARE'],
  'REGIONAL HUILA': ['CAMPO ALEGRE', 'GARZON', 'LA PLATA', 'NEIVA', 'PITALITO'],
  'REGIONAL LA GUAJIRA': ['RIOHACHA'],
  'REGIONAL MAGDALENA': ['SANTA MARTA'],
  'REGIONAL META': ['VILLAVICENCIO'],
  'REGIONAL NARIÑO': ['IPIALES', 'TUMACO', 'SAN JUAN DE PASTO'],
  'REGIONAL NORTE DE SANTANDER': ['CUCUTA'],
  'REGIONAL PUTUMAYO': ['PUERTO ASIS'],
  'REGIONAL QUINDIO': ['ARMENIA'],
  'REGIONAL RISARALDA': ['PEREIRA', 'DOS QUEBRADAS'],
  'REGIONAL SAN ANDRES PROVIDENCIA': ['SAN ANDRES'],
  'REGIONAL SANTANDER': ['GIRON', 'FLORIDA BLANCA', 'PIEDECUESTA', 'BUCARAMANGA', 'BARRANCABERMEJA', 'SAN GIL', 'MALAGA', 'VELEZ'],
  'REGIONAL SUCRE': ['SINCELEJO'],
  'REGIONAL TOLIMA': ['IBAGUE'],
  'REGIONAL VALLE DEL CAUCA': ['CALI', 'BUGA', 'TULUA', 'BUENAVENTURA', 'CARTAGO', 'PALMIRA'],
  'REGIONAL VAUPES': ['MITU'],
  'REGIONAL VICHADA': ['VICHADA']
  // Agrega las demás regionales y sus áreas aquí
}
const regionales = [
  'REGIONAL AMAZONAS',
  'REGIONAL ANTIOQUIA',
  'REGIONAL ARAUCA',
  'REGIONAL ATLANTICO',
  'REGIONAL BOLIVAR',
  'REGIONAL BOYACA',
  'REGIONAL CALDAS',
  'REGIONAL CAQUETA',
  'REGIONAL CASANARE',
  'REGIONAL CAUCA',
  'REGIONAL CESAR',
  'REGIONAL CHOCO',
  'REGIONAL CORDOBA',
  'REGIONAL CUNDINAMARCA',
  'REGIONAL DISTRITO CAPITAL',
  'REGIONAL GUAINIA',
  'REGIONAL GUAVIARE',
  'REGIONAL HUILA',
  'REGIONAL LA GUAJIRA',
  'REGIONAL MAGDALENA',
  'REGIONAL META',
  'REGIONAL NARIÑO',
  'REGIONAL NORTE DE SANTANDER',
  'REGIONAL PUTUMAYO',
  'REGIONAL QUINDIO',
  'REGIONAL RISARALDA',
  'REGIONAL SAN ANDRES PROVIDENCIA',
  'REGIONAL SANTANDER',
  'REGIONAL SUCRE',
  'REGIONAL TOLIMA',
  'REGIONAL VALLE DEL CAUCA',
  'REGIONAL VAUPES',
  'REGIONAL VICHADA'
]
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
      <div className="flex gap-5 mb-3">
  <div className="w-full">
    <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
      Nombre Completo
    </label>
    <Field
      type="text"
      name="name"
      id="name"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      placeholder="Nombre"
    />
    <ErrorMessage
      name="name"
      component="div"
      className="text-red-500"
    />
  </div>
  </div>
  <div className="w-full">
    <label htmlFor="campo2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
      Teléfono
    </label>
    <Field
      type="text"
      name="phone"
      id="phone"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      placeholder="Teléfono"
    />
    <ErrorMessage
      name="phone"
      component="div"
      className="text-red-500"
    />
  </div>
<div className="flex gap-5 mb-3">
  <div className="w-full">
    <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
      Correo
    </label>
    <Field
      type="text"
      name="email"
      id="email"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      placeholder="Correo"
    />
    <ErrorMessage
      name="email"
      component="div"
      className="text-red-500"
    />
  </div>
</div>

<div className="flex gap-5 mb-3">
<div className="w-1/2">
              <label
                htmlFor="campo3"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Regional
              </label>
              <Select
                name="regional"
                id="regional"
                value={editingData.regional}
                onChange={(selectedOption) => {
                  const selectedRegional = selectedOption.value
                  setFieldValue('regional', selectedRegional)
                  setFieldValue('area', '') // Resetear el valor del área cuando cambie la regional

                  // Actualizar las opciones del select de áreas
                  const areas = regionalAreas[selectedRegional] || []
                  setFieldValue('areas', areas)
                }}
                options={regionales.map((regional) => ({
                  value: regional,
                  label: regional
                }))}
                placeholder={editingData.regional ? editingData.regional : 'Selecciona regional'}
                noOptionsMessage={() => 'No hay opciones disponibles'}
                className="bg-gray-50 text-gray-900 text-sm"
                classNamePrefix="react-select"
                isSearchable
                isClearable
                menuPlacement="auto"
                formatOptionLabel={(option) => (
                  <div>{option.label}</div>
                )}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderColor: state.isSelected ? 'green' : 'gray',
                    boxShadow: state.isSelected ? '0 0 0 1px green' : 'none'
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? 'green' : 'white',
                    color: state.isSelected ? 'white' : 'black'
                  })
                }}
                />
                <ErrorMessage
                  name="regional"
                  component="div"
                  className="text-red-500"
                />
              </div>

<div className="w-1/2">
              <label
                htmlFor="campo2"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Área
              </label>
              <Select
  name="area"
  id="area"
  value={editingData.area}
  onChange={(selectedOption) => {
    setFieldValue('area', selectedOption.value)
  }}
  options={(editingData.areas || []).map((area) => ({
    value: area,
    label: area
  }))}
  placeholder={
    editingData.area ? editingData.area : 'Selecciona Área'
  }
  noOptionsMessage={() => 'No hay opciones disponibles'}
  className="bg-gray-50 text-gray-900 text-sm"
  classNamePrefix="react-select"
  isSearchable
  isClearable
  menuPlacement="auto"
  formatOptionLabel={(option) => <div>{option.label}</div>}
  styles={{
  }}
/>
<ErrorMessage
  name="area"
  component="div"
  className="text-red-500"
/>
</div>
</div>
<div className="flex gap-5 mb-3">
<div className="w-full">
    <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
      Centro
    </label>
    <Field
      type="text"
      name="center"
      id="center"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      placeholder="Centro"
    />
    <ErrorMessage
      name="center"
      component="div"
      className="text-red-500"
    />
  </div>
</div>
        <button
          type="submit"
          className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-custom-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
    <button type="button" alt="Icono editar" title="Editar el cliente" onClick={() => {
      handleEdit(client)
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

export default UpdateClient
