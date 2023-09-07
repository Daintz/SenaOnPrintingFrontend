import { useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useTable, usePagination, useGlobalFilter } from 'react-table'
import { useGetAllQuotationProvidersQuery } from '../../context/Api/Common'
import { ChangeStateButtonQuotationProviders } from './ChangeStatedQuotationProviders'
import { CreateButtomQuotationProviders } from './CreateQuotationProviders'
import { DetailsButtomQuotationProviders } from './DetailsQuotationProviders'
import { BsFillFileEarmarkBreakFill } from 'react-icons/bs'
import { useReactToPrint } from 'react-to-print'
import  ReportQuotationProviders  from './ReportQuotationProviders'


const ListQuotationProviders = () => {

  const tablePDF = useRef()

  const generatePDF = useReactToPrint({
    content: () => tablePDF.current,
    documentTitle: 'Informe de Cotización a proveedores'
  })


  const { data: dataApi, refetch } = useGetAllQuotationProvidersQuery()

  const { isAction } = useSelector(state => state.modal)
  useEffect(() => {
    refetch()
  }, [isAction])

  console.log(dataApi);
  // ?




  const columns = useMemo(()=>[
    {Header: 'Fecha', accessor: 'quotationDate' },
    { Header: 'Documento', accessor: 'quotationFile' },
    {Header: 'Valor', accessor: 'fullValue'},
    {Header: 'Id Proveedor', accessor: 'provider.nameCompany'},
    {Header: 'Estado',
    accessor: 'statedAt',
    Cell: ({ value }) => (value
      ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          Activo
        </span>
      : <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
          Inactivo
        </span>)
  },
  ], [])
  

  const data = useMemo(()=>(dataApi || []),[dataApi])
  useEffect(() => {
    refetch()
  }, [isAction])
  // ?

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
    return <div>Loading...</div>
  }

  return (
    <>
    <div className='hidden'>
      <div ref={tablePDF}>
        <ReportQuotationProviders dataApi={dataApi}/>
      </div>
    </div>
    <div className="relative bg-white py-6 px-20 shadow-2xl mdm:py-6 mdm:px-8 mb-2">
    <button
    className="flex items-center justify-center border border-gray-400 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 gap-3"
      onClick={ generatePDF }
      type="button"
    >
      <BsFillFileEarmarkBreakFill className='w-5 h-5'/>
      Crear un informe
    </button>
    </div>
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
                  value={globalFilter || ''}
                  onChange={e => setGlobalFilter(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <CreateButtomQuotationProviders />
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-400">
          <table className="w-full text-sm text-left text-gray-500"{...getTableProps()}>
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
                     <td {...row.cells[0].getCellProps()} className="px-4 py-3">
                      {typeof row.cells[0].value === 'function'
                        ? row.cells[0].value(row.cells[0])
                        : row.cells[0].render('Cell')}
                    </td>
                   <b> <a href={`https://localhost:7262/api/QuotationProviders/file/${row.original.id}`} download >
                       Descargar Cotización
                      </a></b>
                    <td {...row.cells[2].getCellProps()} className="px-4 py-3">
                      {typeof row.cells[2].value === 'function'
                        ? row.cells[2].value(row.cells[2])
                        : row.cells[2].column.id === 'QuotationProviderFile'
                          ? <img src={row.cells[2].value} width={100} height={100}/>
                          : row.cells[2].render('Cell')}
                    </td>
                   
                    <td {...row.cells[3].getCellProps()} className="px-4 py-3">
                      {typeof row.cells[3].value === 'function'
                        ? row.cells[3].value(row.cells[3])
                        : row.cells[3].render('Cell')}
                    </td>
                    <td {...row.cells[4].getCellProps()} className="px-4 py-3">
                      {typeof row.cells[4].value === 'function'
                        ? row.cells[4].value(row.cells[4])
                        : row.cells[4].render('Cell')}
                    </td>
                    <td className="px-6 py-4 grid grid-cols-3  place-content-center" key={5}>

                    
                 
                      <ChangeStateButtonQuotationProviders
                        quotationProviders={row.original}
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
            Pagina {' '}
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
      </div>
    </div>
    </>
  )
}

export default ListQuotationProviders