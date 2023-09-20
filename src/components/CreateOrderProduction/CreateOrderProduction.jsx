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
import { useState, useEffect } from 'react'
import { useGetAllOrderProductionsQuery, useGetProductByIdQuery } from '../../context/Api/Common'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale'
import { BsCheckCircle } from 'react-icons/bs'
import { HiOutlinePlusSm } from 'react-icons/hi'
import clientAxios from '../../config/clientAxios'
import { GiCheckMark } from 'react-icons/gi'
import { BsImages } from 'react-icons/bs';

const validationSchema = Yup.object().shape({
  // materialReception: Yup.string().required('Campo requerido'),
  programVersion: Yup.string().required('Campo requerido'),
  // indented: Yup.string().required('Campo requerido'),
  // colorProfile: Yup.string(), // Puedes agregar validaciones adicionales si es necesario
  // image: Yup.string().required('Imagen requerida'),
  // observations: Yup.string(), // Puedes agregar validaciones adicionales si es necesario
  program: Yup.string().required('Campo requerido'),
  // typePoint: Yup.string()
  //   .required('Campo requerido')
  //   .oneOf(['Punto redondo', 'Punto elíptico'], 'Selecciona una opción válida'),
  impositionPlanchId: Yup.number().required('Campo requerido').min(1, 'Selecciona una opción válida'),
  machineId: Yup.number().required('Campo requerido').min(1, 'Selecciona una opción válida'),
  // .required('La selección de máquina es requerida'),
  // scheme: Yup.string().required('Esquema requerido'),


  // scheme: Yup.string().required('Campo requerido')
})



