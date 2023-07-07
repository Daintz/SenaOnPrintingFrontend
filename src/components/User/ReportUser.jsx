import { format, setGlobalDateI18n } from 'fecha'

const ReportUser = ({ dataApi }) => {
  setGlobalDateI18n({
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    amPm: ['am', 'pm']
  })

  const columns = [
    {name: 'Numero de Documento', key: 'documentNumber'},
    {name: 'Tipo de Documento', key: 'typeDocumentId'},
    {name: 'Nombres', key: 'names'},
    {name: 'Apellidos', key: 'surnames'},
    {name: 'Rol', key: 'roleId'},
    {name: 'Correo Electronico', key: 'email'},
    {name: 'Telefono', key: 'phone'},
    {name: 'Direccion', key: 'address'}
  ]

  //console.log(dataApi)

  const rows = dataApi
    ? dataApi.map(users => ({
      documentNumber: users.documentNumber,
      typeDocumentId: users.typeDocumentId,
      names: users.names,
      surnames: users.surnames,
      email: users.email,
      roleId: users.roleId,
      phone: users.phone,
      address: users.address
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
          <h1 className="font-black text-3xl">Informe Usuarios</h1>
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
        {rows.map(user => (
          <tr
            className="border-b border-gray-500"
            key={user.id}
          >
            <th
              scope="row"
              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
            >
              {user.documentNumber}
            </th>
            <td className="px-4 py-3">{user.typeDocumentId}</td>
            <td className="px-4 py-3">{user.names}</td>
            <td className="px-4 py-3">{user.surnames}</td>
            <td className="px-4 py-3">{user.roleId}</td>
            <td className="px-4 py-3">{user.email}</td>
            <td className="px-4 py-3">{user.phone}</td>
            <td className="px-4 py-3">{user.address}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default ReportUser
