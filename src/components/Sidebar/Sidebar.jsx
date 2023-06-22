import { Link, useLocation } from 'react-router-dom'
import { BsGear, BsNewspaper } from 'react-icons/bs'

function Sidebar () {
  const location = useLocation()
  const path = location.pathname

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 drop-shadow-xl overflow-y-auto"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-10 bg-white">
        <ul className="space-y-2 font-semibold">
          <li>
            <button
              type="button"
              className="flex items-center w-full p-3 text-gray-900 transition duration-75 rounded-lg group hover:bg-green-500"
              aria-controls="dropdown-example"
              data-collapse-toggle="dropdown-example"
            >
              <BsGear className="w-[1.5rem] h-[1.5rem]" />
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Configuracion
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
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/roles' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3">Roles</span>
                </Link>
              </li>
              <li>
                <Link
                  to={'/tipos_documentos'}
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/tipos_documentos' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3">Tipo de Documentos</span>
                </Link>
              </li>
              <li>
                <Link
                  to={'/usuarios'}
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/usuarios' ? 'bg-green-500' : null}`}
                >
                  <span className="ml-3">Usuarios</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <button
              type="button"
              className="flex items-center w-full p-3 text-gray-900 transition duration-75 rounded-lg group hover:bg-green-500"
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
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/warehause' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3 text-base">Bodega</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <button
              type="button"
              className="flex items-center w-full p-3 text-gray-900 transition duration-75 rounded-lg group hover:bg-green-500"
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
                  to="/unitMesure"
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/UnitMesure' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3 text-base">Unidades de Medida</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/supplyPictograms"
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/supplyPictograms' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3 text-base">Pictogramas</span>
                </Link>
              </li>
              <li>
                <Link
                  to={'/supplyCategory'}
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/supplyCategory' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3">Categoria de Insumos</span>
                </Link>
              </li>
              <li>
                <Link
                  to={'/supply'}
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/supply' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3">Insumos</span>
                </Link>
              </li>
              <li>
                <Link
                  to={'/supplyDetails'}
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/supplyDetails' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3">Loteo de Insumos</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <button
              type="button"
              className="flex items-center w-full p-3 text-gray-900 transition duration-75 rounded-lg group hover:bg-green-500"
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
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/provider' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3 text-base">Proveedor</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/quotitationProviders"
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/quotitationProviders' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3 text-base">
                    Cotización a Proveedores
                  </span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <button
              type="button"
              className="flex items-center w-full p-3 text-gray-900 transition duration-75 rounded-lg group hover:bg-green-500"
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
              <li>
                <Link
                  to="/typeServices"
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/typeServices' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3 text-base">Tipo de servicio</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/Machine"
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/Machine' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3 text-base">Maquinas</span>
                </Link>
              </li>
              <li>
                <Link
                  to={'/Finish'}
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/Finish' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3">Acabados</span>
                </Link>
              </li>
              <li>
                <Link
                  to={'/product'}
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/product' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3">Productos</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/clients"
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/clients' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3 text-base">Clientes</span>
                </Link>
              </li>
              <li>
                <Link
                  to={'/quotationClient'}
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/quotationClient' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3">Cotizacion Cliente</span>
                </Link>
              </li>

              <li>
                <Link
                  to={'/quotationclientDetail'}
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/quotationclientDetail' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3">Cotizacion Cliente Detalles</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <button
              type="button"
              className="flex items-center w-full p-3 text-gray-900 transition duration-75 rounded-lg group hover:bg-green-500"
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
                  to="/Lineature"
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/Lineature' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3 text-base">Lineatura</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/impositionPlanch"
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/impositionPlanch' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3 text-base">Imposición plancha</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/paper_cut"
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/paper_cut' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3 text-base">Corte Papel</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/grammage_caliber"
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/grammage_caliber' ? 'bg-green-500' : null}`}
                >
                  <span className="ml-3 text-base">Gramaje & Calibre</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/substrate"
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/grammage_caliber' ? 'bg-green-500' : null}`}
                >
                  <span className="ml-3 text-base">Sustratos</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/OrderProduction"
                  className={`flex items-center p-3 text-gray-900 rounded-lg hover:bg-green-500 ${path === '/OrderProduction' ? 'bg-green-500' : null}`}
                >

                  <span className="ml-3 text-base">Orden de producción</span>
                </Link>
              </li>
            </ul>
          </li>
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

export default Sidebar
