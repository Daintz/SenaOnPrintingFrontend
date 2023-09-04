import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import clientAxios from '../../config/clientAxios'
import * as Yup from 'yup'
import { usePostSupplyDetailsMutation } from '../../context/Api/Common'
import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'

import { toast } from 'react-toastify'
import React, { useEffect, useMemo, useState } from 'react'
import { useTable, usePagination, useGlobalFilter } from 'react-table'
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai'

const validationSchema = Yup.object().shape({
  description: Yup.string(),
  supplyCost: Yup.number().required('Campo requerido'),
  // batch: Yup.string(),
  entryDate: Yup.date().required('Campo requerido'),
  expirationDate: Yup.date().required('Campo requerido'),
  supplyId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un insumo'),
  providerId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir un proveedor'),
  warehouseId: Yup.number().required('Campo requerido').moreThan(0, 'Debe elegir una bodega')
})

const getSupply = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/Supply').then(
      (result) => {
        const supplyId = result.data.map((Supply) => ({
          label: Supply.name,
          value: Supply.id,
          price: Supply.averageCost
        }))
        resolve(supplyId)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

const getProviders = async () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/Provider').then(
      (result) => {
        const providerId = result.data.map((Provider) => ({
          label: Provider.nameCompany,
          value: Provider.id
        }))
        resolve(providerId)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

const getWarehause = () => {
  return new Promise((resolve, reject) => {
    clientAxios.get('/Warehause').then(
      (result) => {
        const warehouseId = result.data.map((Warehause) => ({
          label: Warehause.ubication,
          value: Warehause.id
        }))
        resolve(warehouseId)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

function CreateSupplyDetails () {
  const [dataApi, setDataApi] = useState([])
  const [listSupplies, setListSupplies] = useState([])
  const [listSuppliesWith, setlistSuppliesWith] = useState([])

  useEffect(() => {
    fetchOptions()
    get()
  }, [])

  const get = async () => {
    const { data } = await clientAxios('/supply')
    setDataApi(data)
  }

  const dispatch = useDispatch()
  const [createSupplyDetails, { isLoading }] = usePostSupplyDetailsMutation()

  const [supplyOptions, setSupplyOptions] = useState([])
  const [providerOptions, setProviderOptions] = useState([])
  const [warehauseOptions, setWarehauseOptions] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
  const [dataSupplies, setDataSupplies] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 2

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const fetchOptions = () => {
    getSupply().then((options) => {
      setSupplyOptions(options)
    })
    getProviders().then((options) => {
      setProviderOptions(options)
    })
    getWarehause().then((options) => {
      setWarehauseOptions(options)
    })
  }

  useEffect(() => {
    fetchOptions()
    console.log(listSupplies)
  }, [])

  const handleSubmit = async (values) => {
    if (isLoading) return

    try {
      const response = await createSupplyDetails(values)

      dispatch(changeAction())
      if (!response.error) {
        dispatch(closeModal())
      }

      toast.success('Compra de insumo creada con éxito', {
        autoClose: 1000
      })
    } catch (error) {
      console.error(error)
    }
  }

  const addSupply = (cell) => {
    const quantityForSupply = quantities[cell.id] || 0
    const priceForSupply = prices[cell.id] || 0
    setlistSuppliesWith([...listSuppliesWith,
      {
        ...cell,
        quantityModified: parseInt(priceForSupply),
        priceModified: parseInt(quantityForSupply)
      }
    ])

    setTotal(total + parseInt(quantityForSupply))

    const existingSupply = listSupplies.find(supply => supply.id === cell.id)

    if (existingSupply) {
      const updatedSupplies = listSupplies.map(supply =>
        supply.id === cell.id ? { ...supply } : supply
      )
      setListSupplies(updatedSupplies)
    } else {
      setListSupplies([...listSupplies, { ...cell }])
    }
  }

  const deleteSupply = (cell) => {
    const updatedListSupplies = listSuppliesWith.filter(supply => supply.id !== cell)
    setlistSuppliesWith(updatedListSupplies)
  }

  const [quantities, setQuantities] = useState({})
  const [prices, setPrices] = useState({})
  const [total, setTotal] = useState(0)

  const handleQuantityChange = (supplyId, newQuantity) => {
    console.log(quantities)
    setQuantities({ ...quantities, [supplyId]: newQuantity })
  }

  const handlePriceChange = (priceId, newPrice) => {
    console.log(prices)
    setPrices({ ...prices, [priceId]: newPrice })
  }

  const columns = useMemo(() => [
    { Header: 'Nombre insumo', accessor: 'name' }
  ], [])

  const data = useMemo(() => (dataApi || []), [dataApi])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
    setGlobalFilter,
    prepareRow,
    rows: rowsTable
  } = useTable({
    data,
    columns
  },
  useGlobalFilter,
  usePagination)

  const { pageIndex, globalFilter } = state

  return (
    <Formik
      initialValues={{
        description: '',
        supplyCost: 0,
        entryDate: currentDate,
        expirationDate: '',
        suppliesId: [],
        providerId: 0,
        warehouseId: 0
      }}
      // validationSchema={validationSchema}
      onSubmit={values => {
        listSuppliesWith.map((supplyWith, index) => {
          console.log(values)
          console.log(supplyWith)
          console.log(supplyWith.id)
          console.log(index)
          const dataForm = {
            description: values.description,
            supplyCost: supplyWith.priceModified,
            entryDate: values.entryDate,
            expirationDate: values.expirationDate,
            supplyId: supplyWith.id,
            providerId: parseInt(values.providerId),
            warehouseId: parseInt(values.providerId)
          }

          return handleSubmit(dataForm)
        })

        // console.log({ ...values, typeProduct: typeProductSelect })
        // handleSubmit(dataForm)
      }}
    >
    {({ handleChange, values }) => (
      <Form>
        <div className="w-full">
          {currentPage === 1 && (
          <div className="">
          <div className="">
          <div className="flex gap-5 grid-cols-5 mb-3">
          <div className="w-4/4">
          <b>Codigo : 0001</b>
            </div>
            <div className="w-4/4">
              <b>Fecha: {new Date().toISOString().split('T')[0]}</b>
            </div>
          </div>
          <hr className="mb-4" />
          <div className="flex gap-5 grid-cols-2 mb-3">
          <div className="w-1/2 ml-2">
              <label htmlFor="entryDate">Fecha de entrada</label>
              <Field
                type="date"
                name="entryDate"
                id="entryDate"
                placeholder="Fecha de entrada"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                min={new Date().toISOString().split('T')[0]}
              />
        </div>

        <div className='w-1/2 mr-2'>
          <label htmlFor="expirationDate">Fecha de caducidad</label>
          <Field
              type="date"
              name="expirationDate"
              id="expirationDate"
              placeholder="Fecha de caducidad"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              min={new Date().toISOString().split('T')[0]}
              />
        </div>
        </div>

          <div className="flex gap-5 grid-cols-2 mb-3">
          <div className='w-1/2 ml-2'>
          <label htmlFor="providerId">Proveedor</label>
          <br />
          <Field name="providerId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
            <option value={0}>Seleccione un proveedor</option>
            {providerOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Field>
          <ErrorMessage
            name="providerId"
            component="div"
            className="text-red-500"
          />
        </div>

        <div className='w-1/2 ml-2'>
          <label htmlFor="warehouseId">Bodega</label>
          <br />
          <Field name="warehouseId" as="select" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
            <option value={0}>Seleccione una bodega</option>
            {warehauseOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Field>
          <ErrorMessage
            name="warehouseId"
            component="div"
            className="text-red-500"
          />
        </div>
        </div>
        <div className="flex gap-5 grid-cols-5 mb-3">
        <div className='w-full   mr-2'>
          <label htmlFor="description">Descripción</label>
          <Field
              as="textarea"
              type="text"
              name="description"
              id="description"
              placeholder="Descripción"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              rows="6" cols="100"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-500"
          />
        </div>

          </div>

          <div className="flex gap-5 grid-cols-5 mb-2">
          <div className="flex flex-col items-end space-y-2 pt-6">
          <div className="flex w-full justify-between border-t border-gray-900/10 pt-2 md:w-1/2">
            <span className="font-bold">Total: ${total}</span>
            <span className="font-bold">
            </span>
          </div>
            </div>
        </div>
          </div>
          </div>
          )}
        </div>

        {currentPage === 2 && (
        <>
          <div className="w-full md:w-1/2">
            <div className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                  placeholder="Search"
                  value={globalFilter || ''}
                  onChange={e => setGlobalFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-gray-400 mt-6">
            <table className="w-full text-sm text-left text-gray-500" {...getTableProps()}>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                {headerGroups.map(headerGroup => (
                  <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, index) => (
                      <th scope="col" className='px-6 py-3' key={`${column.id}-${index}`} {...column.getHeaderProps()}>
                        {column.render('Header')}
                    </th>
                    ))}
                    <th scope="col" className='px-6 py-3'>
                        Cantidad a modificar
                    </th>
                    <th scope="col" className='px-6 py-3'>
                        Precio a modificar
                    </th>
                    <th scope="col" className='px-6 py-3'>
                        Acciones
                    </th>
                  </tr>
                ))}
              </thead>
                {rowsTable.length === 0
                  ? (
                    <>
                      <p className='w-full text-center text-3xl font-bold ml-[170%] my-10'>No se encontraron registros con esta busqueda.</p>
                    </>
                    )
                  : (
                    <>
                      {page.map(row => {
                        prepareRow(row)
                        return (
                          <tbody key={row.original.id} {...getTableBodyProps()}>
                            <tr
                              {...row.getRowProps()}
                              className="border-b border-gray-500"
                            >
                              {row.cells.map((cell, index) => {
                                return (
                                  <React.Fragment key={`${cell.row.original.id}-${index}`}>
                                    <td {...cell.getCellProps()} className="px-4 py-3">
                                      {typeof cell.value === 'function' ? cell.value(cell) : cell.render('Cell')}
                                    </td>
                                    {index === 0 &&
                                      <>
                                        <td className="px-6 py-4 place-content-center" key={`${cell.row.original.id}-price`}>
                                          <Field
                                            type="text"
                                            className="w-full px-4 py-2 leading-tight text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                                            value={prices[cell.row.original.id]}
                                            onChange={(e) => handlePriceChange(cell.row.original.id, e.target.value)}
                                          />
                                        </td>
                                        <td className="px-6 py-4 place-content-center" key={`${cell.row.original.id}-quantity`}>
                                          <Field
                                            type="text"
                                            className="w-full px-4 py-2 leading-tight text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline"
                                            value={quantities[cell.row.original.id]}
                                            onChange={(e) => handleQuantityChange(cell.row.original.id, e.target.value)}
                                          />
                                        </td>
                                        <td className="px-6 py-4 grid grid-cols-3  place-content-center" key={`${cell.row.original.id}-actions`}>
                                          <button type="button" onClick={() => addSupply(cell.row.original)}>
                                            <AiOutlinePlusCircle alt="Icono agregar producto" title="Agregar producto" className="h-6 w-6 mr-2" />
                                          </button>
                                          <button type="button" onClick={() => deleteSupply(cell.row.original.id)}>
                                            <AiOutlineCloseCircle alt="Icono eliminar producto" title="Eliminar producto" className="h-6 w-6 mr-2" />
                                          </button>
                                        </td>
                                      </>
                                    }
                                  </React.Fragment>)
                              })}
                            </tr>
                          </tbody>
                        )
                      })}
                    </>
                    )
                }
            </table>
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            >
              <span className="text-sm font-normal text-gray-500">
                Pagina {' '}
                <span className="font-semibold text-gray-900">{pageIndex + 1}</span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <button
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    <span className="sr-only">Anterior</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    -
                  </a>
                </li>
                <li>
                  <button
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    <span className="sr-only">Siguiente</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

      <p className='text-xl font-semibold text-gray-900 lg:text-2xl mt-8'>Lista de insumos de la compra</p>

      <div className="overflow-x-auto rounded-xl border border-gray-400 mt-6">
        <table className="w-full text-sm text-left text-gray-500" {...getTableProps()}>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {headerGroups.map(headerGroup => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th scope="col" className='px-3 py-3' key={`${column.id}-${index}`} {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                  <th scope="col" className='px-6 py-3'>
                        Cantidad a modificar
                    </th>
                    <th scope="col" className='px-6 py-3'>
                        Precio a modificar
                    </th>
                </tr>
            ))}
          </thead>
          <>
          <tbody>
            {listSuppliesWith.map(listSupply => {
              return (
                <tr
                  key={listSupply.id}
                  className="border-b border-gray-500"
                >
                  {console.log(listSupply)}
                  <td className="px-4 py-3">{listSupply.name}</td>
                  <td className="px-4 py-3">{listSupply.quantityModified}</td>
                  <td className="px-4 py-3">{listSupply.priceModified}</td>
                </tr>
              )
            })}
          </tbody>
          </>
        </table>
      </div>
      </>
        )}
        <div className='space-x-5 mt-8'>
        <button type='button' onClick={handlePrevPage} disabled={currentPage === 1} className={`${currentPage === 1 && 'hidden'} text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:bg-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
          Página anterior
        </button>
        <button type='button' onClick={handleNextPage} disabled={currentPage === totalPages} className={`${currentPage === totalPages && 'hidden'} text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:bg-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
          Siguiente página
        </button>
      </div>

      <button
        type="submit"
        className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:bg-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
      >
        Crear compra de insumos
      </button>
      </Form>
    )}
  </Formik>
  )
}

export function CreateButtomSupplyDetails () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: '1500px' }))
    dispatch(openModal({ title: 'Crear compra de insumo' }))
    dispatch(setAction({ action: 'creating' }))
  }
  // ?

  return (
    <button
      className="flex items-center justify-center border border-gray-400 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
      type="button"
      onClick={() => handleOpen()}
    >
      <svg
        className="h-3.5 w-3.5 mr-2"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
        />
      </svg>
      Crear compra de insumo
    </button>
  )
}

export default CreateSupplyDetails