function CreateOrderProduction() {
  const usenavigate = useNavigate()
  // const { data: dataApi, refetch } = useGetAllOrderProductionsQuery()
  // const { isAction
  // } = useSelector((state) => state.modal)
  const [productoActivo, setProductoActivo] = useState(null);
  const [productList, setProductList] = useState([]);
  const dispatch = useDispatch()
  const [impositionPlanchOptions, setImpositionPlanchOptions] = useState([])
  const [machineOptions, setMachineOptions] = useState([])
  const [applyBleed, setApplyBleed] = useState('no');
  const [materialReception, setMaterialReception] = useState('');
  const [otherMaterial, setOtherMaterial] = useState('');

  const [createOrderProduction, { error, isLoading }] = usePostOrderProductionMutation()
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);

  const [selectedImage2, setSelectedImage2] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);

  const { detailsData } = useSelector((state) => state.modal)
  // console.log(detailsData.id)
  const userId = localStorage.getItem('UserId');
  // console.log(userId)
  console.log(materialReception)
  //Formato de fecha
  const originalDateStr = detailsData.deliverDate;
  const originalDate = parseISO(originalDateStr);
  const formattedDate = format(originalDate, 'dd \'de\' MMM yyyy', { locale: es });

  useEffect(() => {
    fetchOptions()
    if (detailsData.quotationClientDetails.length > 0 && productoActivo === null) {
      setProductoActivo(detailsData.quotationClientDetails[0].id);
    }
  }, [detailsData.quotationClientDetails, productoActivo]);

  const getImpositionPlanch = () => {
    return new Promise((resolve, reject) => {
      clientAxios.get('/impositionPlanch').then(
        (result) => {
          const impositionPlanchs = result.data.map((impositionPlanch) => ({
            id: impositionPlanch.id,
            name: impositionPlanch.name
          }))
          resolve(impositionPlanchs)
        },
        (error) => {
          reject(error)
        }
      )
    })
  }

  const getMachine = () => {
    return new Promise((resolve, reject) => {
      clientAxios.get('/Machine').then(
        (result) => {
          const Machines = result.data.map((machine) => ({
            id: machine.id,
            name: machine.name
          }));
          resolve(Machines);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const fetchOptions = () => {

    getImpositionPlanch().then((options) => {
      setImpositionPlanchOptions(options)
    })
    getMachine().then((options) => {
      setMachineOptions(options)
    })

  }

  const handleButtonClick = (values, { setFieldValue }) => {

    const productoActual = detailsData.quotationClientDetails === productoActivo;
    const indiceSiguiente = (productoActual + 1) % detailsData.quotationClientDetails.length;

    const nuevoProductoActivo = detailsData.quotationClientDetails[indiceSiguiente].id;

    console.log(productoActivo)
    const orderProduction = {
      quotationClientDetailId: productoActivo,
      userId: parseInt(userId),
      materialReception: materialReception === 'Otro' ? otherMaterial : materialReception,
      program: values.program,
      programVersion: values.programVersion,
      indented: parseInt(values.indented),
      lineature: values.lineature,
      colorProfile: values.colorProfile,
      typePoint: values.typePoint,
      observations: values.observations,
      imageInfo: selectedImage1,
      impositionPlanchId: parseInt(values.impositionPlanchId),
      machineId: parseInt(values.machineId),
      orderStatus: 2,
      statedAt: true,
      schemeInfo: selectedImage2,
    };

    setProductoActivo(nuevoProductoActivo);

    console.log(orderProduction)

    setProductList((prevList) => {
      const newList = [...prevList, orderProduction];

      console.log('Lista después de agregar el producto:', newList);
      if (newList.length == detailsData.quotationClientDetails.length) {

        handleSubmit(newList)

      }
      return newList;
    });
    setDatosGuardados(true);
    setPreviewImage1(null)
    setPreviewImage2(null)
    setMaterialReception('0')
    setApplyBleed('no')

  };

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />

    for (const value of values) {
      const formData = new FormData();
      formData.append('quotationClientDetailId', value.quotationClientDetailId);
      formData.append('userId', value.userId);
      formData.append('materialReception', value.materialReception);
      formData.append('programVersion', value.programVersion);
      formData.append('indented', value.indented);
      formData.append('colorProfile', value.colorProfile);
      formData.append('imageInfo', value.imageInfo);
      formData.append('lineature', value.lineature);
      formData.append('observations', value.observations);
      formData.append('machineId', value.machineId)
      formData.append('impositionPlanchId', value.impositionPlanchId)
      formData.append('statedAt', true);
      formData.append('orderStatus', 2);
      formData.append('program', value.program);
      formData.append('typePoint', value.typePoint);
      formData.append('schemeInfo', value.schemeInfo);
      console.log(formData)
      await createOrderProduction(formData);

    }

    usenavigate('/OrderProduction');
    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Orden creada con exito', {
      autoClose: 1000
    })
  }

  const handleFileChange = (event, setImage, setPreviewImage) => {
    const file = event.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const [datosGuardados, setDatosGuardados] = useState(false);



  return (

    <Formik
    key={datosGuardados ? 'formulario-limpiado' : 'formulario-original'}
    enableReinitialize={true}
      initialValues={{
        userId: userId,
        quotationClientDetailId: productoActivo,
        materialReception: '',
        programVersion: '',
        indented: 0,
        colorProfile: '',
        image: '',
        observations: '',
        statedAt: true,
        orderStatus: 1,
        program: '',
        typePoint: '',
        impositionPlanchId: 0,
        machineId: 0,
        scheme: ''
      }}
      onSubmit={(values, { setFieldValue }) => {
        handleButtonClick(values, { setFieldValue })
      }}
      validationSchema={validationSchema}
    >
      {({ setFieldValue }) => (

        <Form>
          <div className="relative bg-white py-5 px-10 shadow-2xl md:py-10 md:px-8">

            <div>
              <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Crear orden de producción</h1>
            </div>
            <div>
              <div className="py-4">
                <div className="flex gap-5 grid-cols-4 mb-3">
                  <div className="w-2/4">
                    <p><b>Código:</b> {detailsData.code}</p>
                    <p><b>Fecha entrega:</b> {formattedDate}</p>

                  </div>
                  <div className="w-2/4">
                    <p><b>Cliente:</b> {detailsData.name}</p>
                    <p><b>Tipo de servicio:</b> {detailsData.quotationClientDetails.find(product => product.id === productoActivo)?.typeServiceName}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/5">
                {detailsData.quotationClientDetails.map((product, index) => {
                  // Verifica si hay un registro relacionado con el producto actual en tu lista
                  const productoTieneRegistro = productList.some((item) => item.quotationClientDetailId === product.id);

                  return (
                    <div
                      // className={`bg-white shadow-2xl py-4 p-4 rounded-lg mb-2 border-[1px] border-gray-300 ${productoActivo === product.id ? 'border-black' : ''
                      className={`bg-white shadow-2xl py-4 p-4 rounded-lg mb-2 border-[1px]  ${productoActivo === product.id ? 'border-black' : 'border-gray-300'
                        }`}
                      key={index}
                      onClick={() => setProductoActivo(product.id)}
                    >
                      <div className="flex flex-col md:flex-row gap-5">
                        <div className="w-full md:w-3/4">
                          <p><b>Producto:</b> {product.productName}</p>
                          <p><b>Cantidad:</b> {product.quantity}</p>
                        </div>
                        {productoTieneRegistro && (
                          <div className="flex items-center justify-center w-1/4 md:w-1/4 h-15">
                            <BsCheckCircle className="text-custom-blue h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="w-full border-l-[3px] border-gray pl-4">

                <div className="flex flex-col md:flex-row md:gap-5 mb-3">
                  <div className="w-full md:w-1/4 mb-3 md:mb-0">
                    <label htmlFor="materialReception" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Recepción material
                    </label>
                    <Field
                      as="select"
                      name="materialReception"
                      id="materialReception"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                      onChange={(e) => setMaterialReception(e.target.value)}
                      value={materialReception}
                    >
                      <option value="0">Selecciona</option>
                      <option value="USB">USB</option>
                      <option value="Gmail">Gmail</option>
                      <option value="Drive">Drive</option>
                      <option value="Otro">Otro</option>
                      <option value="No aplica">No aplica</option>
                    </Field>
                    {/* <ErrorMessage
                      name="materialReception"
                      component="div"
                      className="text-red-500"
                    /> */}

                  </div>
                  {materialReception === 'Otro' && (
                    <div className="w-full md:w-1/4 mb-3 md:mb-0">
                      <label htmlFor="otherMaterial" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Medio recepción
                      </label>
                      <input
                        type="text"
                        name="otherMaterial"
                        id="otherMaterial"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                        placeholder="WhatsApp"
                        value={otherMaterial}
                        onChange={(e) => setOtherMaterial(e.target.value)}
                      />
                    </div>
                  )}
                  <div className="w-full md:w-1/4 mb-3 md:mb-0">
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
                    <ErrorMessage
                      name="program"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="w-full md:w-1/4 mb-3 md:mb-0">
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
                      <ErrorMessage
                      name="programVersion"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="w-full md:w-1/4">
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
                    {/* <ErrorMessage
                      name="colorProfile"
                      component="div"
                      className="text-red-500"
                    /> */}
                  </div>
                </div>


                <div className="flex flex-col md:flex-row md:gap-5 mb-3">
                  <div className="w-full md:w-1/4 mb-3 md:mb-0">
                    <label htmlFor="applyBleed" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Aplicar sangrados
                    </label>
                    <Field
                      as="select"
                      name="applyBleed"
                      id="applyBleed"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                      value={applyBleed}
                      onChange={(e) => setApplyBleed(e.target.value)}
                    >
                      <option value="no">No</option>
                      <option value="si">Sí</option>
                    </Field>
                  </div>

                  {applyBleed === 'si' && (
                    <div className="w-full md:w-1/4 mb-3 md:mb-0">
                      <label htmlFor="indented" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Sangrado
                      </label>
                      <Field
                        type="text"
                        name="indented"
                        id="indented"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                        placeholder="5"
                      />
                      {/* <ErrorMessage
                        name="indented"
                        component="div"
                        className="text-red-500"
                      /> */}
                    </div>
                  )}

                  {detailsData.quotationClientDetails.find(product => product.id === productoActivo)?.typeServiceName === 'Offset' && (
                    <div className="w-full md:w-1/4 mb-3 md:mb-0">
                      <label htmlFor="lineature" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Lineatura
                      </label>
                      <Field
                        type="text"
                        name="lineature"
                        id="lineature"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                        placeholder="20 lpi"
                      />
                      {/* <ErrorMessage
                        name="lineature"
                        component="div"
                        className="text-red-500"
                      /> */}
                    </div>
                  )}

                  {detailsData.quotationClientDetails.find(product => product.id === productoActivo)?.typeServiceName !== 'Offset' && (
                    <div className="w-full md:w-1/4 mb-3 md:mb-0">
                      <label htmlFor="typePoint" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Tipo de punto
                      </label>
                      <Field
                        as="select"
                        name="typePoint"
                        id="typePoint"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                      >
                        <option value="0">Seleccione</option>
                        <option value="Punto redondo">Punto redondo</option>
                        <option value="Punto elíptico">Punto elíptico</option>
                      </Field>
                      <ErrorMessage
                        name="typePoint"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  )}
                  <div className="w-full md:w-1/4 mb-3 md:mb-0">
                    <label htmlFor="impositionPlanchId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Imposición plancha
                    </label>
                    <Field
                      as="select"
                      name="impositionPlanchId"
                      id="impositionPlanchId"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                    >  <option value="0">Seleccione</option>
                      {impositionPlanchOptions && impositionPlanchOptions.map(impositionPlanch => (
                        <option key={impositionPlanch.id} value={impositionPlanch.id}>
                          {impositionPlanch.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="impositionPlanchId"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="w-full md:w-1/4 mb-3 md:mb-0">
                    <label htmlFor="machineId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Maquina
                    </label>
                    <Field
                      as="select"
                      name="machineId"
                      id="machineId"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                    >
                      <option value="0">Seleccione</option>
                      {machineOptions && machineOptions.map(machine => (
                        <option key={machine.id} value={machine.id}>
                          {machine.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="machineId"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:gap-5 mb-3">
                  <div className="w-full md:w-1/4 mb-3 md:mb-0">
                    <label htmlFor="scheme" className="block mb-2 text-sm font-medium text-gray-700">
                      Esquema
                    </label>
                    <div className={`border-dotted border-gray-300 border-2 h-[200px] p-0 mb-4 relative ${previewImage2 ? 'h-auto' : ''}`}>
                      {previewImage2 ? (
                        <img
                          src={previewImage2}
                          alt="Previsualización de la imagen"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BsImages className="text-gray-500 text-5xl" />
                        </div>
                      )}
                    </div>
                    <label htmlFor="scheme" className="block mb-2 text-sm font-medium text-gray-700 cursor-pointer border border-gray-300 p-2 rounded-md hover:bg-custom-blue hover:text-white transition-all duration-300 ease-in-out">
                      {selectedImage2 ? "Cambiar esquema" : "Seleccionar esquema"}
                      <input
                        type="file"
                        name="scheme"
                        id="scheme"
                        className="sr-only"
                        onChange={(event) => handleFileChange(event, setSelectedImage2, setPreviewImage2)}
                      />
                    </label>
                    {/* <ErrorMessage
                      name="scheme"
                      component="div"
                      className="text-red-500"
                    /> */}
                  </div>

                  <div className="w-full md:w-1/4 mb-3 md:mb-0">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">
                      Imagen
                    </label>

                    <div className={`border-dotted border-gray-300 border-2 h-[200px] p-0 mb-4 relative ${previewImage1 ? 'h-auto' : ''}`}>
                      {previewImage1 ? (
                        <img
                          src={previewImage1}
                          alt="Previsualización de la imagen"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BsImages className="text-gray-500 text-5xl" />
                        </div>
                      )}
                    </div>

                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700 cursor-pointer border border-gray-300 p-2 rounded-md hover:bg-custom-blue hover:text-white transition-all duration-300 ease-in-out">
                      {selectedImage1 ? "Cambiar imagen" : "Seleccionar imagen"}
                      <input
                        type="file"
                        name="image"
                        id="image"
                        className="sr-only"
                        onChange={(event) => handleFileChange(event, setSelectedImage1, setPreviewImage1)}
                      />
                    </label>
                    {/* <ErrorMessage
                      name="image"
                      component="div"
                      className="text-red-500"
                    /> */}
                  </div>
                  <div className="w-full md:w-2/4">
                    <label htmlFor="observations" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Observaciones
                    </label>
                    <Field
                      as="textarea"
                      type="text"
                      name="observations"
                      id="observations"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full  p-2.5 h-48 resize-none"
                    />
                    {/* <ErrorMessage
                      name="observations"
                      component="div"
                      className="text-red-500"
                    /> */}
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white bg-custom-blue hover:bg-custom-blue-lighter focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-auto"
                >
                  {productoActivo === detailsData.quotationClientDetails[detailsData.quotationClientDetails.length - 1].id ? (
                    "Guardar"
                  ) : (
                    <>
                      <GiCheckMark />
                    </>
                  )}
                </button>

              </div>
            </div>
          </div>

        </Form>
      )}
    </Formik>
  )
}

export function CreateButtomOrderProduction({ quotationClient }) {

  console.log(quotationClient)
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    // console.log(`ID del orderProduction: ${orderProduction}`);
    // dispatch(setWidth({ width: 'w-[1000]' }))
    // dispatch(openModal({ title: 'Crear orden de producción' }))
    // dispatch(setAction({ action: 'creating' }))
    dispatch(setDetailsData({ detailsData: quotationClient }))
  }
  // ?

  return (
    <button
      type="button"
      onClick={() => handleOpen()}
    >
      <Link to="/createOP">
        <HiOutlinePlusSm alt="Icono detalles" title="Crear OP" className="h-7 w-7 mr-2" />
      </Link>
    </button>
  )
}

export default CreateOrderProduction
