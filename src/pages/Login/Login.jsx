import { useEffect, useState } from 'react'
import clientAxios from '../../config/clientAxios'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import jwtDecode from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const usenavigate = useNavigate()

  useEffect(() => {
    localStorage.clear()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    await clientAxios.post('/auth/login', { email, password }).then((response) => {
      return response.data
    }).then((resp) => {
      //alert(resp.message)
      if (resp.token.length !== 0) {
        const token = resp.token;
        const decodedToken = jwtDecode(token); // Decodificar el token JWT
        localStorage.setItem('session_token', token);
        localStorage.setItem('UserId', decodedToken.id);
        toast.success(resp.message);
        usenavigate('/');
      }
    }).catch((err) => {
      toast.error(err.response.data.message)
      //alert(err.response.data.message)
    })
  }

  return (
    <>
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
              <div className="flex flex-col items-center justify-center">
                <img src="https://oficinavirtualderadicacion.sena.edu.co/oficinavirtual/Resources/logoSenaNaranja.png" alt="Logo" className="mb-2 w-20 h-20" />
                <h1 className="text-3xl font-semibold text-center text-green-700">
                  Inicio de Sesión
                </h1>
              </div>
                <form onSubmit={handleLogin} className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Link
                      className='mt-6 mb-6'
                      to={"/olvide_contraseña"}
                    >
                      <a className='text-blue'>Olvidé mi Contraseña</a>
                    </Link>
                    <div className="mt-6">
                        <button className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <ToastContainer />
    </>
  )
}

export default Login
