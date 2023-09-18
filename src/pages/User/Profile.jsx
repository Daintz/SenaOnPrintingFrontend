import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify'
import clientAxios from '../../config/clientAxios'



const EditProfileSchema = Yup.object().shape({
  names: Yup.string().required('Campo requerido'),
  surnames: Yup.string().required('Campo requerido'),
  typeDocumentId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un tipo de documento'),
  documentNumber: Yup.string('El campo solo puede tener números').min(6, 'Documento debe tener al menos 6 digitos').max(12, 'Documento no puede tener mas de 12 digitos').required('Campo requerido').matches(/^[0-9]+$/, 'El teléfono solo puede contener números'),
  phone: Yup.string('El campo solo puede tener números').min(10, 'Teléfono debe ser de 10 digitos').max(10, 'Teléfono debe ser de 10 digitos').required('Campo requerido').matches(/^[0-9]+$/, 'El teléfono solo puede contener números'),
  address: Yup.string().required('Campo requerido'),
  currentPassword: Yup.string().required('Campo requerido'),
  newPassword: Yup.string().min(6, 'Contraseña debe ser de al menos 6 caracteres').max(12, 'Contraseña no puede tener mas de 12 caracteres').required('Campo requerido'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Las contraseñas deben coincidir")
    .required("Campo requerido"),
});

const getTypeDocuments = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/type_document').then(
      (result) => {
        const typeDocuments = result.data.map((type_document) => ({
          'label': type_document.name,
          'value': type_document.id
        }));
        resolve(typeDocuments);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

/* const getUser = async (user_id) => {
  return new Promise((resolve, reject) => {
    clientAxios.get(`/user/${user_id}`).then(
      (result) => {
        resolve(result.data);
      },
      (error) => {
        reject(error);
      }
    );
  });

};

 */


const EditProfileForm  = () => {
  const [success, setSuccess] = useState(false);
  const [typeDocumentOptions, setTypeDocumentOptions] = useState([]);
  const [userInfo, setUserInfo] = useState({ id: "", names: "", surnames: "", typeDocumentId: "", documentNumber: "", phone: "", address: "" });

  const user_id = 1;

  const fetchOptions = () => {
    getTypeDocuments().then((options) => {
      setTypeDocumentOptions(options);
    });
  };

  useEffect(() => {
    fetchOptions();

    const userData = async () => {
      const response = await clientAxios.get(`/user/${user_id}`).then(
        (result) => {
          setUserInfo([result.data].map((user) => (
            { id: user.id, names: user.names, surnames: user.surnames, typeDocumentId: user.typeDocumentId, documentNumber: user.documentNumber, phone: user.phone, address: user.address }
          ))[0]);
        },
        (error) => {
          reject(error);
        }
      );
    };
    userData();
  }, [user_id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    let status = false
    try {
      const response = await clientAxios.put(`/user/${user_id}/profile`,
        values
      );

      if (!response.ok) {
        toast.error(`Error: ${response.body.message}`)
      } else {
        status = true
      }
      toast.success('Usuario actualizado con exito')
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.response.data.message}`)
    }
    if (status){
      toast.success('Usuario actualizado con exito')
    }
  };

  console.log(userInfo)

  return (
    <div className="relative bg-white py-10 px-20 shadow-2xl mdm:py-10 mdm:px-8">
      <div className="bg-white sm:rounded-lg overflow-hidden">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold w-1/2 mr-2 mb-5">Mi perfil</h2>
          <Formik
            enableReinitialize={true}
            initialValues={{
              id: userInfo.id,
              names: userInfo.names,
              surnames: userInfo.surnames,
              typeDocumentId: userInfo.typeDocumentId,
              documentNumber: userInfo.documentNumber,
              phone: userInfo.phone,
              address: userInfo.address,
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={EditProfileSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6 w-full">
                <div className='flex mb-2'>
                  <div key='0' className="w-1/2 mr-2">
                    <label htmlFor="names">Nombres</label>
                    <Field
                      type="text"
                      name="names"
                      id="names"
                      placeholder="Nombres del Usuario"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
                    />
                    <ErrorMessage
                      name="names"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div key='1' className="w-1/2 mr-2">
                    <label htmlFor="surnames">Apellidos</label>
                    <Field
                      type="text"
                      name="surnames"
                      id="surnames"
                      placeholder="Apellidos del Usuario"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
                    />
                    <ErrorMessage
                      name="surnames"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className='flex mb-2'>
                  <div key='2' className="w-1/2 mr-2">
                    <label htmlFor="typeDocumentId">Tipo de Documento</label>
                    <br />
                    <Field name="typeDocumentId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5">
                      <option value="0">Seleccione Tipo de Documento</option>
                      {typeDocumentOptions.map(option => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="typeDocumentId"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div key='3' className="w-1/2 mr-2">
                    <label htmlFor="documentNumber">Número de Documento</label>
                    <Field
                      type="text"
                      name="documentNumber"
                      id="documentNumber"
                      placeholder="Número de Documento del Usuario"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
                    />
                    <ErrorMessage
                      name="documentNumber"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className='flex mb-2'>
                  <div key='4' className="w-1/2 mr-2">
                    <label htmlFor="phone">Teléfono</label>
                    <Field
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Teléfono del Usuario"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div key='6' className="w-1/2 mr-2">
                    <label htmlFor="address">Dirección</label>
                    <Field
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Dirección del Usuario"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div key='7' className="mr-2">
                  <label htmlFor="currentPassword" className="block mb-2">
                    Contraseña Actual
                  </label>
                  <Field
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    placeholder="Contraseña Actual del Usuario"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="text-red-500 mt-2"
                  />
                </div>
                <div key='8' className="mr-2">
                  <label htmlFor="newPassword" className="block mb-2">
                    Nueva Contraseña
                  </label>
                  <Field
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="Nueva Contraseña del Usuario"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 mt-2"
                  />
                </div>
                <div key='9' className="mr-2">
                  <label htmlFor="confirmPassword" className="block mb-2">
                    Confirmar Contraseña
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirmar Nueva Contraseña"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 mt-2"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {isSubmitting ? "Actualizando Información..." : "Actualizar"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};



export default EditProfileForm;
