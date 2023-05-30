import { useEffect, useState } from 'react'
import clientAxios from '../../config/clientAxios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const usenavigate = useNavigate()

  useEffect(() => {
    sessionStorage.clear()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    await clientAxios.post('/auth/login', { email, password }).then((response) => {
      return response.data
    }).then((resp) => {
      alert(resp.message)
      if (resp.token.length !== 0) {
        sessionStorage.setItem('session_token', resp.token)
        usenavigate('/dashboard')
      }
    }).catch((err) => {
      alert(err.response.data.message)
    })
  }

  return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-700">
                  Inicio de Sesion
                </h1>
                <form onSubmit={handleLogin} className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Correo Electronico
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Iniciar Sesion
                        </button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default Login
