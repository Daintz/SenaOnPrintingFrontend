import { format, setGlobalDateI18n } from 'fecha'

const ReportSupplyDetails = ({ dataApi }) => {
  setGlobalDateI18n({
    dayNamesShort: ['Sab', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Dom'],
    dayNames: ['Sabado', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    amPm: ['am', 'pm']
  })

  const columns = [
    { key: 'description', name: 'Descripción' },
    { key: 'supplyCost', name: 'Costo insumo' },
    { key: 'batch', name: 'Lote' },
    { key: 'initialQuantity', name: 'Cantidad inicial' },
    { key: 'entryDate', name: 'Fecha de entrada' },
    { key: 'expirationDate', name: 'Fecha de caducidad' },
    { key: 'actualQuantity', name: 'Fecha actual' },
    { key: 'supplyId', name: 'Id insumo' },
    { key: 'providerId', name: 'Id proveedor' },
    { key: 'warehouseId', name: 'Id bodega' },
    { key: 'statedAt', name: 'Estado' }
  ]
 

  console.log(dataApi)

  const rows = dataApi
    ? dataApi.map(supplyDetails => ({
      id: supplyDetails.id,
      description: supplyDetails.description,
      supplyCost: supplyDetails.supplyCost,
      batch: supplyDetails.batch,
      initialQuantity: supplyDetails.initialQuantity,
      entryDate: supplyDetails.entryDate,
      expirationDate: supplyDetails.expirationDate,
      actualQuantity: supplyDetails.actualQuantity,
      supplyId: supplyDetails.supplyId,
      providerId: supplyDetails.providerId,
      warehouseId: supplyDetails.warehouseId,
      statedAt: supplyDetails.statedAt
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
          <h1 className="font-black text-3xl">Informe loteo de insumos</h1>
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
        {rows.map(supplyDetails => (
          <tr
            className="border-b border-gray-500"
            key={supplyDetails.id}
          >
            <th
              scope="row"
              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
            >
              {supplyDetails.description}
            </th>
            <td className="px-4 py-3">{supplyDetails.supplyCost}</td>
            <td className="px-4 py-3">{supplyDetails.batch}</td>
            <td className="px-4 py-3">{supplyDetails.initialQuantity}</td>
            <td className="px-4 py-3">{supplyDetails.entryDate}</td>
            <td className="px-4 py-3">{supplyDetails.expirationDate}</td>
            <td className="px-4 py-3">{supplyDetails.actualQuantity}</td>
            <td className="px-4 py-3">{supplyDetails.supplyId}</td>
            <td className="px-4 py-3">{supplyDetails.providerId}</td>
            <td className="px-4 py-3">{supplyDetails.warehouseId}</td>
            <td className="px-6 py-4">
              {supplyDetails.statedAt
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

export default ReportSupplyDetails
