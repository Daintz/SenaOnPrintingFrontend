import { Link } from 'react-router-dom'

function Sidebar () {
  return (
    <div className="col-span-2">
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="separator-sidebar"
        className="h-screen shadow-xl transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to='/dashboard'
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
                <span className="ml-3 text-base">Dashboard</span>
              </Link>
            </li>
          </ul>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to='/supply'
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
                <span className="ml-3 text-base">Supply</span>
              </Link>
            </li>
            <li>
              <Link
                to='/SupplyCategory'
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
                <span className="ml-3 text-base">Supply Category</span>
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
                to='/Finish'
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
                <span className="ml-3 text-base">Acabados</span>
              </Link>
            </li>
            <li>
              <Link
                to='/UnitMesure'
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
                <span className="ml-3 text-base">Unidades de Medida</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
