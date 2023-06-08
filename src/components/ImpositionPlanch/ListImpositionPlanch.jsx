import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetAllImpositionPlanchsQuery } from '../../context/Api/Common'
import ChangeStateImpositionPlanch from './ChangeStateImpositionPlanch'
import { CreateButtomImpositionPlanch } from './CreateImpositionPlanch'
import { UpdateButtomImpositionPlanch } from './UpdateImpositionPlanch'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'

const ListImpositionPlanch = () => {
  // ? Esta linea de codigo se usa para llamar los datos, errores, y el estado de esta cargando las peticiones que se hacen api que se declararon en el context en Api/Common
  const { data, error, isLoading, refetch } = useGetAllImpositionPlanchsQuery()

  // ? Este bloque de codigo hace que la pagina haga un refech al api para poder obtener los cambios hechos
  const { isAction } = useSelector(state => state.modal)
  useEffect(() => {
    refetch()
  }, [isAction])
  // ?

  if (isLoading) return <Spinner />
  if (error) return <Error type={error.status} message={error.error} />

  const columns = [
    { key: 'name', name: 'Nombre imposición' },
    { key: 'scheme', name: 'Esquema imposición' },
    { key: 'statedAt', name: 'Estado' },
    { key: 'actions', name: 'Acciones' }
  ]

  const rows = data
    ? data.map(impositionPlanch => ({
      id: impositionPlanch.id,
      name: impositionPlanch.name,
      scheme: impositionPlanch.scheme,
      statedAt: impositionPlanch.statedAt
    }))
    : []

  return (
    <div className="relative bg-white py-10 px-20 shadow-2xl mdm:py-10 mdm:px-8">
      <div className="bg-white sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                  placeholder="Search"
                  required
                />
              </div>
            </form>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <CreateButtomImpositionPlanch />
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-400">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th scope="col" className='px-6 py-3' key={column.key}>
                    {column.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(impositionPlanch => (
                <tr
                  className="border-b border-gray-500"
                  key={impositionPlanch.id}
                >
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {impositionPlanch.name}
                  </th>
                  <td className="px-4 py-3">{impositionPlanch.scheme}</td>
                  <td className="px-6 py-4">
                    {impositionPlanch.statedAt
                      ? (
                      <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                        Activo
                      </span>
                        )
                      : (
                      <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                        Inactivo
                      </span>
                        )}
                  </td>
                  <td className=" px-6 py-4 grid grid-cols-2  place-content-center">
                    <UpdateButtomImpositionPlanch
                      impositionPlanch={impositionPlanch}
                    />
                    <ChangeStateImpositionPlanch
                      impositionPlanch={impositionPlanch}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav
          className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500">
            Ver
            <span className="font-semibold text-gray-900">1-10</span>
            de
            <span className="font-semibold text-gray-900">1000</span>
          </span>
          <ul className="inline-flex items-stretch -space-x-px">
            <li>
              <a
                href="#"
                className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="sr-only">Anterior</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                ...
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                100
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="sr-only">Siguiente</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default ListImpositionPlanch
