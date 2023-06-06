import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetAllSupplyCategoryQuery } from '../../context/Api/Common'
import ChangeStateSupplyCategory from './ChangeStateSupplyCategory'
import { CreateButtomSupplyCategory } from './CreateSupplyCategory'
import { UpdateButtomSupplyCategory } from './UpdateSupplyCategory'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'

const ListSupplyCategory = () => {
  // ? Esta linea de codigo se usa para llamar los datos, errores, y el estado de esta cargando las peticiones que se hacen api que se declararon en el context en Api/Common
  const { data, error, isLoading, refetch } = useGetAllSupplyCategoryQuery()

  // ? Este bloque de codigo hace que la pagina haga un refech al api para poder obtener los cambios hechos
  const { isAction } = useSelector((state) => state.modal)
  useEffect(() => {
    refetch()
  }, [isAction])
  // ?

  if (isLoading) return <Spinner />
  if (error) return <Error type={error.status} message={error.error} />

  const columns = [
    { key: 'name', name: 'Nombre' },
    { key: 'description', name: 'Descripcion' },
    { key: 'statedAt', name: 'Estado' },
    { key: 'actions', name: 'Acciones' }
  ]

  const rows = data
    ? data.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      statedAt: category.statedAt
    }))
    : []

  return (
    <div className="relative bg-white py-10 px-20 shadow-2xl mdm:py-10 mdm:px-8">
      <CreateButtomSupplyCategory />
      <div className="relative overflow-x-auto shadow-sm border">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-300">
          <tr>
            {columns.map((column) => (
              <th scope="col" className='px-6 py-3' key={column.key}>
                {column.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map(supplyCategory => (
            <tr className="bg-white border-b" key={supplyCategory.id}>
              <th
                scope="row"
                className="px-6 py-4 font-medium clm:font-normal text-gray-900 whitespace-nowrap"
              >
                {supplyCategory.name}
              </th>
              <td className="px-6 py-4">{supplyCategory.description}</td>
              <td className="px-6 py-4">
                {supplyCategory.statedAt
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
              <UpdateButtomSupplyCategory
                supplyCategory={supplyCategory}
              />
              <ChangeStateSupplyCategory
                supplyCategory={supplyCategory}
              />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default ListSupplyCategory
