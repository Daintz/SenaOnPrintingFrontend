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
  name: Yup.string().required('Campo requerido'),
  scheme: Yup.string().required('Campo requerido')
  // typePoint: Yup.string().required('Campo requerido')
  // .matches(/^[\d.]+$/, 'Solo se permite . y números')
  ,
  // scheme: Yup.string().required('Campo requerido')
})




function CreateOrderProduction() {
  const usenavigate = useNavigate()
  // const { data: dataApi, refetch } = useGetAllOrderProductionsQuery()
  // const { isAction
  // } = useSelector((state) => state.modal)
  const [productoActivo, setProductoActivo] = useState(null);
  const [productosList, setProductosList] = useState([]);
  const dispatch = useDispatch()
  const [impositionPlanchOptions, setImpositionPlanchOptions] = useState([])
  const [machineOptions, setMachineOptions] = useState([])


  const [createOrderProduction, { error, isLoading }] = usePostOrderProductionMutation()
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);

  const [selectedImage2, setSelectedImage2] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);

  const { detailsData } = useSelector((state) => state.modal)
  console.log(detailsData.id)
  const userId = localStorage.getItem('UserId');
  console.log(userId)
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


  const handleButtonClick = (values) => {
    
    const productoActual = detailsData.quotationClientDetails === productoActivo;
    const indiceSiguiente = (productoActual + 1) % detailsData.quotationClientDetails.length;
    
    
    // Obtén el ID del próximo producto
    const nuevoProductoActivo = detailsData.quotationClientDetails[indiceSiguiente].id;

    console.log(productoActivo)
    const orderProduction = {
      quotationClientDetailId: productoActivo,
      userId: parseInt(userId),
      materialReception: values.materialReception,
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
    // Establece el nuevo producto activo
    setProductosList((prevList) => {
      const newList = [...prevList, orderProduction];

      console.log('Lista después de agregar el producto:', newList); // Muestra la lista actualizada
      if (newList.length == detailsData.quotationClientDetails.length){

          handleSubmit(newList) // Supongo que createOrderProduction envía la orden al servidor

      }
      return newList;
    });

  // Itera a través de la lista de productos y envía cada uno al servidor

    
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
    formData.append('imageInfo', selectedImage1);
    formData.append('lineature', value.lineature);
    formData.append('observations', value.observations);
    formData.append('machineId', value.machineId)
    formData.append('impositionPlanchId', value.impositionPlanchId)
    formData.append('statedAt', true);
    formData.append('orderStatus', 2);
    formData.append('program', value.program);
    formData.append('typePoint', value.typePoint);
    formData.append('schemeInfo', selectedImage2);
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


  return (


    <Formik
      initialValues={{
        userId: userId,
        quotationClientDetailId: productoActivo,
        materialReception: '',
        programVersion: '',
        indented: '',
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
      onSubmit={(values) => {
        handleButtonClick(values)
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
            <div className="flex gap-4">
              <div className="w-1/5">
                {detailsData.quotationClientDetails.map((product, index) => (
                  <div       className={`bg-white shadow-2xl py-4 p-4 rounded-lg mb-2 border-[1px] border-gray-300 ${productoActivo === product.id ? 'border-black' : ''}`}
                  key={index}
                  onClick={() => setProductoActivo(product.id)}>
                    <div className="flex gap-5 grid-cols-4 mb-3" >
                      <div className="w-full">
                        <p><b>Producto:</b> {product.productName}</p>
                        <p><b>Cantidad:</b> {product.quantity}</p>
                      </div>
                      <div className="flex items-center justify-center w-15 h-15">
                        <BsCheckCircle className="text-blue-500 h-6 w-6" />
                      </div>
                    </div>
                  </div>))}
              </div>

              <div className="w-4/5 border-l-[3px] border-gray pl-4">

                <div className="flex gap-5 grid-cols-4 mb-3">



                </div>


                <div className="flex gap-5 grid-cols-5 mb-3">
                  <div className="w-1/4">


                    <label htmlFor="materialReception" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Recepción material
                    </label>
                    <Field
                      as="select"
                      type="text"
                      name="materialReception"
                      id="materialReception"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5">
                      <option value="0">Selecciona</option>
                      <option value="USB">USB</option>
                      <option value="Gmail">Gmail</option>
                      <option value="Drive">Drive</option>
                      <option value="Otro">Otro</option>
                      <option value="No aplica">No aplica</option>
                    </Field>

                  </div>
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
                  </div>
                  {detailsData.quotationClientDetails.find(product => product.id === productoActivo)?.typeServiceName !== 'Digital' && (
                  <div className="w-1/4">
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
                  </div>
                  )}

{detailsData.quotationClientDetails.find(product => product.id === productoActivo)?.typeServiceName !== 'Offset' && (
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
                      <option value="0">Seleccione</option>
                      <option value="Giro pinza">Punto redondo</option>
                      <option value="Doble punto">Punto eliptico</option>
                    </Field>
                  </div>
                )}
                  <div className="w-1/4">
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
                  </div>

                  <div className="w-1/4">
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
                  </div>
                </div>




                <div className="flex gap-5 grid-cols-5 mb-3">
                
                </div>
                <div className="flex gap-5 grid-cols-5 mb-3">
                  <div className="w-1/4">
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
                    <label htmlFor="scheme" className="block mb-2 text-sm font-medium text-gray-700 cursor-pointer">
                      Selecciona el archivo
                      <input
                        type="file"
                        name="scheme"
                        id="scheme"
                        className="sr-only"
                        onChange={(event) => handleFileChange(event, setSelectedImage2, setPreviewImage2)}
                      />
                    </label>
                  </div>


                  <div className="w-1/4">
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

                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700 cursor-pointer">
                      Selecciona un archivo
                      <input
                        type="file"
                        name="image"
                        id="image"
                        className="sr-only"
                        onChange={(event) => handleFileChange(event, setSelectedImage1, setPreviewImage1)}
                      />
                    </label>
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full  p-2.5 h-48 resize-none"
                      placeholder="20"
                    />
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
      <Link to={"/OrderProduction"}></Link>
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

