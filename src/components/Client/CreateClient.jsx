import { Field, Form, Formik, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostClientMutation } from '../../context/Api/Common'
import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'
import Spinner from '../Spinner/Spinner'
import { toast } from 'react-toastify'
import clientAxios from '../../config/clientAxios'
import Select from 'react-select'
const regionalAreas = {
  'REGIONAL AMAZONAS': ['LETICIA'],
  'REGIONAL ANTIOQUIA': ['CALDAS', 'EL BAGRE', 'ITAGUI', 'MEDELLIN', 'CAUCASIA', 'PUERTO BERRIO', 'RIONEGRO', 'URABA'],
  'REGIONAL ARAUCA': ['ARAUCA'],
  'REGIONAL ATLANTICO': ['BARRANQUILLA', 'SABANALARGA'],
  'REGIONAL BOLIVAR': ['CARTAGENA'],
  'REGIONAL BOYACA': ['DUITAMA', 'TUNJA', 'MORCA', 'SOGAMOSO'],
  'REGIONAL CALDAS': ['LA DORADA', 'MANIZALES'],
  'REGIONAL CAQUETA': ['FLORENCIA'],
  'REGIONAL CASANARE': ['YOPAL'],
  'REGIONAL CAUCA': ['POPAYAN'],
  'REGIONAL CESAR': ['VALLEDUPAR', 'AGUACHICA'],
  'REGIONAL CHOCO': ['QUIBDO'],
  'REGIONAL CORDOBA': ['MONTERIA'],
  'REGIONAL CUNDINAMARCA': ['SOACHA', 'VILLETA', 'FUSAGASUGA', 'GIRARDOT', 'MOSQUERA', 'CHIA'],
  'REGIONAL DISTRITO CAPITAL': ['BOGOTÁ'],
  'REGIONAL GUAINIA': ['PUERTO INIRIDA'],
  'REGIONAL GUAVIARE': ['SAN JOSE DEL GUAVIARE'],
  'REGIONAL HUILA': ['CAMPO ALEGRE', 'GARZON', 'LA PLATA', 'NEIVA', 'PITALITO'],
  'REGIONAL LA GUAJIRA': ['RIOHACHA'],
  'REGIONAL MAGDALENA': ['SANTA MARTA'],
  'REGIONAL META': ['VILLAVICENCIO'],
  'REGIONAL NARIÑO': ['IPIALES', 'TUMACO', 'SAN JUAN DE PASTO'],
  'REGIONAL NORTE DE SANTANDER': ['CUCUTA'],
  'REGIONAL PUTUMAYO': ['PUERTO ASIS'],
  'REGIONAL QUINDIO': ['ARMENIA'],
  'REGIONAL RISARALDA': ['PEREIRA', 'DOS QUEBRADAS'],
  'REGIONAL SAN ANDRES PROVIDENCIA': ['SAN ANDRES'],
  'REGIONAL SANTANDER': ['GIRON', 'FLORIDA BLANCA', 'PIEDECUESTA', 'BUCARAMANGA', 'BARRANCABERMEJA', 'SAN GIL', 'MALAGA', 'VELEZ'],
  'REGIONAL SUCRE': ['SINCELEJO'],
  'REGIONAL TOLIMA': ['IBAGUE'],
  'REGIONAL VALLE DEL CAUCA': ['CALI', 'BUGA', 'TULUA', 'BUENAVENTURA', 'CARTAGO', 'PALMIRA'],
  'REGIONAL VAUPES': ['MITU'],
  'REGIONAL VICHADA': ['VICHADA']
  // Agrega las demás regionales y sus áreas aquí
}
const regionales = [
  'REGIONAL AMAZONAS',
  'REGIONAL ANTIOQUIA',
  'REGIONAL ARAUCA',
  'REGIONAL ATLANTICO',
  'REGIONAL BOLIVAR',
  'REGIONAL BOYACA',
  'REGIONAL CALDAS',
  'REGIONAL CAQUETA',
  'REGIONAL CASANARE',
  'REGIONAL CAUCA',
  'REGIONAL CESAR',
  'REGIONAL CHOCO',
  'REGIONAL CORDOBA',
  'REGIONAL CUNDINAMARCA',
  'REGIONAL DISTRITO CAPITAL',
  'REGIONAL GUAINIA',
  'REGIONAL GUAVIARE',
  'REGIONAL HUILA',
  'REGIONAL LA GUAJIRA',
  'REGIONAL MAGDALENA',
  'REGIONAL META',
  'REGIONAL NARIÑO',
  'REGIONAL NORTE DE SANTANDER',
  'REGIONAL PUTUMAYO',
  'REGIONAL QUINDIO',
  'REGIONAL RISARALDA',
  'REGIONAL SAN ANDRES PROVIDENCIA',
  'REGIONAL SANTANDER',
  'REGIONAL SUCRE',
  'REGIONAL TOLIMA',
  'REGIONAL VALLE DEL CAUCA',
  'REGIONAL VAUPES',
  'REGIONAL VICHADA'
]
async function checkEmailExistence (email) {
  try {
    const response = await clientAxios.get('/Client')
    const clients = response.data

    // Verificar si el correo electrónico ya existe en los clientes
    const emailExists = clients.some(client => client.email === email)

    return { exists: emailExists }
  } catch (error) {
    console.error('Error al verificar la existencia del correo electrónico:', error)
    // Manejar el error adecuadamente en tu aplicación
    return { exists: false }
  }
}

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Minimo 3 letras').required('Campo requerido'),
  phone: Yup.string().min(7, 'Minimo 10 digitos').max(10, 'Maximo 10 digitos').required('Campo requerido').matches(/^[0-9]+$/, 'Solo números'),
  email: Yup.string().required('Campo requerido').email('debe tener @, .com').test('unique-email', 'Correo en uso', async function (value) {
    const response = await checkEmailExistence(value)
    return !response.exists // Devuelve false si el correo ya existe
  }),
  center: Yup.string().min(3, 'Minimo 3 letras').max(70, 'Maximo 70 letras').required('Campo requerido'),
  area: Yup.string().min(3, 'Minimo 3 letras').max(70, 'Maximo 70 letras').required('Campo requerido'),
  regional: Yup.string().min(3, 'Minimo 3 letras').max(70, 'Maximo 70 letras').required('Campo requerido')
})

