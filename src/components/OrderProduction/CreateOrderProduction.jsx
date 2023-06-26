import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostOrderProductionMutation } from '../../context/Api/Common'
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
  // typePoint: Yup.string().required('Campo requerido')
  // .matches(/^[\d.]+$/, 'Solo se permite . y números')
  ,
  // scheme: Yup.string().required('Campo requerido')
})

function CreateOrderProduction() {
  const dispatch = useDispatch()
  const [createOrderProduction, { error, isLoading }] = usePostOrderProductionMutation()
  const [previewImage, setPreviewImage] = useState(null);
  const handleSubmit = async values => {
    if (isLoading) return <Spinner />

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('schemeInfo', values.scheme);

    await createOrderProduction(formData);

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Imposición plancha creada con exito', {
      autoClose: 1000
    })
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
        <Form>
          <div className="flex linea-horizontal mb-2">
            <div className="w-1/2">
              <p><b>Usuario:</b> Juan Lopez</p>
              <p><b>Teléfono:</b> 3145457301</p>
              <p><b>Datos contacto:</b> juan@gmail.com</p>
            </div>
            <div className="w-1/2">
              <p><b>Código:</b> 001</p>
              <p><b>Fecha orden:</b> 05/06/2022</p>
              <p><b>Fecha entrega:</b> 05/07/2022</p>
            </div>
          </div>
          <hr className="mb-4" />
          <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-1/4">
              <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Recepción material
              </label>
              <Field
                type="text"
                name="campo1"
                id="campo1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Drive"
              />
            </div>
            <div className="w-2/4">
              <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Pieza gráfica
              </label>
              <Field
                type="text"
                name="campo1"
                id="campo1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Libreta"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="campo2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Cantidad piezas
              </label>
              <Field
                type="text"
                name="campo2"
                id="campo2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="20"
              />
            </div>
          </div>

          <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-1/4">
              <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                N° de páginas
              </label>
              <Field
                type="text"
                name="campo1"
                id="campo1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="100"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="campo2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Ancho
              </label>
              <Field
                type="text"
                name="campo2"
                id="campo2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="20.5"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Alto
              </label>
              <Field
                type="text"
                name="campo3"
                id="campo3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="15"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Sangrados
              </label>
              <Field
                type="text"
                name="campo3"
                id="campo3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="5"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Perfil de color
              </label>
              <Field
                type="text"
                name="campo3"
                id="campo3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="CMYK"
              />
            </div>
          </div>

          <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-1/4">
              <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Programa
              </label>
              <Field
                type="text"
                name="campo1"
                id="campo1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Adobe"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="campo2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Versión del programa
              </label>
              <Field
                type="text"
                name="campo2"
                id="campo2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="1.0.5"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Cantidad tintas
              </label>
              <Field
                type="text"
                name="campo3"
                id="campo3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="4X1"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Tinta especial
              </label>
              <Field
                type="text"
                name="campo3"
                id="campo3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="..."
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Código
              </label>
              <Field
                type="text"
                name="campo3"
                id="campo3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="#10054"
              />
            </div>
          </div>
          <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-1/4">
              <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Acabados
              </label>
              <Field
                type="text"
                name="campo1"
                id="campo1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Adobe"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="campo2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Sustratos
              </label>
              <Field
                type="text"
                name="campo2"
                id="campo2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="1.0.5"
              />
            </div>
            <div className="w-1/4">
          <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Lineatura
          </label>
          <Field
            as="select"
            name="campo3"
            id="campo3"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          >
            <option value="0">Selecciona</option>
            <option value="12 lpi">12 lpi</option>
            <option value="50 lpi">50 lpi</option>
          </Field>
        </div>
            <div className="w-1/4">
              <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Gramaje/ calibre
              </label>
              <Field
                type="text"
                name="campo3"
                id="campo3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="..."
              />
            </div>
            <div className="w-1/4">
          <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Imposición
          </label>
          <Field
            as="select"
            name="campo3"
            id="campo3"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          >
            <option value="0">Selecciona</option>
            <option value="Giro pinza">Giro pinza</option>
            <option value="Doble punto">Doble punto</option>
          </Field>
        </div>
        
          </div>


          <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-1/4">
          <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Tipo de punto
          </label>
          <Field
            as="select"
            name="campo3"
            id="campo3"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          >
            <option value="0">Selecciona</option>
            <option value="Giro pinza">Punto redondo</option>
            <option value="Doble punto">Punto eliptico</option>
          </Field>
        </div>
            <div className="w-1/4">
              <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Sistema de impresión
              </label>
              <Field
                type="text"
                name="campo1"
                id="campo1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="4X1*"
              />
            </div>
            <div className="w-2/4">
              <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Corte de papel
              </label>
              <Field
                type="text"
                name="campo1"
                id="campo1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Libreta"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="campo2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Maquinas
              </label>
              <Field
                type="text"
                name="campo2"
                id="campo2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="20"
              />
            </div>
          </div>
          <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-1/4">
              <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Esquema
              </label>
              <Field
                type="file"
                name="campo1"
                id="campo1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="4X1*"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Imagen
              </label>
              <Field
                type="file"
                name="campo1"
                id="campo1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Libreta"
              />
            </div>
            <div className="w-2/4">
              <label htmlFor="campo2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Observaciones
              </label>
              <textarea
                type="text"
                name="campo2"
                id="campo2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="20"
              />
            </div>
          </div>
          <button
            type="submit"
            className="col-span-3 w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Crear orden de producción
          </button>
        </Form>
      )}
    </Formik>
  )
}

export function CreateButtomOrderProduction() {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: 'w-[1000]' }))
    dispatch(openModal({ title: 'Crear orden de producción' }))
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

export default CreateOrderProduction
