import { useEffect, useState } from 'react'
import clientAxios from '../../config/clientAxios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const queryParameters = new URLSearchParams(window.location.search)

  const usenavigate = useNavigate()

  useEffect(() => {
    sessionStorage.clear()
    setEmail(queryParameters.get("email"))
    setToken(queryParameters.get("token"))
    if(token == null || email == null) {
      toast.error('Token de recuperacion o correo invalido')
      usenavigate('/')
    }
  }, [])

  const handleForgotPassword = async (e) => {
    e.preventDefault()

    await clientAxios.post('/auth/recovery_password', { email, token, password, confirmPassword }).then((response) => {
      return response.data
    }).then((resp) => {
      //alert(resp.message)
      toast.success(resp.message)
      usenavigate('/')
    }).catch((err) => {
      toast.error('Token de recuperacion o correo invalido')
    })
  }

  return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
              <div className="flex flex-col items-center justify-center">
                <img src="https://oficinavirtualderadicacion.sena.edu.co/oficinavirtual/Resources/logoSenaNaranja.png" alt="Logo" className="mb-2 w-20 h-20" />
                <h1 className="text-3xl font-semibold text-center text-green-700">
                  Restaurar Contraseña
                </h1>
              </div>
                <form onSubmit={handleForgotPassword} className="mt-6">
                    <input
                        type="hidden"
                        value={email}
                        required
                    />
                    <input
                        type="hidden"
                        value={token}
                        required
                    />
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
                    <div className="mb-2">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custom-blue block w-full p-2.5"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                          Restaurar
                        </button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default ForgotPassword