function CreateClient () {
  // Agrega un estado para controlar el valor del select
  // Función para manejar el cambio en el select

  const dispatch = useDispatch()
  const [createClient, { error, isLoading }] = usePostClientMutation()

  const handleSubmit = async (values) => {
    if (isLoading) return <Spinner />

    await createClient(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Cliente creado con exito', {
      autoClose: 1000
    })
  }

  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
        email: '',
        center: '',
        area: '',
        regional: ''
      }}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
      validationSchema={validationSchema}
    >
         {({ values, setFieldValue }) => (
         <Form className="max-w-screen-lg mx-auto p-2">
        <div className="flex gap-5 mb-3">
  <div className="w-full">
    <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
      Nombre Completo
    </label>
    <Field
      type="text"
      name="name"
      id="name"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      placeholder="Nombre"
    />
    <ErrorMessage
      name="name"
      component="div"
      className="text-red-500"
    />
  </div>
</div>
<div className="flex gap-5 mb-3">
<div className="w-full">
    <label htmlFor="campo2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
      Teléfono
    </label>
    <Field
      type="text"
      name="phone"
      id="phone"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      placeholder="Teléfono"
    />
    <ErrorMessage
      name="phone"
      component="div"
      className="text-red-500"
    />
  </div>
  </div>
<div className="flex gap-5 mb-3">
  <div className="w-full">
    <label htmlFor="campo3" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
      Correo
    </label>
    <Field
      type="text"
      name="email"
      id="email"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      placeholder="Correo"
    />
    <ErrorMessage
      name="email"
      component="div"
      className="text-red-500"
    />
  </div>
</div>

<div className="flex gap-5 mb-3">
            <div className="w-1/2">
              <label
                htmlFor="campo3"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Regional
              </label>
              <Select
                name="regional"
                id="regional"
                value={values.regional}
                onChange={(selectedOption) => {
                  const selectedRegional = selectedOption.value
                  setFieldValue('regional', selectedRegional)
                  setFieldValue('area', '') // Resetear el valor del área cuando cambie la regional

                  // Actualizar las opciones del select de áreas
                  const areas = regionalAreas[selectedRegional] || []
                  setFieldValue('areas', areas)
                }}
                options={regionales.map((regional) => ({
                  value: regional,
                  label: regional
                }))}
                placeholder={values.regional ? values.regional : 'Selecciona regional'}
                noOptionsMessage={() => 'No hay opciones disponibles'}
                className="bg-gray-50 text-gray-900 text-sm"
                classNamePrefix="react-select"
                isSearchable
                isClearable
                menuPlacement="auto"
                formatOptionLabel={(option) => (
                  <div>{option.label}</div>
                )}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderColor: state.isSelected ? 'green' : 'gray',
                    boxShadow: state.isSelected ? '0 0 0 1px green' : 'none'
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? 'green' : 'white',
                    color: state.isSelected ? 'white' : 'black'
                  })
                }}
                />
                <ErrorMessage
                  name="regional"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="w-1/2">
              <label
                htmlFor="campo2"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Área
              </label>
              <Select
  name="area"
  id="area"
  value={values.area}
  onChange={(selectedOption) => {
    setFieldValue('area', selectedOption.value)
  }}
  options={(values.areas || []).map((area) => ({
    value: area,
    label: area
  }))}
  placeholder={
    values.area ? values.area : 'Selecciona Área'
  }
  noOptionsMessage={() => 'No hay opciones disponibles'}
  className="bg-gray-50 text-gray-900 text-sm"
  classNamePrefix="react-select"
  isSearchable
  isClearable
  menuPlacement="auto"
  formatOptionLabel={(option) => <div>{option.label}</div>}
  styles={{
  }}
/>
<ErrorMessage
  name="area"
  component="div"
  className="text-red-500"
/>
</div>
</div>
<div className="flex gap-5 mb-3">
  <div className="w-full">
    <label htmlFor="campo1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
      Centro
    </label>
    <Field
      type="text"
      name="center"
      id="center"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      placeholder="Centro"
    />
    <ErrorMessage
      name="center"
      component="div"
      className="text-red-500"
    />
  </div>
</div>

          <button
            type="submit"
            className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-ring-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Registrar cliente
          </button>
        </Form>
         )}
    </Formik>
  )
}

export function CreateButtonClient () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '80%' }))
    dispatch(openModal({ title: 'Crear cliente' }))
    dispatch(setAction({ action: 'creating' }))
  }
  // ?

  return (
    <button
      className="flex items-center justify-center border border-gray-400 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
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
      Registrar cliente
    </button>
  )
}

export default CreateClient
