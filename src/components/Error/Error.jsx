
function Error ({ type, message }) {
  console.log(type, message)

  switch (type) {
    case 'FETCH_ERROR':
      message = 'Hubo un error al obtener los datos, contactate con el administrador'
      break

    default:
      message = 'Hubo algun error contactate con el administrador'
      break
  }
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}.</span>
    </div>
  )
}

export default Error
