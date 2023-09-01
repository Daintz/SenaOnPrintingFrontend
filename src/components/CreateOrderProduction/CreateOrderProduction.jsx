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
import { useGetAllOrderProductionsQuery } from '../../context/Api/Common'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale'
import { BsCheckCircle } from 'react-icons/bs'
import { HiOutlinePlusSm } from 'react-icons/hi'
import clientAxios from '../../config/clientAxios'
import { AiOutlineArrowRight } from 'react-icons/ai'
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


  // const { data: dataApi, refetch } = useGetAllOrderProductionsQuery()
  // const { isAction
  // } = useSelector((state) => state.modal)


  const dispatch = useDispatch()
  const [impositionPlanchOptions, setImpositionPlanchOptions] = useState([])
  const [machineOptions, setMachineOptions] = useState([])


  const [createOrderProduction, { error, isLoading }] = usePostOrderProductionMutation()
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);

  const [selectedImage2, setSelectedImage2] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);

  const { detailsData } = useSelector((state) => state.modal)
  const { id, orderDate, deliverDate, name, phoneClient, emailClient, quotationClientId, productName, productWidth, numberOfPages, inkQuantity, quantity, productHeight, technicalSpecifications, typeService } = detailsData
  // console.log(detailsData.id)
  const quotationClientDetailId = detailsData.id
  const userId = sessionStorage.getItem('UserId');
  console.log(userId)
  //Formato de fecha
  const originalDateStr = detailsData.deliverDate;
  const originalDate = parseISO(originalDateStr);
  const formattedDate = format(originalDate, 'dd \'de\' MMM yyyy', { locale: es });


  useEffect(() => {
    fetchOptions()


  }, [])

  const handleButtonClick = () => {
    window.location.href = '/OrderProduction';
  };



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


  const handleSubmit = async values => {
    if (isLoading) return <Spinner />


    // console.log('userId:', values.userId);
    // console.log('materialReception', values.materialReception);
    // console.log('programVersion', values.programVersion);
    // console.log('imageInfo', values.image);
    const formData = new FormData();
    console.log(values)
    console.log('quotationClientDetailId:', quotationClientDetailId);
    console.log('userId', userId);
    formData.append('quotationClientDetailId', quotationClientDetailId);
    formData.append('userId', userId);
    formData.append('materialReception', values.materialReception);
    formData.append('programVersion', values.programVersion);
    formData.append('indented', values.indented);
    formData.append('colorProfile', values.colorProfile);
    // formData.append('specialInk', values.specialInk);
    // formData.append('inkCode', values.inkCode);
    // formData.append('idPaperCut', values.idPaperCut);
    formData.append('imageInfo', selectedImage1);
    formData.append('observations', values.observations);
    formData.append('machineId', values.machineId)
    formData.append('impositionPlanchId', values.impositionPlanchId)
    formData.append('statedAt', true);
    formData.append('orderStatus', 2);
    formData.append('program', values.program);
    formData.append('typePoint', values.typePoint);
    formData.append('schemeInfo', selectedImage2);
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
        quotationClientDetailId: quotationClientDetailId,
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
              <div className="py-4">
                <div className="flex gap-5 grid-cols-4 mb-3">
                  <div className="w-2/4">
                    <p><b>Código:</b> {detailsData.quotationClientId}</p>
                    <p><b>Fecha entrega:</b> {formattedDate}</p>


                  </div>
                  <div className="w-2/4">
                    <p><b>Cliente:</b> {detailsData.name}</p>
                    <p><b>Tipo de servicio:</b> {detailsData.typeService.name}</p>


                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/5">
                <div className="bg-white shadow-2xl py-4 p-4 rounded-lg mb-2 border-[1px] border-gray-300 ">
                  <div className="flex gap-5 grid-cols-4 mb-3">

                    <div className="w-full">
                      <p><b>Producto:</b> {productName}</p>
                      <p><b>Cantidad:</b> {quantity}</p>
                    </div>
                    <div className="flex items-center justify-center w-15 h-15">
                      <BsCheckCircle className="text-blue-500 h-6 w-6" />
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow-2xl py-4 p-4 rounded-lg mb-2 border-[1px] border-gray-300">
                  <div className="flex gap-5 grid-cols-4 mb-3">

                    <div className="w-full">
                      <p><b>Producto:</b> Mug</p>
                      <p><b>Cantidad</b> 5</p>
                    </div>

                  </div>
                </div>
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

                  <div className="w-1/4">
                    <label htmlFor="impositionPlanchId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                      Imposición plancha
                    </label>
                    <Field
                      as="select"
                      name="impositionPlanchId"
                      id="impositionPlanchId"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                    >
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
                      {machineOptions && machineOptions.map(machine => (
                        <option key={machine.id} value={machine.id}>
                          {machine.name}
                        </option>
                      ))}
                    </Field>
                  </div>
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
                  <Link to={"/OrderProduction"}></Link>
                  <AiOutlineArrowRight />
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
    // console.log(`ID del orderProduction: ${orderProduction}`);
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
        <HiOutlinePlusSm alt="Icono detalles" title="Crear OP" className="h-7 w-7 mr-2" />
      </Link>
    </button>
  )
}


export default CreateOrderProduction

