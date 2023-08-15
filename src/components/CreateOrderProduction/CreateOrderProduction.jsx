import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { useGetAllPaperCutsQuery, useGetAllImpositionPlanchsQuery, usePostOrderProductionMutation } from '../../context/Api/Common'
import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth,
  setDetailsData
} from '../../context/Slices/Modal/ModalSlice'
import Spinner from '../Spinner/Spinner'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useGetAllOrderProductionsQuery } from '../../context/Api/Common'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale'
import { BsCheckCircle } from 'react-icons/bs'
import { Tooltip } from 'react-tippy'
import {HiOutlinePlusSm} from 'react-icons/hi'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  scheme: Yup.string().required('Campo requerido')
  // typePoint: Yup.string().required('Campo requerido')
  // .matches(/^[\d.]+$/, 'Solo se permite . y números')
  ,
  // scheme: Yup.string().required('Campo requerido')
})

function CreateOrderProduction() {

  // const { data: dataApi, refetch } = useGetAllOrderProductionsQuery()
  // const { isAction 
  // } = useSelector((state) => state.modal)
  // useEffect(() => {
  //   refetch()
  // }, [isAction])

  const dispatch = useDispatch()
  const [createOrderProduction, { error, isLoading }] = usePostOrderProductionMutation()
  const [previewImage, setPreviewImage] = useState(null);
  const { detailsData } = useSelector((state) => state.modal)
  const { id, orderDate, deliverDate, name, phoneClient, emailClient, quotationClientId, productName, productWidth, numberOfPages, inkQuantity, productQuantity, productHeight, technicalSpecifications, typeService } = detailsData
  console.log('quotationClientDetailId:', detailsData.id);
  const originalDateStr = detailsData.deliverDate;
  const originalDate = parseISO(originalDateStr);
  const formattedDate = format(originalDate, 'dd \'de\' MMM yyyy', { locale: es });
  // console.log(detailsData)
  const paperCutsQuery = useGetAllPaperCutsQuery();
  const paperCuts = paperCutsQuery.data;
console.log(paperCuts)
  const impositionPlanchsQuery = useGetAllImpositionPlanchsQuery();
  const impositionPlanchs = impositionPlanchsQuery.data;
console.log(impositionPlanchs)
  const handleSubmit = async values => {
    if (isLoading) return <Spinner />

    // console.log('userId:', values.userId);
    // console.log('materialReception', values.materialReception);
    // console.log('programVersion', values.programVersion);
    // console.log('imageInfo', values.image);
    const formData = new FormData();
    console.log('quotationClientDetailId:', detailsData.id);
    formData.append('quotationClientDetailId', detailsData.id);
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
    console.log(formData)
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
        handleSubmit(values)
      }}
    // validationSchema={validationSchema}
    >
      {({ setFieldValue }) => (

        <Form>
    <div className="relative bg-white py-5 px-10 shadow-2xl mdm:py-10 mdm:px-8">

          <div>
            <h1 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '20px', fontWeight: 'bold' }}>Crear orden de producción</h1>
          </div>
          <div>
            {/* Parte superior: Fila completa */}
            <div className="py-4">
              <div className="flex gap-5 grid-cols-4 mb-3">
                {/* {dataApi.map((data, index) => ( */}
                {/* <div className="flex linea-horizontal mb-2"> */}
                <div className="w-2/4">
                  <p><b>Código:</b> {detailsData.quotationClientId}</p>
                  <p><b>Fecha entrega:</b> {formattedDate}</p>

                </div>
                <div className="w-2/4">
                  <p><b>Cliente:</b> {detailsData.name}</p>
                  <p><b>Tipo de servicio:</b> {detailsData.typeService}</p>

                </div>
                {/* </div> */}
                {/* ))} */}
              </div>
            </div>
            </div>

            {/* Parte inferior: Dos columnas */}
            <div className="flex gap-4">
              {/* Columna izquierda */}
              <div className="w-1/5">
                {/* Contenido de la columna izquierda */}
                <div className="bg-white shadow-2xl py-4 p-4 rounded-lg mb-2">
                  <div className="flex gap-5 grid-cols-4 mb-3">
                    
                    <div className="w-full">
                      <p><b>Producto:</b> {productName}</p>
                      <p><b>Cantidad</b> {productQuantity}</p>
                    </div>
                    <div className="flex items-center justify-center w-15 h-15">
          <BsCheckCircle className="text-blue-500 h-6 w-6" />
        </div>
                  </div>
                </div>
                <div className="bg-white shadow-2xl py-4 p-4 rounded-lg mb-2">
                  <div className="flex gap-5 grid-cols-4 mb-3">
                    {/* {dataApi.map((data, index) => ( */}
                    {/* <div className="flex linea-horizontal mb-2"> */}
                    <div className="w-full">
                    <p><b>Producto:</b> Mug</p>
                      <p><b>Cantidad</b> 5</p>
                    </div>
                    {/* </div> */}
                    {/* ))} */}
                  </div>
                </div>
              </div>

              {/* Columna derecha */}
              <div className="w-4/5">
                {/* Contenido de la columna derecha */}
                {/* <hr className="mb-4" /> */}
                <div className="flex gap-5 grid-cols-4 mb-3">
                  {/* <div className="w-2/4">
              <p><b>Pieza gráfica:</b> {detailsData.productName}</p>
              <p><b>Ancho:</b> {detailsData.productHeight}</p>
              <p><b>Alto:</b> {detailsData.productWidth}</p>
              <p><b>Cantidad de tintas:</b> {detailsData.inkQuantity}</p>

            </div>
            <div className="w-2/4">
            <p><b>Cantidad de piezas:</b> {detailsData.productQuantity}</p>
              <p><b>N° páginas:</b> {detailsData.numberOfPages}</p>
              <p><b>Especificaciones técnicas:</b> {detailsData.technicalSpecifications}</p>
              <p><b>Tipo de servicio:</b> {detailsData.typeService}</p>
            </div> */}
                  {/* <div className="w-2/4">
              <label htmlFor="quotationClientDetailId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Detalle cotización
              </label>
              <Field
                type="text"
                name="quotationClientDetailId"
                id="quotationClientDetailId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                placeholder="Libreta"
              />
            </div> */}

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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                placeholder="15"
              />
            </div> */}
                  <div className="w-1/4">
                    <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Usuario
                    </label>
                    <Field
                      type="text"
                      name="userId"
                      id="userId"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                      placeholder="20"
                    />
                  </div>
                  <div className="w-1/4">

                    <label htmlFor="materialReception" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Recepción material
                    </label>
                    <Field
                      type="text"
                      name="materialReception"
                      id="materialReception"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                      placeholder="Drive"
                    />
                  </div>
                  <div className="w-1/4">
                    <label htmlFor="indented" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Sangrados
                    </label>
                    <Field
                      type="text"
                      name="indented"
                      id="indented"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                placeholder="4X1*"
              />
            </div> */}
                  <div className="w-2/4">
                    <label htmlFor="idPaperCut" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Corte de papel
                    </label>
                    <Field
                      as="select"
                      name="idPaperCut"
                      id="idPaperCut"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                    >
                      {/* Opciones del select */}
                      {paperCuts && paperCuts.map(paperCut => (
                        <option key={paperCut.id} value={paperCut.id}>
                          {paperCut.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="w-2/4">
                    <label htmlFor="idImpositionPlanch" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Imposición plancha
                    </label>
                    <Field
                      as="select"
                      name="idImpositionPlanch"
                      id="idImpositionPlanch"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                    >
                      {/* Opciones del select */}
                      {impositionPlanchs && impositionPlanchs.map(impositionPlanch => (
                        <option key={impositionPlanch.id} value={impositionPlanch.id}>
                          {impositionPlanch.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                  {/* <div className="w-1/4">
              <label htmlFor="campo2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                Maquinas
              </label>
              <Field
                type="text"
                name="campo2"
                id="campo2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
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
                    as="textarea"
                      type="text"
                      name="observations"
                      id="observations"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                      placeholder="20"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-32 text-white bg-custom-blue hover:bg-custom-blue-lighter focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-auto"
                >
                  Guardar
                </button>

              </div>
            </div>
          </div>

        </Form>
      )}
    </Formik>
  )
}

export function CreateButtomOrderProduction({ orderProduction }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    console.log(`ID del orderProduction: ${orderProduction}`);
    // dispatch(setWidth({ width: 'w-[1000]' }))
    // dispatch(openModal({ title: 'Crear orden de producción' }))
    // dispatch(setAction({ action: 'creating' }))
    dispatch(setDetailsData({ detailsData: orderProduction }))
  }
  // ?

  return (
    <button
      type="button"
      onClick={() => handleOpen()}
    >
      <Link to="/createOP">
        <HiOutlinePlusSm alt="Icono detalles" title="Crear OP" className="h-7 w-7 mr-2"/>
      </Link>
    </button>
  )
}

export default CreateOrderProduction
