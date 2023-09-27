import { format, setGlobalDateI18n } from 'fecha'

const Reportproviders = ({ dataApi }) => {
  setGlobalDateI18n({
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    amPm: ['am', 'pm']
  })

  const columns = [
    { name: 'Nit', key: 'nitCompany' },
    { name: 'Empresa', key: 'nameCompany' },
    { name: 'Correo', key: 'email' },
    { name: 'Telefono', key: 'phone' },
    { name: 'Direccion', key: 'companyAddress' }
  ]

  console.log(dataApi)

  const rows = dataApi
    ? dataApi.map(providers => ({
      nitCompany: providers.nitCompany,
      nameCompany: providers.nameCompany,
      email: providers.email,
      phone: providers.phone,
      companyAddress: providers.companyAddress,
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
          <h1 className="font-black text-3xl">Informe Provedores</h1>
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
        {rows.map(providers => (
          <tr
            className="border-b border-gray-500"
            key={providers.id}
          >
            <th
              scope="row"
              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
            >
              {providers.nitCompany}
            </th>
            <td className="px-4 py-3">{providers.nameCompany}</td>
            <td className="px-4 py-3">{providers.email}</td>
            <td className="px-4 py-3">{providers.phone}</td>
            <td className="px-4 py-3">{providers.companyAddress}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  )
}

export default Reportproviders
