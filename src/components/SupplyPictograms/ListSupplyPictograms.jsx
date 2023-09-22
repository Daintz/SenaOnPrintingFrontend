import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useTable, usePagination, useGlobalFilter } from 'react-table'
import { useGetAllSupplyPictogramsQuery } from '../../context/Api/Common'
import { ChangeStateButtonSupplyPictograms } from '../SupplyPictograms/ChangeStatedSupplyPictograms'
import { CreateButtomSupplyPictograms } from '../SupplyPictograms/CreateSupplyPictograms'
import { DetailsButtomSupplyPictograms } from '../SupplyPictograms/DetailsSypplyPictograms'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
const ListSupplyPictograms = () => {
  // ? Esta linea de codigo se usa para llamar los datos, errores, y el estado de esta cargando las peticiones que se hacen api que se declararon en el context en Api/Common
  const { data: dataApi, error, isLoading, refetch } = useGetAllSupplyPictogramsQuery()

  // ? Este bloque de codigo hace que la pagina haga un refech al api para poder obtener los cambios hechos
  const { isAction } = useSelector(state => state.modal)
  useEffect(() => {
    refetch()
  }, [isAction])
  // ?



  const columns = useMemo(() => [
    { Header: 'Codigo', accessor: 'code' },
    { Header: 'Nombre', accessor: 'name' },
    { Header: 'Descripcion', accessor: 'description' },
    { Header: 'Imagen', accessor: 'pictogramFile' },
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
    },
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

  if (isLoading) return <Spinner />
  if (error) return <Error type={error.status} message={error.error} />


  return (
    <div className="relative bg-white py-10 px-20 shadow-2xl mdm:py-10 mdm:px-8">
      <div className="bg-white sm:rounded-lg overflow-hidden">
      {dataApi.length === 0
            ? (
              <>
                <div className="relative bg-white py-10 px-20 shadow-xl mdm:py-10 mdm:px-8">
                  <h1 className="text-center text-3xl font-bold mb-10">No hay registros en la base de datos</h1>
                  <p className="text-center text-xl">Para empezar a visualizar la información debes de crear una Pictograma</p>
                  <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-center md:space-x-3 flex-shrink-0 mt-10">
                  <CreateButtomSupplyPictograms />
                  </div>
                </div>
              </>
            )
            :
            (
              <>
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">

              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                </div>
              </div>
            </form>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <CreateButtomSupplyPictograms />
          </div>
        </div>

        <div className="flex flex-wrap justify-center -mx-4">
          {console.log(dataApi)}
          {dataApi.map(supplyPictogram => (
            
            <div
              key={supplyPictogram.id}
              className="w-1/4 max-w-sm p-4 mx-4 my-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-300"
            >
              <div className="flex justify-center">
                <img
                  src={supplyPictogram.pictogramFile}
                  width="300px"
                  height="300px"
                />
              </div>
              <p><b>Código:</b> {supplyPictogram.code}</p>
              <p><b>Símbolo:</b> {supplyPictogram.description}</p>
              <p><b>Nombre del pictograma:</b> {supplyPictogram.name}</p>
              <div className="flex justify-between items-center mt-2">
                <p>
                  <b>Estado:</b>{' '}
                  {supplyPictogram.statedAt ? (
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      Activo
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                      Inactivo
                    </span>
                  )}
                </p>
                <ChangeStateButtonSupplyPictograms
                  supplyPictograms={supplyPictogram}
                />
              </div>
            </div>
          ))}
        </div>
        </>
          )
}
      </div>



      {/* <table className="w-full text-sm text-left text-gray-500"{...getTableProps()}>
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
                    <td {...row.cells[1].getCellProps()} className="px-4 py-3">
                      {typeof row.cells[1].value === 'function'
                        ? row.cells[1].value(row.cells[1])
                        : row.cells[1].render('Cell')}
                    </td>
                    <td {...row.cells[2].getCellProps()} className="px-4 py-3">
                      {typeof row.cells[2].value === 'function'
                        ? row.cells[2].value(row.cells[2])
                        : row.cells[2].render('Cell')}
                    </td>
                    <td {...row.cells[3].getCellProps()} className="px-4 py-3">
                          <img src={row.cells[3].value} width={100} height={100}/>
                    </td>
                   
                    <td {...row.cells[4].getCellProps()} className="px-4 py-3">
                      {typeof row.cells[4].value === 'function'
                        ? row.cells[4].value(row.cells[4])
                        : row.cells[4].render('Cell')}
                    </td>
               
                    <td className="px-6 py-4 grid grid-cols-3  place-content-center" key={5}>
                      <DetailsButtomSupplyPictograms
                        supplyPictograms={row.original}
                      />
    
                      
                      <ChangeStateButtonSupplyPictograms
                        supplyPictograms={row.original}
                      />
                    </td>
                    
                  </tr>
                )
              })}
            </tbody>
          </table> */}

    </div>

  )
}

export default ListSupplyPictograms