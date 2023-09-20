import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import clientAxios from '../../config/clientAxios'
import * as Yup from 'yup'
import { usePostSupplyDetailsMutation } from '../../context/Api/Common'
import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'
import Spinner from '../Spinner/Spinner'
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'

const validationSchema = Yup.object().shape({
  description: Yup.string(),
  entryDate: Yup.date().required('Campo requerido'),
  providerId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un proveedor')
})

const getProviders = async () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/Provider').then(
      (result) => {
        const providerId = result.data.map((Provider) => ({
          label: Provider.nameCompany,
          value: Provider.id
        }))
        resolve(providerId)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

function CreateSupplyDetails () {
  const [providerOptions, setProviderOptions] = useState([])
  const [currentDate] = useState(new Date().toISOString().split('T')[0])

  const fetchOptions = () => {
    getProviders().then((options) => {
      setProviderOptions(options)
    })
  }
  useEffect(() => {
    fetchOptions()
  }, [])
  const dispatch = useDispatch()
  const [CreateSupplyDetails, { isLoading }] = usePostSupplyDetailsMutation()

  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    try {
      const response = await CreateSupplyDetails(values)

      dispatch(changeAction())
      if (!response.error) {
        dispatch(closeModal())
      }

      toast.success('Compra de insumo creada con éxito', {
        autoClose: 1000
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Formik
      initialValues={{
        description: '',
        entryDate: currentDate,
        providerId: 0
      }}

      onSubmit={(values) => {
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
    {({ setFieldValue }) => (
  <Form>
    <div className="w-full">
      {currentDate === 1 && (
        <div className="w-full">
          <b>Fecha: {new Date().toISOString().split('T')[0]}</b>
          <hr className="mb-4" />
        </div>
      )}

      <div className="flex gap-5 grid-cols-2 mb-3">
        <div className="w-1/2 ml-2">
          <label htmlFor="entryDate">Fecha de entrada</label>
          <Field
            type="date"
            name="entryDate"
            id="entryDate"
            placeholder="Fecha de entrada"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className="flex gap-5 grid-cols-2 mb-3">
        <div className="w-1/2 ml-2">
          <label htmlFor="providerId">Proveedor</label>
          <br />
          <Field
            name="providerId"
            as="select"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          >
            <option value={0}>Seleccione un proveedor</option>
            {providerOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Field>
          <ErrorMessage
            name="providerId"
            component="div"
            className="text-red-500"
          />
        </div>
      </div>

      <div className="flex gap-5 grid-cols-5 mb-3">
        <div className="w-full mr-2">
          <label htmlFor="description">Descripción</label>
          <Field
            as="textarea"
            type="text"
            name="description"
            id="description"
            placeholder="Descripción"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            rows="6"
            cols="100"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:bg-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
      >
        Crear compra de insumos
      </button>
    </div>
  </Form>)}
  </Formik>
  )
}

export function CreateButtomSupplyDetails () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Crear compra de insumo' }))
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
      Crear compra de insumo
    </button>
  )
}

export default CreateSupplyDetails
