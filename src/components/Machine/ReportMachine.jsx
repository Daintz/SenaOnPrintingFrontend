import { format, setGlobalDateI18n } from 'fecha'

const ReportMachine = ({ dataApi }) => {
  setGlobalDateI18n({
    dayNamesShort: ['Sab', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Dom'],
    dayNames: ['Sabado', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    amPm: ['am', 'pm']
  })

  const columns = [
    { key: 'name', name: 'Nombre ' },
    { key: 'minimumHeight', name: 'Ancho mínimo ' },
    { key: 'minimumWidth', name: 'Alto mínimo' },
    { key: 'maximumHeight', name: 'Ancho máximo' },
    { key: 'maximumWidth', name: 'Alto máximo' },
    { key: 'costByUnit', name: 'Costo por unidad ' },
    { key: 'costByHour', name: 'Costo por hora'},
    { key: 'statedAt', name: 'Estado Maquina'}
  ]

  console.log(dataApi)

  const rows = dataApi
    ? dataApi.map(Machine => ({
      id: Machine.id,
      name: Machine.name,
      minimumHeight: Machine.minimumHeight,
      minimumWidth: Machine.minimumWidth,
      maximumHeight: Machine.maximumHeight,
      maximumWidth : Machine.maximumWidth,
      costByUnit : Machine.costByUnit,
      costByHour : Machine.costByHour,
      statedAt : Machine.statedAt
      
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
          <h1 className="font-black text-3xl">Informe Máquinas</h1>
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
        {rows.map(machine => (
          <tr
            className="border-b border-gray-500"
            key={machine.id}
          >
            <th
              scope="row"
              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
            >
              {machine.name}
            </th>
            <td className="px-4 py-3">{machine.minimumHeight}</td>
            <td className="px-4 py-3">{machine.minimumWidth}</td>
            <td className="px-4 py-3">{machine.maximumHeight}</td>
            <td className="px-4 py-3">{machine.maximumWidth}</td>
            <td className="px-4 py-3">{machine.costByHour}</td>
            <td className="px-4 py-3">{machine.costByUnit}</td>
            <td className="px-6 py-4">
              {machine.statedAt
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

export default ReportMachine