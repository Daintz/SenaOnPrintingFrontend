import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useGetAllTypeDocumentsQuery } from '../../context/Api/Common'
import ChangeStateTypeDocument from './ChangeStateTypeDocument'
import { CreateButtomTypeDocument } from './CreateTypeDocument'
import { UpdateButtomTypeDocument } from './UpdateTypeDocument'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'

const ListTypeDocument = () => {
  // ? Esta linea de codigo se usa para llamar los datos, errores, y el estado de esta cargando las peticiones que se hacen api que se declararon en el context en Api/Common
  const { data, error, isLoading, refetch } = useGetAllTypeDocumentsQuery()

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
    { key: 'abbreviation', name: 'Abreviación' },
    { key: 'statedAt', name: 'Estado' },
    { key: 'actions', name: 'Acciones' }
  ]

  const rows = data
    ? data.map((typeDocument) => ({
      id: typeDocument.id,
      name: typeDocument.name,
      abbreviation: typeDocument.abbreviation,
      statedAt: typeDocument.statedAt
    }))
    : []

  return (
    <div className="relative bg-white py-10 px-20 shadow-2xl">
      <CreateButtomTypeDocument />
      <div className="relative overflow-x-auto shadow-sm border">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            {columns.map((column) => (
              <th scope="col" className='px-6 py-3' key={column.key}>
                {column.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map(typeDocument => (
            <tr className="bg-white border-b" key={typeDocument.id}>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {typeDocument.name}
              </th>
              <td className="px-6 py-4">{typeDocument.abbreviation}</td>
              <td className="px-6 py-4">
                {typeDocument.statedAt
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
              <UpdateButtomTypeDocument
                typeDocument={typeDocument}
              />
              <ChangeStateTypeDocument
                typeDocument={typeDocument}
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

export default ListTypeDocument
