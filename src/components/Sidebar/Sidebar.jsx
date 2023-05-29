import { Link } from 'react-router-dom'

function Sidebar () {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to={'/dashboard'}
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to={'/product'}
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Productos</span>
            </Link>
          </li>
          <li>
            <Link
              to={'/supply'}
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Insumos</span>
            </Link>
          </li>
          <li>
            <Link
              to={'/supplyCategory'}
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Categoria de Insumos</span>
            </Link>
          </li>
          <li>
            <Link
              to={'/roles'}
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Roles</span>
            </Link>
          </li>
          <li>
            <Link
              to={'/tipos_documentos'}
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Tipo de Documentos</span>
            </Link>
          </li>
          <li>
            <Link
              to={'/usuarios'}
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Usuarios</span>
            </Link>
          </li>
          <li>
            <Link
              to={'/Finish'}
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span className="ml-3">Acabados</span>
            </Link>
          </li>
          <li>
              <Link
                to='/provider'
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-500"
              >
                <svg
                  aria-hidden="true"
                  className="w-7 h-7 text-gray-500 transition duration-75"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3 text-base">Proveedor</span>
              </Link>
            </li>
            <li>
              <Link
                to='/Machine'
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-500"
              >
                <svg
                  aria-hidden="true"
                  className="w-7 h-7 text-gray-500 transition duration-75"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3 text-base">Maquinas</span>
              </Link>
            </li>
            <li>
              <Link
                to='/clients'
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-500"
              >
                <svg
                  aria-hidden="true"
                  className="w-7 h-7 text-gray-500 transition duration-75"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3 text-base">Clientes</span>
              </Link>
            </li>
            <li>
              <Link
                to='/substrate'
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-500"
              >
                <svg
                  aria-hidden="true"
                  className="w-7 h-7 text-gray-500 transition duration-75"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3 text-base">Sustratos</span>
              </Link>
            </li>
            <li>
              <Link
                to='/paper_cut'
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-500"
              >
                <svg
                  aria-hidden="true"
                  className="w-7 h-7 text-gray-500 transition duration-75"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3 text-base">Corte Papel</span>
              </Link>
            </li>
            <li>
              <Link
                to='/grammage_caliber'
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-green-500"
              >
                <svg
                  aria-hidden="true"
                  className="w-7 h-7 text-gray-500 transition duration-75"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3 text-base">Gramaje & Calibre</span>
              </Link>
            </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
