import { format, setGlobalDateI18n } from 'fecha'

const Reportquotation = ({ dataApi }) => {
  setGlobalDateI18n({
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    amPm: ['am', 'pm']
  })

  const columns = [
    { name: 'Codigo', key: 'id' },
    { name: 'Cliente', key: 'clientId' },
    { name: 'Tipo De Servicio', key: 'typeServiceId' },
    { name: 'Producto', key: 'productId' },
    { name: 'Cantidad de producto', key: 'productQuantity' },
    { name: 'Valor Unico', key: 'unitValue' },
    { name: 'Valor Total', key: 'fullValue' },
    { name: 'Estado Cotizacion', key: 'quotationStatus' }
  ]

  console.log(dataApi)

  const rows = dataApi
    ? dataApi.map(quotation => ({
      id: quotation.id,
      clientId: quotation.clientId,
      typeServiceId: quotation.typeServiceId,
      productId: quotation.productId,
      productQuantity: quotation.productQuantity,
      unitValue: quotation.unitValue,
      fullValue: quotation.fullValue,
      quotationStatus: quotation.quotationStatus
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
          <h1 className="font-black text-3xl">Informe Cotizacion</h1>
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
        {rows.map(quotation => (
          <tr
            className="border-b border-gray-500"
            key={quotation.id}
          >
            <th
              scope="row"
              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
            >
              {quotation.id}
            </th>
            <td className="px-4 py-3">{quotation.clientId}</td>
            <td className="px-4 py-3">{quotation.typeServiceId}</td>
            <td className="px-4 py-3">{quotation.productId}</td>
            <td className="px-4 py-3">{quotation.productQuantity}</td>
            <td className="px-4 py-3">{quotation.unitValue}</td>
            <td className="px-4 py-3">{quotation.fullValue}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default Reportquotation
