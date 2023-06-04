import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetAllProductsQuery } from '../../context/Api/Common'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'
import { UpdateButtomProduct } from './UpdateProduct'
import { CreateButtomProduct } from './CreateProduct'
import ChangeStateProduct from './ChangeStateProduct'

const Listproduct = () => {
  // ? Esta linea de codigo se usa para llamar los datos, errores, y el estado de esta cargando las peticiones que se hacen api que se declararon en el context en Api/Common
  const { data, error, isLoading, refetch } = useGetAllProductsQuery()

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
    { key: 'characteristics', name: 'Caracteristicas' },
    { key: 'typeProduct', name: 'Tipo de producto' },
    { key: 'statedAt', name: 'Estado' },
    { key: 'actions', name: 'Acciones' }
  ]

  const rows = data
    ? data.map((product) => ({
      id: product.id,
      name: product.name,
      characteristics: product.characteristics,
      typeProduct: product.typeProduct,
      statedAt: product.statedAt
    }))
    : []

  return (
    <>
      <CreateButtomProduct />
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
          {rows.map(product => (
            <tr className="bg-white border-b" key={product.id}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {product.name}
              </th>
              <td className="px-6 py-4">{product.characteristics}</td>
              <td className="px-6 py-4">{product.typeProduct}</td>
              <td className="px-6 py-4">
                {product.statedAt
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
              <UpdateButtomProduct
                product={product}
              />
              <ChangeStateProduct
                product={product}
              />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Listproduct
