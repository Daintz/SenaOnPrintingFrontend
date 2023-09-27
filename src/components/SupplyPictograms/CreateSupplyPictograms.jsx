import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostSupplyPictogramsMutation } from '../../context/Api/Common'
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
import { data } from 'autoprefixer'

const validationSchema = Yup.object().shape({
  code: Yup.string().required('Campo requerido').min(5,'Minimo 5 caracteres').max(10,'Maximo 10 caracteres'),
  name: Yup.string().required('Campo requerido').min(3,'Minimo 3 caracteres').max(30,'Maximo 30 caracteres'),
  description: Yup.string().required('Campo requerido').min(10,'Minimo 10 caracteres').max(30,'Maximo 30 caracteres'),
  pictogramFile: Yup.string().required('Campo requerido')
})

function CreateSupplyPictograms () {
  const dispatch = useDispatch()
  const [createSupplyPictograms, { error, isLoading }] = usePostSupplyPictogramsMutation()
  const [previewImage, setPreviewImage] = useState(null)
  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    const formData = new FormData()
    formData.append('code', values.code)
    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('pictogramFileInfo', values.pictogramFile)
    for (const num of formData.entries()) {
      console.log(num)
    }
    await createSupplyPictograms(formData)
    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }

    toast.success('Pictograma creado con exito', { autoClose: 1000 })
  }
  const handleFileChange = event => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Formik
      initialValues={{
        code: '',
        name: '',
        description: '',
        pictogramFile: ''

      }}
      onSubmit={(values) => {
        console.log(values)
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
      {({ setFieldValue }) => (
        <Form className="space-y-6">
        <label
          htmlFor="code"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Codigo
        </label>
        <Field
          type="text"
          name="code"
          id="code"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="Codigo del pictograma"
        />
        <ErrorMessage
                name="code"
                component="div"
                className="text-red-500"
              />
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Nombre
        </label>
        <Field
          type="text"
          name="name"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="Nombre del pictograma"
        />
        <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
         <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Descripción
        </label>
        <Field
          type="text"
          name="description"
          id="description"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder="Descripción del pictograma"
        />
        
        <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
        <div>
        <label
              htmlFor="pictogramFile"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Imagen del pictograma
            </label>
            {previewImage && <img src={previewImage} alt="Preview" width={100} height={100} />}
            <input
              type="file"
              name="pictogramFile"
              id="pictogramFile"
              placeholder="Descripción"
              onChange={event => {
                setFieldValue('pictogramFile', event.target.files[0])
                handleFileChange(event)
              }}
            />
        </div>

        <button
          onClick={() => {
            handleSubmit(values);
            console.log(values);
          }}
          type="submit"
          className="flex items-center justify-center border border-gray-700 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-700 font-medium rounded-lg text-sm px-10 py-2"
              
          >
          Crear Pictograma
          
        </button>
      </Form>
      )}
    </Formik>
  )
}

export function CreateButtomSupplyPictograms () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Crear pictograma' }))
    dispatch(setAction({ action: 'creating' }))
  }
  // ?

  return (
    <button
    className="flex items-center justify-center border border-gray-400 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
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
      Crear Pictograma
    </button>
  )
}

export default CreateSupplyPictograms
