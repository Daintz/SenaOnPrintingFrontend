import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostImpositionPlanchMutation } from '../../context/Api/Common'
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
  name: Yup.string().required('Campo requerido'),
  scheme: Yup.string().required('Campo requerido')
})

function CreateImpositionPlanch() {
  const dispatch = useDispatch()
  const [createImpositionPlanch, { error, isLoading }] = usePostImpositionPlanchMutation()
  const [previewImage, setPreviewImage] = useState(null);
  const handleSubmit = async values => {
    if (isLoading) return <Spinner />

    const formData = new FormData();
      formData.append('name', values.name);
      formData.append('schemeInfo', values.scheme);

      await createImpositionPlanch(formData);

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Imposición plancha creada con exito')
  }
  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        scheme: ''
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
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Nombre imposición
          </label>
          <Field
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="Giro pinza"
          />
          <div>
            <label
              htmlFor="scheme"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Esquema
            </label>
            {previewImage && <img src={previewImage} alt="Preview" width={100} height={100} />}
            <input
              type="file"
              name="scheme"
              id="scheme"
              placeholder="Descripción"
              onChange={event => {
                setFieldValue("scheme", event.target.files[0]);
                handleFileChange(event);
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Crear imposición
          </button>
        </Form>
      )}
    </Formik>
  )
}

export function CreateButtomImpositionPlanch() {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Crear imposició plancha' }))
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
      Crear imposición
    </button>
  )
}

export default CreateImpositionPlanch
