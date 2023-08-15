import { useEffect, useState } from 'react'
import clientAxios from '../../config/clientAxios'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const ForgotPasswordEmail = () => {
  const [email, setEmail] = useState('')

  const usenavigate = useNavigate()

  useEffect(() => {
    sessionStorage.clear()
  }, [])

  const handleEmailSend = async (e) => {
    e.preventDefault()

    const emailVerify = new Promise((resolve, reject) => {
      clientAxios.post('/auth/forgot_password', { email })
        .then((response) => {
          resolve(response.data);
          //usenavigate('/')
        })
        .catch((err) => {
          reject(err.response.data.message);
        });
    })

    toast.promise(emailVerify,
      {
        pending: 'Verificando Correo...',
        success: 'Correo Enviado Exitosamente!',
        error: 'El Correo No se Encuentra Registrado'
      }
    )
  }

  return (
    <>
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
              <div className="flex flex-col items-center justify-center">
                <img src="https://oficinavirtualderadicacion.sena.edu.co/oficinavirtual/Resources/logoSenaNaranja.png" alt="Logo" className="mb-2 w-20 h-20" />
                <h1 className="text-3xl font-semibold text-center text-green-700">
                  Restaurar Contraseña
                </h1>
              </div>
                <form onSubmit={handleEmailSend} className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Correo Electronico
                        </label>
                        <input
                            type="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <Link
                      className='mt-6 mb-6'
                      to={"/"}
                    >
                      <a className='text-blue'>Volver al formulario</a>
                    </Link>
                    <div className="mt-6">
                        <button className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Enviar Correo
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <ToastContainer />
        </>
  )
}

export default ForgotPasswordEmail
