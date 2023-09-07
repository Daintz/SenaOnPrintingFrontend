import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BsGear, BsNewspaper } from 'react-icons/bs'
import { useJwt } from "react-jwt";
import useToken from '../../context/Helpers/useToken'

function Sidebar () {
  const location = useLocation()
  const path = location.pathname
  const navigate = useNavigate();
  const  { token } = useToken();
  if (!token) {
    // user is not authenticated
    navigate("/login")
  }
  const { decodedToken, isExpired } = useJwt(token);
  // console.log(decodedToken)

  if (decodedToken == null || isExpired) {
    navigate("/login")
  } else
  {
    const permissions = decodedToken.permissions
    // console.log(permissions)
    return (
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 drop-shadow-xl overflow-y-auto"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-10 bg-white">
          <ul className="space-y-2 font-semibold">
            { permissions.includes('Configuration') &&
                <li>
                <button
                  type="button"
                  className="flex items-center w-full p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue transition duration-75"
                  aria-controls="dropdown-example0"
                  data-collapse-toggle="dropdown-example0"
                >
                  <BsGear className="w-[1.5rem] h-[1.5rem]" />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Configuración
                  </span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  ></svg>
                </button>
                <ul id="dropdown-example0" className="hidden py-2 space-y-2">
                  <li>
                    <Link
                      to={'/Finish'}
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/Finish' ? 'bg-custom-blue text-white' : null}`}
                    >
                      <span className="ml-3">Acabados</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'/product'}
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/product' ? 'bg-custom-blue text-white' : null}`}
                    >
                      <span className="ml-3">Productos</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/supplyPictograms"
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/supplyPictograms' ? 'bg-custom-blue text-white' : null}`}
                    >
                      <span className="ml-3 text-base">Pictogramas</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Machine"
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/Machine' ? 'bg-custom-blue text-white' : null}`}
                    >
                      <span className="ml-3 text-base">Maquinas</span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to="/impositionPlanch"
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/impositionPlanch' ? 'bg-custom-blue text-white' : null}`}
                    >
                      <span className="ml-3 text-base">Imposición plancha</span>
                    </Link>
                  </li> */}
                </ul>
              </li>
            }
            { permissions.includes('User') &&
              <li>
              <button
                type="button"
                className="flex items-center w-full p-3 text-gray-900 transition duration-75 group hover:text-white rounded-lg hover:bg-custom-blue"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-gear" viewBox="0 0 16 16">
                  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Usuarios
                </span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                ></svg>
              </button>
              <ul id="dropdown-example" className="hidden py-2 space-y-2">
                <li>
                  <Link
                    to={'/roles'}
                    className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/roles' ? 'bg-custom-blue text-white' : null}`}
                  >

                    <span className="ml-3">Roles</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/usuarios'}
                    className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/usuarios' ? 'bg-custom-blue text-white' : null}`}
                  >
                    <span className="ml-3">Usuarios</span>
                  </Link>
                </li>
              </ul>
            </li>
            }
            { permissions.includes('Warehouse') &&
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-3 text-gray-900 transition duration-75 group hover:text-white rounded-lg hover:bg-custom-blue"
                  aria-controls="dropdown-example2"
                  data-collapse-toggle="dropdown-example2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    className="bi bi-building-up"
                    viewBox="0 0 20 20"
                  >
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0Z" />
                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a.5.5 0 0 1-1 0V1H3v14h3v-2.5a.5.5 0 0 1 .5-.5H8v4H3a1 1 0 0 1-1-1V1Z" />
                    <path d="M4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" />
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Bodega
                  </span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  ></svg>
                </button>
                <ul id="dropdown-example2" className="hidden py-2 space-y-2">
                  <li>
                    <Link
                      to="/warehause"
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/warehause' ? 'bg-custom-blue text-white' : null}`}
                    >

                      <span className="ml-3 text-base">Bodega</span>
                    </Link>
                  </li>
                </ul>
              </li>
            }
            { permissions.includes('Supply') &&
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-3 text-gray-900 transition duration-75 group hover:text-white rounded-lg hover:bg-custom-blue"
                  aria-controls="dropdown-example3"
                  data-collapse-toggle="dropdown-example3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    className="bi bi-boxes"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z" />
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Insumos
                  </span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  ></svg>
                </button>
                <ul id="dropdown-example3" className="hidden py-2 space-y-2">
                  <li>
                    <Link
                      to={'/supplyCategory'}
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/supplyCategory' ? 'bg-custom-blue text-white' : null}`}
                    >

                      <span className="ml-3">Categoría de Insumos</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'/supply'}
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/supply' ? 'bg-custom-blue text-white' : null}`}
                    >

                      <span className="ml-3">Insumos</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'/supplyDetails'}
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/supplyDetails' ? 'bg-custom-blue text-white' : null}`}
                    >

                      <span className="ml-3">Compra de Insumos</span>
                    </Link>
                  </li>
                </ul>
              </li>
            }

            { permissions.includes('Provider') &&
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-3 text-gray-900 transition duration-75 group hover:text-white rounded-lg hover:bg-custom-blue"
                  aria-controls="dropdown-example4"
                  data-collapse-toggle="dropdown-example4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    className="bi bi-truck"
                    viewBox="0 0 20 20"
                  >
                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Proveedores
                  </span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  ></svg>
                </button>
                <ul id="dropdown-example4" className="hidden py-2 space-y-2">
                  <li>
                    <Link
                      to="/provider"
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/provider' ? 'bg-custom-blue text-white' : null}`}
                    >

                      <span className="ml-3 text-base">Proveedor</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/quotitationProviders"
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/quotitationProviders' ? 'bg-custom-blue text-white' : null}`}
                    >

                      <span className="ml-3 text-base">
                        Cotización a Proveedores
                      </span>
                    </Link>
                  </li>
                </ul>
              </li>
            }
            { permissions.includes('Client') &&
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-3 text-gray-900 transition duration-75 group hover:text-white rounded-lg hover:bg-custom-blue"
                  aria-controls="dropdown-example5"
                  data-collapse-toggle="dropdown-example5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    className="bi bi-people"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                  </svg>
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Clientes
                  </span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  ></svg>
                </button>
                <ul id="dropdown-example5" className="hidden py-2 space-y-2">
                  {/* <li>
                    <Link
                      to="/typeServices"
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/typeServices' ? 'bg-custom-blue text-white' : null}`}
                    >

                      <span className="ml-3 text-base">Tipo de servicio</span>
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      to="/clients"
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/clients' ? 'bg-custom-blue text-white' : null}`}
                    >

                      <span className="ml-3 text-base">Clientes</span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to={'/quotationClient'}
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/quotationClient' ? 'bg-custom-blue text-white' : null}`}
                    >

                      <span className="ml-3">Cotizacion Cliente</span>
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      to={'/quotation'}
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/quotation' ? 'bg-custom-blue text-white' : null}`}
                    >

                      <span className="ml-3">Cotizacion</span>
                    </Link>
                  </li>

                {/*  <li>
                    <Link
                      to={'/quotationclientDetail'}
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/quotationclientDetail' ? 'bg-custom-blue text-white' : null}`}
                    >
                      <span className="ml-3">Cotizacion Cliente Detalles</span>
                    </Link>
                  </li> */}
                </ul>
              </li>
            }

            { permissions.includes('Production') &&
              <li>
                <button
                  type="button"
                  className="flex items-center w-full p-3 text-gray-900 transition duration-75 group hover:text-white rounded-lg hover:bg-custom-blue"
                  aria-controls="dropdown-example6"
                  data-collapse-toggle="dropdown-example6"
                >
                  <BsNewspaper className="w-[1.5rem] h-[1.5rem]" />
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    Producción
                  </span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  ></svg>
                </button>
                <ul id="dropdown-example6" className="hidden py-2 space-y-2">
                  <li>
                    <Link
                      to="/OrderProduction"
                      className={`flex items-center p-3 text-gray-900 hover:text-white rounded-lg hover:bg-custom-blue ${path === '/OrderProduction' ? 'bg-custom-blue text-white' : null}`}
                    >
                      <span className="ml-3 text-base">Orden de producción</span>
                    </Link>
                  </li>
                </ul>
              </li>
            }
          </ul>
        </div>
        <style>
          {`
            /* Estilo para ocultar la barra lateral de desplazamiento */
            #logo-sidebar::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
      </aside>
    )
  }
}

export default Sidebar
