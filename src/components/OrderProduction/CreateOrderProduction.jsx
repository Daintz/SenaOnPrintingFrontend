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
import { useGetAllOrderProductionsQuery } from '../../context/Api/Common'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  scheme: Yup.string().required('Campo requerido')
  // typePoint: Yup.string().required('Campo requerido')
  // .matches(/^[\d.]+$/, 'Solo se permite . y números')
  ,
  // scheme: Yup.string().required('Campo requerido')
})

function CreateOrderProduction() {
  const { data: dataApi, refetch } = useGetAllOrderProductionsQuery()
  const { isAction } = useSelector((state) => state.modal)
  useEffect(() => {
    refetch()
  }, [isAction])
console.log(dataApi)
  const dispatch = useDispatch()
  const [createOrderProduction, { error, isLoading }] = usePostOrderProductionMutation()
  const [previewImage, setPreviewImage] = useState(null);
  const handleSubmit = async values => {
    if (isLoading) return <Spinner />

    const formData = new FormData();
    formData.append('quotationClientDetailId', values.quotationClientDetailId);
    formData.append('userId', values.userId);
    formData.append('materialReception', values.materialReception);
    formData.append('programVersion', values.programVersion);
    formData.append('indented', values.indented);
    formData.append('colorProfile', values.colorProfile);
    formData.append('specialInk', values.specialInk);
    formData.append('inkCode', values.inkCode);
    formData.append('idPaperCut', values.idPaperCut);
    formData.append('imageInfo', values.image);
    formData.append('observations', values.observations);
    formData.append('statedAt', true);
    formData.append('orderStatus', 2);
    formData.append('program', values.program);
    formData.append('typePoint', values.typePoint);
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
        quotationClientDetailId: 1,
        userId: 1,
        materialReception: '',
        programVersion: '',
        indented: '',
        colorProfile: '',
        specialInk: '',
        inkCode: '',
        idPaperCut: 1,
        image: '',
        observations: '',
        statedAt: true,
        orderStatus: 1,
        program: '',
        typePoint: '',
        scheme: ''
      }}
      onSubmit={(values) => {
        console.log(values)
        handleSubmit(values)
      }}
      // validationSchema={validationSchema}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="flex linea-horizontal mb-2 grid-cols-4">
          {dataApi.map((data, index) => (
            <div key={index} className="flex linea-horizontal mb-2">
              <div className="w-1/2">
                <p><b>Usuario:</b> {data.name}</p>
                <p><b>Teléfono:</b> {data.telefono}</p>
                <p><b>Datos contacto:</b> {data.datosContacto}</p>
              </div>
              <div className="w-1/2">
                <p><b>Código:</b> {data.codigo}</p>
                <p><b>Fecha orden:</b> {data.orderDate}</p>
                <p><b>Fecha entrega:</b> {data.deliverDate}</p>
              </div>
            </div>
          ))}
        </div>
          
          <hr className="mb-4" />
          <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-1/4">
              <label htmlFor="materialReception" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Recepción material
              </label>
              <Field
                type="text"
                name="materialReception"
                id="materialReception"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Drive"
              />
            </div>
            <div className="w-2/4">
              <label htmlFor="quotationClientDetailId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Detalle cotización
              </label>
              <Field
                type="text"
                name="quotationClientDetailId"
                id="quotationClientDetailId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Libreta"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Usuario
              </label>
              <Field
                type="text"
                name="userId"
                id="userId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="20"
              />
            </div>
          </div>

          <div className="flex gap-5 grid-cols-5 mb-3">
            {/* <div className="w-1/4">
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
            </div> */}
            <div className="w-1/4">
              <label htmlFor="indented" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Identado
              </label>
              <Field
                type="text"
                name="indented"
                id="indented"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="5"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="colorProfile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Perfil de color
              </label>
              <Field
                type="text"
                name="colorProfile"
                id="colorProfile"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="CMYK"
              />
            </div>
          </div>

          <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-1/4">
              <label htmlFor="program" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Programa
              </label>
              <Field
                type="text"
                name="program"
                id="program"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Adobe"
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="programVersion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Versión del programa
              </label>
              <Field
                type="text"
                name="programVersion"
                id="programVersion"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="1.0.5"
              />
            </div>
            {/* <div className="w-1/4">
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
            </div> */}
            <div className="w-1/4">
              <label htmlFor="specialInk" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Tinta especial
              </label>
              <Field
                type="text"
                name="specialInk"
                id="specialInk"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="..."
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="inkCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Código de tinta
              </label>
              <Field
                type="text"
                name="inkCode"
                id="inkCode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="#10054"
              />
            </div>
          </div>
          <div className="flex gap-5 grid-cols-5 mb-3">
            {/* <div className="w-1/4">
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
            </div> */}
            {/* <div className="w-1/4">
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
            </div> */}
            {/* <div className="w-1/4">
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
        </div> */}
            {/* <div className="w-1/4">
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
            </div> */}
            {/* <div className="w-1/4">
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
        </div> */}
        
          </div>


          <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-1/4">
          <label htmlFor="typePoint" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
            Tipo de punto
          </label>
          <Field
            as="select"
            name="typePoint"
            id="typePoint"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          >
            <option value="0">Selecciona</option>
            <option value="Giro pinza">Punto redondo</option>
            <option value="Doble punto">Punto eliptico</option>
          </Field>
        </div>
            {/* <div className="w-1/4">
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
            </div> */}
            <div className="w-2/4">
              <label htmlFor="idPaperCut" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Corte de papel
              </label>
              <Field
                type="number"
                name="idPaperCut"
                id="idPaperCut"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Libreta"
              />
            </div>
            {/* <div className="w-1/4">
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
            </div> */}
          </div>
          <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-1/4">
              <label htmlFor="scheme" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Esquema
              </label>
              <input
                type="file"
                name="scheme"
                id="scheme"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="4X1*"
                onChange={event => {
                  setFieldValue("scheme", event.target.files[0]);
                  handleFileChange(event);
                }}
  
              />
            </div>
            <div className="w-1/4">
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Imagen
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="Libreta"
                onChange={event => {
                  setFieldValue("image", event.target.files[0]);
                  handleFileChange(event);
                }}
  
              />
            </div>
            <div className="w-2/4">
              <label htmlFor="observations" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Observaciones
              </label>
              <Field
                type="text"
                name="observations"
                id="observations"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                placeholder="20"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Crear orden de producción
          </button>

        </Form>
      )}
    </Formik>
  )
}

export function CreateButtomOrderProduction({ data }) {
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
      type="button"
      onClick={() => handleOpen()}
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
        />
      </svg>
    </button>
  )
}

export default CreateOrderProduction
