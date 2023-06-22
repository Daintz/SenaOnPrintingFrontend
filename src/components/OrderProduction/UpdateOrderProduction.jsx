import { usePutOrderProductionByIdMutation } from '../../context/Api/Common'
import { changeAction, closeModal, openEditing, openModal, setAction, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'

const validationSchema = Yup.object().shape({
  OrderProduction: Yup.string().required('Campo requerido'),
  typePoint: Yup.string().required('Campo requerido')
})

function updateOrderProduction() {
  const dispatch = useDispatch()
  const { editingData } = useSelector((state) => state.modal)
  const [updateOrderProduction, { error, isLoading }] = usePutOrderProductionByIdMutation()

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />
    if (selectedImage) {
      values.schemeInfo = selectedImage;
    }
    await updateOrderProduction(values)

    dispatch(changeAction())
    dispatch(closeModal())
    toast.success('Imposición plancha actualizada con exito')
  }
  const [currentImage, setCurrentImage] = useState(editingData.scheme);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    setCurrentImage(editingData.scheme);
  }, [editingData.scheme]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(file);
        setCurrentImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Formik
      initialValues={{
        id: editingData.id,
        name: editingData.name,
        scheme: currentImage
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, values }) => (
        <Form className="space-y-6" contenttype='multipart/form-data'>
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
            <label htmlFor="schemeInfo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Esquema
            </label>
            {currentImage && <img src={currentImage} alt="Preview" width={100} height={100} />}
            <input
              type="file"
              name="schemeInfo"
              id="schemeInfo"
              placeholder="Descripción"
              onChange={(event) => handleFileChange(event, setFieldValue)}
            />
          </div>

          <button type="submit" onClick={() => {handleSubmit(values); console.log(values)}}  className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Editar imposición</button>
        </Form>
      )}
    </Formik>
  )
}

export function UpdateButtomOrderProduction({ orderProduction }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleEdit = (data) => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Editar categoria de insumos' }))
    dispatch(setAction({ action: 'editing' }))
    dispatch(openEditing({ editingData: data }))
  }
  // ?

  return (
    <button type="button" onClick={() => {
      handleEdit(orderProduction)
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

export default updateOrderProduction
