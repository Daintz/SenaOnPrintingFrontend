import { usePutOrderProductionByIdMutation } from "../../context/Api/Common";
import {
  changeAction,
  closeModal,
  openEditing,
  openModal,
  setAction,
  setWidth
} from "../../context/Slices/Modal/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import clientAxios from "../../config/clientAxios";

const validationSchema = Yup.object().shape({
  materialReception: Yup.string().required('Campo requerido'),
  program: Yup.string().required('Campo requerido'),
  programVersion: Yup.string().required('Campo requerido'),
  indented: Yup.string()
    .required('Campo requerido')
    .matches(/^\d+(\.\d+)?$/, 'Admite números y punto decimal'),
  lineature: Yup.string()
    .required('Campo requerido')
    .matches(/^(\d+|lpi)$/, 'Contine números y "lpi"'),
  colorProfile: Yup.string().required('Campo requerido'),
});


function updateOrderProduction() {
  const [impositionPlanchOptions, setImpositionPlanchOptions] = useState([])
  const [machineOptions, setMachineOptions] = useState([])
  const dispatch = useDispatch();
  const { editingData } = useSelector(state => state.modal);
  const [
    updateOrderProduction,
    { error, isLoading }
  ] = usePutOrderProductionByIdMutation();

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />;
    if (error) return <Error type={error.status} message={error.error} />;
    // if (selectedImage) {
    //   values.schemeInfo = selectedImage;
    // }
    console.log(editingData.typeService);

    await updateOrderProduction(values);
    dispatch(changeAction());
    dispatch(closeModal());
    toast.success("Orden de producción actualizada con exito");
  };
  const [applyBleed, setApplyBleed] = useState("no");
  useEffect(() => {
    fetchOptions()

  })
  // const [currentImage, setCurrentImage] = useState(editingData.scheme);
  // const [selectedImage, setSelectedImage] = useState(null);
  // useEffect(() => {
  //   setCurrentImage(editingData.scheme);
  // }, [editingData.scheme]);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedImage(file);
  //       setCurrentImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

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

  return (
    <Formik
      initialValues={{
        id: editingData.id,
        quotationClientDetailId: editingData.quotationClientDetailId,
        materialReception: editingData.materialReception,
        program: editingData.program,
        programVersion: editingData.programVersion,
        indented: editingData.indented,
        lineature: editingData.lineature,
        colorProfile: editingData.colorProfile,
        typePoint: editingData.typePoint,
        observations: editingData.observations,
        impositionPlanchId: editingData.impositionPlanchId,
        machineId: editingData.machineId
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, values }) =>
        <Form className="space-y-6" contenttype="multipart/form-data">
          <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-1/4">
              <label
                htmlFor="campo1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Recepción material
              </label>
              <Field
                type="text"
                name="materialReception"
                id="materialReception"
className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                placeholder="Drive"
              />
              <ErrorMessage
                name="materialReception"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-1/4">
              <label
                htmlFor="campo1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
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

            <div className="w-1/4">
              <label
                htmlFor="campo1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Version del programa
              </label>
              <Field
                type="text"
                name="programVersion"
                id="programVersion"
className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                placeholder="1.1.2"
              />
              <ErrorMessage
                name="programVersion"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="w-1/4">
              <label
                htmlFor="campo1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Pefil de color
              </label>
              <Field
                type="text"
                name="colorProfile"
                id="colorProfile"
className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                placeholder="cmyk"
              />
              <ErrorMessage
                name="colorProfile"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>

          <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-1/4">
            <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
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
              {/* <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              /> */}
            </div>
            <div className="w-1/4">
            <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
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
              {/* <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              /> */}
            </div>

            {editingData.typeService === "Offset" &&
              <div className="w-1/4">
                <label
                  htmlFor="campo1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Lineatura
                </label>
                <Field
                  type="text"
                  name="lineature"
                  id="lineature"
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                  placeholder="Name"
                />
                {/* <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                /> */}
              </div>}
            {editingData.typeService !== "Offset" &&
              <div className="w-1/4">
                <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Tipo de punto
                      </label>
                      <Field
                        as="select"
                        name="typePoint"
                        id="typePoint"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                      >
                        <option value="Punto redondo">Punto redondo</option>
                        <option value="Punto eliptico">Punto eliptico</option>
                      </Field>
                {/* <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                /> */}
              </div>}
              {editingData.indented !== null &&
              <div className="w-1/4">
              <label
                htmlFor="campo1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Sangrado
              </label>
              <Field
                type="text"
                name="indented"
                id="indented"
className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                placeholder="Name"
              />
              <ErrorMessage
                name="indented"
                component="div"
                className="text-red-500"
              />
            </div>}
          </div>
          <div className="flex gap-5 grid-cols-5 mb-3">
            <div className="w-full">
              <label
                htmlFor="observations"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Observaciones
              </label>
              <Field
                as="textarea"
                type="text"
                name="observations"
                id="observations"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full  p-2.5 h-32 resize-none"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
          </div>

          <button
            type="submit"
            onClick={() => {
              handleSubmit(values);
              console.log(values);
            }}
            className="col-span-3 w-full text-white border border-gray-400 bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
          >
            Editar OP
          </button>
        </Form>}
    </Formik>
  );
}

export function UpdateButtomOrderProduction({ orderProduction }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch();
  const handleEdit = data => {
    if (orderProduction.orderStatus !== 2) {
      // Puedes mostrar una notificación o realizar alguna acción en caso de que no cumpla la condición
      toast.error('No puedes editar esta orden porque ya se encuentra en producción o terminado');
    } else {
    dispatch(setWidth({ width: "-[1500px]" }));
    dispatch(openModal({ title: "Editar orden de producción" }));
    dispatch(setAction({ action: "editing" }));
    dispatch(openEditing({ editingData: data }));
    }
  };
  // ?

  return (
    <button
      type="button"
      onClick={() => {
        handleEdit(orderProduction);
      }}
      title="Editar OP"
    >
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
  );
}

export default updateOrderProduction;