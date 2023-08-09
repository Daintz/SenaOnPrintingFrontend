import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostProductMutation } from '../../context/Api/Common'
import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'
import Spinner from '../Spinner/Spinner'
import { toast } from 'react-toastify'
import { useState } from 'react'

const validationSchema = Yup.object().shape({
  typeProduct: Yup.string().required('Campo requerido'),
  name: Yup.string().required('Campo requerido'),
  characteristics: Yup.string().required('Campo requerido')
})

function CreateProduct () {
  const dispatch = useDispatch()
  const [createProduct, { error, isLoading }] = usePostProductMutation()

  const [typeProductSelect, setTypeProductSelect] = useState('libreta')

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />

    await createProduct(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Producto creado con exito', {
      autoClose: 1000 // Duración de 1 segundos
    })
  }

  const inputs = [
    {
      row: 1,
      key: 0,
      typeProductOwner: '',
      name: 'name',
      title: 'Nombre',
      type: 'text',
      placeholder: 'Nombre del producto'
    },
    {
      row: 1,
      key: 1,
      typeProductOwner: '',
      name: 'typeProduct',
      title: 'Tipo de producto',
      type: 'select',
      options: ['Elige una opción', 'Libreta', 'Souvenir', 'Gran formato', 'Papelería', 'Otros'],
      placeholder: 'Tipo de producto'
    },
    {
      row: 1,
      key: 2,
      typeProductOwner: 'libreta',
      name: 'notebookSize',
      title: 'Tamaño',
      type: 'text',
      placeholder: 'Tamaño libreta'
    },
    {
      row: 1,
      key: 3,
      typeProductOwner: 'libreta',
      name: 'cover',
      title: 'Tapa',
      type: 'text',
      placeholder: 'Tapa libreta'
    },
    {
      row: 1,
      key: 5,
      typeProductOwner: 'libreta',
      name: 'frontPage',
      title: 'Portada',
      type: 'select',
      options: ['Elige una opción', 'Si', 'No'],
      placeholder: 'Portada libreta'
    },
    {
      row: 1,
      key: 6,
      typeProductOwner: 'libreta',
      name: 'laminated',
      title: 'Laminadas',
      type: 'select',
      options: ['Elige una opción', 'Si', 'No'],
      placeholder: 'Laminadas libreta'
    },
    {
      row: 2,
      key: 7,
      typeProductOwner: 'libreta',
      name: 'BackCoverprintedInColor',
      title: 'Contraportada impresa a color',
      type: 'select',
      options: ['Elige una opción', 'Si', 'No'],
      placeholder: 'Contraportada impresa a color libreta'
    },
    {
      row: 2,
      key: 8,
      typeProductOwner: 'libreta',
      name: 'interiorSheets',
      title: 'Interior hojas',
      type: 'select',
      options: ['Elige una opción', 'En blanco', 'impresas a 1 tinta'],
      placeholder: 'Interior hojas libreta'
    },
    {
      row: 2,
      key: 9,
      typeProductOwner: 'libreta',
      name: 'ringed',
      title: 'Anilladas',
      type: 'select',
      options: ['Elige una opción', 'Si', 'No'],
      placeholder: 'Anilladas libreta'
    },
    {
      row: 2,
      key: 10,
      typeProductOwner: 'libreta',
      name: 'cost',
      title: 'Costo',
      type: 'text',
      placeholder: 'Costo del producto'
    }
  ]

  const rows = [...new Set(inputs.map(input => input.row))]

  return (
    <Formik
      initialValues={{
        typeProduct: '',
        name: '',
        characteristics: '',
        cost: ''
      }}
      onSubmit={values => {
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
      <Form className="space-y-6">
      {rows.map(row => (
        <div key={row} className="flex">
          {inputs
            .filter(input => input.row === row)
            .map(input => (
              <div key={input.key} className="flex-1 mr-4 last:mr-0">
                {
                input.typeProductOwner === typeProductSelect || input.typeProductOwner === ''
                  ? (
                      input.type === 'select'
                        ? (
                  <>
                  <label htmlFor={input.name}>{input.title}</label>
                  <Field as='select' name={input.name} id={input.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5">
                    {input.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Field>
                  </>
                          )
                        : (
                  <>
                  <label htmlFor={input.name}>{input.title}</label>
                  <Field
                    type={input.type}
                    name={input.name}
                    id={input.name}
                    placeholder={input.placeholder}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                  />
                  </>
                          ))
                  : (<></>)}
                <ErrorMessage
                  name={input.name}
                  component="div"
                  className="text-red-500"
                />
              </div>
            ))}
        </div>
      ))}
        <button
          type="submit"
          className="w-full text-white bg-custom-blue hover:bg-custom-blue focus:ring-4 focus:outline-none focus:ring-custom-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Crear producto
        </button>
      </Form>
    </Formik>
  )
}

export function CreateButtonProduct () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: 'w-[1500px]' }))
    dispatch(setAction({ action: 'creating' }))
    dispatch(openModal({ title: 'Crear producto' }))
  }
  // ?

  return (
    <button
      className="flex items-center justify-center border border-gray-400 text-white bg-custom-blue hover:bg-white focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
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
      Crear producto
    </button>
  )
}

export default CreateProduct
