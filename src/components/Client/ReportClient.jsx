import { format, setGlobalDateI18n } from 'fecha'

const Reportclient = ({ dataApi }) => {
  setGlobalDateI18n({
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    amPm: ['am', 'pm']
  })

  const columns = [
    { name: 'Nombre', key: 'name' },
    { name: 'Telefono', key: 'phone' },
    { name: 'Correo', key: 'email' },
    { name: 'Centro', key: 'center' },
    { name: 'Area', key: 'area' },
    { name: 'Regional', key: 'regional' },
    { key: 'statedAt', name: 'Estado' }
  ]

  console.log(dataApi)

  const rows = dataApi
    ? dataApi.map(client => ({
      id: client.id,
      name: client.name,
      phone: client.phone,
      email: client.email,
      center: client.center,
      area: client.area,
      regional: client.regional,
      statedAt: client.statedAt
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
          <h1 className="font-black text-3xl">Informe Clientes</h1>
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
        {rows.map(client => (
          <tr
            className="border-b border-gray-500"
            key={client.id}
          >
            <th
              scope="row"
              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
            >
              {client.name}
            </th>
            <td className="px-4 py-3">{client.phone}</td>
            <td className="px-4 py-3">{client.email}</td>
            <td className="px-4 py-3">{client.center}</td>
            <td className="px-4 py-3">{client.area}</td>
            <td className="px-4 py-3">{client.regional}</td>
            <td className="px-6 py-4">
              {client.statedAt
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

export default Reportclient
