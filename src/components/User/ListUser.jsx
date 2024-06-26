import { useEffect, useState, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useTable, usePagination, useGlobalFilter } from 'react-table'
import { useGetAllUsersQuery } from '../../context/Api/Common'
import { DetailsButtonUser } from './DetailsUser'
import { ChangeStateButtonUser } from './ChangeStateUser'
import { CreateButtomUser } from './CreateUser'
import { UpdateButtomUser } from './UpdateUser'
import { BsFillFileEarmarkBreakFill } from 'react-icons/bs'
import { useReactToPrint } from 'react-to-print'
import ReportUser from './ReportUser'
import clientAxios from '../../config/clientAxios'

const getTypeDocuments = async () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/type_document').then(
      (result) => {
        const typeDocuments = result.data.map((type_document) => ({
          'label': type_document.name,
          'value': type_document.id
        }));
        resolve(typeDocuments);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const getRoles = async () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/role').then(
      (result) => {
        const roles = result.data.map((role) => ({
          'label': role.name,
          'value': role.id
        }));
        resolve(roles);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

const ListUser = () => {

  const tablePDF = useRef()

  const generatePDF = useReactToPrint({
    content: () => tablePDF.current,
    documentTitle: 'Informe de Usuarios'
  })

  // ? Esta linea de codigo se usa para llamar los datos, errores, y el estado de esta cargando las peticiones que se hacen api que se declararon en el context en Api/Common
  const { data: dataApi, refetch } = useGetAllUsersQuery()

  const [typeDocumentOptions, setTypeDocumentOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);

  const fetchOptions = () => {
    getTypeDocuments().then((options) => {
      setTypeDocumentOptions(options);
    });
    getRoles().then((options) => {
      setRoleOptions(options);
    });
  };

  // ? Este bloque de codigo hace que la pagina haga un refech al api para poder obtener los cambios hechos
  const { isAction } = useSelector((state) => state.modal)

  useEffect(() => {
    fetchOptions()
    refetch()
  }, [isAction])
  // ?

  //console.log(dataApi)

  const columns = useMemo(() => [
    { Header: 'Número de Documento', accessor: 'documentNumber' },
    { Header: 'Tipo de Documento', accessor: 'typeDocument.abbreviation' },
    { Header: 'Nombres', accessor: 'names' },
    { Header: 'Apellidos', accessor: 'surnames' },
    { Header: 'Correo Electrónico', accessor: 'email' },
    { Header: 'Rol', accessor: 'role.name' },
    {
      Header: 'Estado',
      accessor: 'statedAt',
      Cell: ({ value }) => (value
        ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          Activo
        </span>
        : <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
          Inactivo
        </span>)
    }
  ], [])

  const data = useMemo(() => (dataApi || []), [dataApi])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
    setGlobalFilter,
    prepareRow
  } = useTable({
    data,
    columns
  },
    useGlobalFilter,
    usePagination)

  const { pageIndex, globalFilter } = state

  if (!dataApi) {
    return <div>Cargando...</div>
  }
  console.log(dataApi)
  return (
    <>
      <div className='hidden'>
        <div ref={tablePDF}>
          <ReportUser dataApi={dataApi} />
        </div>
      </div>
      <div className="relative bg-white py-6 px-20 shadow-2xl mdm:py-6 mdm:px-8 mb-2">
        <button
          className="flex items-center justify-center border border-gray-400 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 gap-3"
          onClick={generatePDF}
          type="button"
        >
          <BsFillFileEarmarkBreakFill />
          Crear un informe
        </button>
      </div>
      <div className="relative bg-white py-10 px-20 shadow-2xl mdm:py-10 mdm:px-8">
        <div className="bg-white sm:rounded-lg overflow-hidden">
          {dataApi.length === 0
            ? (
              <>
                <div className="relative bg-white py-10 px-20 shadow-xl mdm:py-10 mdm:px-8">
                  <h1 className="text-center text-3xl font-bold mb-10">No hay registros en la base de datos</h1>
                  <p className="text-center text-xl">Para empezar a visualizar la información debes de crear un usuario</p>
                  <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-center md:space-x-3 flex-shrink-0 mt-10">
                    <CreateButtomUser />
                  </div>
                </div>
              </>
            )
            : (
              <>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 pb-6">
                  <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                      <label htmlFor="simple-search" className="sr-only">
                        Buscar
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
                          placeholder="Buscar..."
                          value={globalFilter || ''}
                          onChange={e => setGlobalFilter(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <CreateButtomUser />
                  </div>
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-400">
                  <table className="w-full text-sm text-left text-gray-500" {...getTableProps()}>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      {headerGroups.map(headerGroup => (
                        <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column, index) => (
                            <th scope="col" className='px-6 py-3' key={`${column.id}-${index}`} {...column.getHeaderProps()}>
                              {column.render('Header')}
                            </th>
                          ))}
                          <th scope="col" key={5} className='px-6 py-3'>
                            Acciones
                          </th>
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page.map(row => {
                        prepareRow(row)
                        return (
                          <tr
                            {...row.getRowProps()}
                            key={row.original.id}
                            className="border-b border-gray-500"
                          >
                            {row.cells.map((cell, index) => {
                              //console.log(cell)
                              return (<td {...cell.getCellProps()} key={`${cell.column.id}-${index}`} className="px-4 py-3">{typeof cell.value === 'function' ? cell.value(cell) : cell.render('Cell')}</td>)
                            })}
                            <td className="px-6 py-4 grid grid-cols-3  place-content-center" key={5}>
                              <DetailsButtonUser
                                user={row.original}
                              />
                              <UpdateButtomUser
                                user={row.original}
                              />
                              <ChangeStateButtonUser
                                user={row.original}
                              />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <nav
                    className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                  >
                    <span className="text-sm font-normal text-gray-500">
                      Página {' '}
                      <span className="font-semibold text-gray-900">{pageIndex + 1}</span>
                    </span>
                    <ul className="inline-flex items-stretch -space-x-px">
                      <li>
                        <button
                          className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          onClick={() => previousPage()}
                          disabled={!canPreviousPage}
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
                        </button>
                      </li>
                      <li>
                        <a
                          className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                          -
                        </a>
                      </li>
                      <li>
                        <button
                          className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          onClick={() => nextPage()}
                          disabled={!canNextPage}
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
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default ListUser
