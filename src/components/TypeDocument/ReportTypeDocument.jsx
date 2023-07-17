import { format, setGlobalDateI18n } from 'fecha'

const ReportTypeDocument = ({ dataApi }) => {
  setGlobalDateI18n({
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    amPm: ['am', 'pm']
  })

  const columns = [
    {name: 'Nombre', key: 'name'},
    {name: 'Abreviacion', key: 'abbreviation'}
  ]

  //console.log(dataApi)

  const rows = dataApi
    ? dataApi.map(typeDocuments => ({
      name: typeDocuments.name,
      abbreviation: typeDocuments.abbreviation
    }))
    : []

  const currentDate = new Date(Date.now())
  const formattedDate = format(currentDate, 'dddd D [de] MMMM [de] YYYY', 'es')
  //console.log(formattedDate)

  return (
    <>
      <div className="my-6">
        <div className="text-center">
          <img
            src="https://agenciapublicadeempleo.sena.edu.co/imgLayout/logos/Logosimbolo-SENA-PRINCIPAL.png"
            className="h-10 mr-3"
            alt="SENA Logo"
          />
          <h1 className="font-black text-3xl">Informe Tipos de Documento</h1>
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
        {rows.map(typeDocument => (
          <tr
            className="border-b border-gray-500"
            key={typeDocument.id}
          >
            <td className="px-4 py-3">{typeDocument.name}</td>
            <td className="px-4 py-3">{typeDocument.abbreviation}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default ReportTypeDocument
