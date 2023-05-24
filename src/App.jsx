import { Link } from 'react-router-dom'

function App () {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        PRODUCTION!
      </h1>
      <Link to="/dashboard"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Dashboard</button></Link>
    </>
  )
}

export default App
