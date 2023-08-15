import { format, setGlobalDateI18n } from 'fecha'

const ReportSupply = ({ dataApi }) => {
  setGlobalDateI18n({
    dayNamesShort: ['Sab', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Dom'],
    dayNames: ['Sabado', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    amPm: ['am', 'pm']
  })

  const columns = [
    { key: 'name', name: 'Nombre insumo' },
    { key: 'dangerIndicators', name: 'Indicadores de peligro insumo' },
    { key: 'useInstructions', name: 'Instrucciones' },
    { key: 'advices', name: 'Consejos' },
    { key: 'supplyType', name: 'Tipo insumo' },
    { key: 'sortingWord', name: 'Tipo peligrosidad' },
    { key: 'quantity', name: 'Cantidad' },
    { key: 'averageCost', name: 'Costo promedio' },
    { key: 'statedAt', name: 'Estado' }
  ]

  console.log(dataApi)

  const rows = dataApi
    ? dataApi.map(supply => ({
      id: supply.id,
      name: supply.name,
      dangerIndicators: supply.dangerIndicators,
      useInstructions: supply.useInstructions,
      advices: supply.advices,
      supplyType: supply.supplyType === 1 ? 'Devolutivo' : 'Consumible',
      sortingWord: supply.sortingWord === 1 ? 'Peligro' : 'Atención',
      quantity: supply.quantity,
      averageCost: supply.averageCost,
      statedAt: supply.statedAt
    }))
    : []

  const currentDate = new Date(Date.now())
  const formattedDate = format(currentDate, 'dddd D [de] MMMM [de] YYYY', 'es')
  console.log(formattedDate)

  return (
    <>
      <div className="my-6">
        <div className="text-center">
          <img
            src="https://agenciapublicadeempleo.sena.edu.co/imgLayout/logos/Logosimbolo-SENA-PRINCIPAL.png"
            className="h-10 mr-3"
            alt="SENA Logo"
          />
          <h1 className="font-black text-3xl">Informe de insumos</h1>
          <p className="text-xl">Creado el dia: {formattedDate}</p>
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map(column => (
              <th scope="col" className="px-6 py-3" key={column.key}>
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {rows.map(supply => (
          <tr
            className="border-b border-gray-500"
            key={supply.id}
          >
            <th
              scope="row"
              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
            >
              {supply.name}
            </th>
            <td className="px-4 py-3">{supply.dangerIndicators}</td>
            <td className="px-4 py-3">{supply.useInstructions}</td>
            <td className="px-4 py-3">{supply.advices}</td>
            <td className="px-4 py-3">{supply.supplyType}</td>
            <td className="px-4 py-3">{supply.sortingWord}</td>
            <td className="px-4 py-3">{supply.quantity}</td>
            <td className="px-4 py-3">{supply.averageCost}</td>
            <td className="px-6 py-4">
              {supply.statedAt
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
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default ReportSupply
