import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { usePostProductMutation } from '../../context/Api/Common'
import {
  changeAction,
  closeModal,
  openModal,
  setAction,
  setWidth
} from '../../context/Slices/Modal/ModalSlice'
import Spinner from '../Spinner/Spinner'
import { toast } from 'react-toastify'
import { useEffect, useMemo, useState } from 'react'
import { useTable, usePagination, useGlobalFilter } from 'react-table'
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import clientAxios from '../../config/clientAxios'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  characteristics: Yup.string().required('Campo requerido')
})

function CreateProduct () {
  const [dataApi, setDataApi] = useState([])
  const [dataSupplies, setDataSupplies] = useState(false)
  const [listSupplies, setListSupplies] = useState([])

  useEffect(() => {
    fetchOptions()
    get()
  }, [])

  const get = async () => {
    const { data } = await clientAxios('/supply')
    setDataApi(data)
  }

  const dispatch = useDispatch()
  const [createProduct, { error, isLoading }] = usePostProductMutation()

  const [paperCutOptions, setpaperCutOptions] = useState([])
  const [finishOptions, setFinishOptions] = useState([])
  const [typeProductSelect, setTypeProductSelect] = useState('')
  const [typeSouvernirSelect, setTypeSouvernirSelect] = useState('')
  const [frontPage, setFrontPage] = useState('')
  const [frontPageInks, setFrontPageInks] = useState('')
  const [backCover, setBackCover] = useState('')
  const [backCoverInks, setBackCoverInks] = useState('')
  const [innerSheets, setInnerSheets] = useState('')
  const [innerSheetsInks, setInnerSheetsInks] = useState('')

  const getPaperCut = () => {
    return new Promise((resolve, reject) => {
      clientAxios.get('/PaperCuts').then(
        (result) => {
          const paperCuts = result.data.map((paperCut) => (
            paperCut.name
          ))
          resolve(paperCuts)
        },
        (error) => {
          reject(error)
        }
      )
    })
  }

  const getFinish = () => {
    return new Promise((resolve, reject) => {
      clientAxios.get('/Finish').then(
        (result) => {
          const finishes = result.data.map((finish) => ({
            name: finish.name,
            label: finish.name
          }))
          resolve(finishes)
        },
        (error) => {
          reject(error)
        }
      )
    })
  }

  const fetchOptions = () => {
    getPaperCut().then((options) => {
      setpaperCutOptions(options)
    })
    getFinish().then((options) => {
      setFinishOptions(options)
    })
  }

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />

    await createProduct(values)

    dispatch(changeAction())
    if (!error) {
      dispatch(closeModal())
    }
    toast.success('Producto creado con exito', {
      autoClose: 1000 // Duración de 1 segundos
    })
  }

  const handleTypeProduct = e => {
    setTypeProductSelect(e.target.value)
  }

  const handleTypeSouvenir = e => {
    setTypeSouvernirSelect(e.target.value)
  }

  const handleDataSupplies = () => {
    setDataSupplies(!dataSupplies)
  }

  const handleFrontPage = e => {
    setFrontPage(e.target.value)
  }

  const handleFrontPageInks = e => {
    setFrontPageInks(e.target.value)
  }

  const handleBackCover = e => {
    setBackCover(e.target.value)
  }

  const handleBackCoverInks = e => {
    setBackCoverInks(e.target.value)
  }

  const handleInnerSheets = e => {
    setInnerSheets(e.target.value)
  }

  const handleInnerSheetsInks = e => {
    setInnerSheetsInks(e.target.value)
  }

  const addProduct = (cell) => {
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

  const deleteProduct = (cell) => {
    const updatedListSupplies = listSupplies.filter(supply => supply.id !== cell)
    setListSupplies(updatedListSupplies)
  }

  const columns = useMemo(() => [
    { Header: 'Nombre insumo', accessor: 'name' },
    { Header: 'Indicadores de peligro insumo', accessor: 'dangerIndicators' },
    { Header: 'Instrucciones', accessor: 'useInstructions' },
    { Header: 'Consejos', accessor: 'advices' },
    { Header: 'Tipo insumo', accessor: 'supplyType' },
    { Header: 'Tipo peligrosidad', accessor: 'sortingWord' },
    { Header: 'Cantidad', accessor: 'quantity' },
    { Header: 'Costo promedio', accessor: 'averageCost' },
    {
      Header: 'Estado',
      accessor: 'statedAt',
      Cell: ({ value }) => (value
        ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
            Activo
          </span>
        : <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            Inactivo
          </span>)
    }
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

  const inputs = [
    {
      row: 1,
      key: 0,
      typeProductOwner: '',
      name: 'name',
      title: 'Nombre',
      type: 'text',
      placeholder: 'Nombre del producto'
    },
    {
      row: 1,
      key: 1,
      typeProductOwner: '',
      name: 'typeProduct',
      title: 'Tipo de producto',
      type: 'select',
      options: ['Elige una opción', 'Libreta', 'Souvenir', 'Gran formato', 'Papelería', 'Otros'],
      placeholder: 'Tipo de producto',
      value: typeProductSelect,
      action: handleTypeProduct
    },
    {
      row: 1,
      key: 2,
      typeProductOwner: 'Libreta',
      name: 'notebookSize',
      title: 'Tamaño',
      type: 'select',
      options: ['Elije una opción', ...paperCutOptions]
    },
    {
      row: 2,
      key: 5,
      typeProductOwner: 'Libreta',
      name: 'frontPage',
      title: 'Portada',
      type: 'select',
      options: ['Elige una opción', 'Si', 'No'],
      value: frontPage,
      action: handleFrontPage
    },
    {
      row: 2,
      key: 5,
      typeProductOwner: 'Libreta',
      name: 'frontPageInks',
      title: 'Tintas portada',
      type: 'select',
      options: ['Elige una opción', 'Si', 'No'],
      value: frontPageInks,
      action: handleFrontPageInks
    },
    {
      row: 2,
      key: 5,
      typeProductOwner: 'Libreta',
      name: 'numberInks',
      title: 'No. de tintas proceso',
      type: 'text',
      placeholder: 'No. de tintas proceso libreta'
    },
    {
      row: 2,
      key: 5,
      typeProductOwner: 'Libreta',
      name: 'pantone',
      title: 'Pantone',
      type: 'text',
      placeholder: 'Pantone libreta'
    },
    {
      row: 2,
      key: 5,
      typeProductOwner: 'Libreta',
      name: 'code',
      title: 'Código',
      type: 'text',
      placeholder: 'Código libreta'
    },
    {
      row: 3,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'backCover',
      title: 'Contraportada',
      type: 'select',
      options: ['Elige una opción', 'Si', 'No'],
      value: backCover,
      action: handleBackCover
    },
    {
      row: 3,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'backCoverInks',
      title: 'Tintas contraportada',
      type: 'select',
      options: ['Elige una opción', 'Si', 'No'],
      value: backCoverInks,
      action: handleBackCoverInks
    },
    {
      row: 3,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'numberInksBackCover',
      title: 'No. de tintas proceso',
      type: 'text',
      placeholder: 'No. de tintas proceso libreta'
    },
    {
      row: 3,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'pantoneBackCover',
      title: 'Pantone',
      type: 'text',
      placeholder: 'Pantone libreta'
    },
    {
      row: 3,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'codeBackCover',
      title: 'Código',
      type: 'text',
      placeholder: 'Código libreta'
    },
    {
      row: 4,
      key: 8,
      typeProductOwner: 'Libreta',
      name: 'innerSheets',
      title: 'Interior paginas',
      type: 'select',
      options: ['Elige una opción', 'Si', 'No'],
      value: innerSheets,
      action: handleInnerSheets
    },
    {
      row: 4,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'innerSheetsInks',
      title: 'Tintas paginas',
      type: 'select',
      options: ['Elige una opción', 'Si', 'No'],
      value: innerSheetsInks,
      action: handleInnerSheetsInks
    },
    {
      row: 4,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'numberInksInnerSheets',
      title: 'No. de tintas proceso',
      type: 'text',
      placeholder: 'No. de tintas proceso libreta'
    },
    {
      row: 4,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'pantoneInnerSheets',
      title: 'Pantone',
      type: 'text',
      placeholder: 'Pantone libreta'
    },
    {
      row: 4,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'codeInnerSheets',
      title: 'Código',
      type: 'text',
      placeholder: 'Código libreta'
    },
    {
      row: 5,
      key: 10,
      typeProductOwner: 'Libreta',
      name: 'numberSheets',
      title: 'Numero de hojas',
      type: 'text',
      placeholder: 'Numero de hojas del producto'
    },
    {
      row: 5,
      key: 10,
      typeProductOwner: 'Libreta',
      name: 'cost',
      title: 'Costo',
      type: 'text',
      placeholder: 'Costo del producto'
    },
    {
      row: 5,
      key: 10,
      typeProductOwner: 'Libreta',
      name: 'observations',
      title: 'Observaciones',
      type: 'text',
      placeholder: 'Observaciones del producto'
    },
        {
      row: 6,
      key: 3,
      typeProductOwner: 'Libreta',
      name: 'cover',
      title: 'Encuadernacion',
      type: 'checkbox',
      checkboxes: [
        {
          name: '1',
          label: 'Anillado doble O'
        },
        {
          name: '2',
          label: 'Loops'
        },
        {
          name: '3',
          label: 'Paso'
        },
        {
          name: '4',
          label: 'Tapa dura'
        },
        {
          name: '5',
          label: 'Grapado'
        },
        {
          name: '6',
          label: 'Rústico/Cosido'
        },
        {
          name: '7',
          label: 'Lomo'
        },
        {
          name: '8',
          label: 'Sobrecubierta'
        },
        {
          name: '9',
          label: 'Tapa blanda'
        },
        {
          name: '10',
          label: 'Caballete'
        }
      ]
    },
    {
      row: 6,
      key: 6,
      typeProductOwner: 'Libreta',
      name: 'laminated',
      title: 'Acabados',
      type: 'checkbox',
      checkboxes: finishOptions
    },
    {
      row: 1,
      key: 11,
      typeProductOwner: 'Souvenir',
      name: 'typeSouvenir',
      title: 'Tipo Souvenir',
      type: 'select',
      options: ['Elige una opción', 'Mug', 'Lapiceros', 'Termo', 'Bolsa', 'Camisa', 'Gorra'],
      placeholder: 'Tipo de producto',
      value: typeSouvernirSelect,
      action: handleTypeSouvenir
    },
    {
      row: 1,
      key: 11,
      typeProductOwner: 'Souvenir',
      name: 'mug',
      title: 'Mug',
      type: 'text',
      placeholder: 'Mug souvenir'
    },
    {
      row: 1,
      key: 12,
      typeProductOwner: 'Souvenir',
      name: 'nameOfficial',
      title: 'Nombre del oficial',
      type: 'text',
      placeholder: 'Nombre del oficial souvenir'
    },
    {
      row: 1,
      key: 12,
      typeProductOwner: 'Souvenir',
      name: 'thermos',
      title: 'Termo',
      type: 'text',
      placeholder: 'Termo souvenir'
    },
    {
      row: 1,
      key: 13,
      typeProductOwner: 'Souvenir',
      name: 'thermos',
      title: 'Área de impresión',
      type: 'text',
      placeholder: 'Área de impresión souvenir'
    },
    {
      row: 1,
      key: 13,
      typeProductOwner: 'Souvenir',
      name: 'cover',
      title: 'Encuadernacion',
      type: 'text',
      placeholder: 'Tapa souvenir'
    },
    {
      row: 2,
      key: 14,
      typeProductOwner: 'Souvenir',
      name: 'bag',
      title: 'Bolsa',
      type: 'text',
      placeholder: 'Bolsa souvenir'
    },
    {
      row: 2,
      key: 15,
      typeProductOwner: 'Souvenir',
      name: 'shirt',
      title: 'Camisa',
      type: 'text',
      placeholder: 'Camisa souvenir'
    },
    {
      row: 2,
      key: 16,
      typeProductOwner: 'Souvenir',
      name: 'size',
      title: 'Talla',
      type: 'text',
      placeholder: 'Talla souvenir'
    },
    {
      row: 2,
      key: 17,
      typeProductOwner: 'Souvenir',
      name: 'cap',
      title: 'Gorra',
      type: 'text',
      placeholder: 'Gorra souvenir'
    },
    {
      row: 2,
      key: 18,
      typeProductOwner: 'Souvenir',
      name: 'color',
      title: 'Colores',
      type: 'text',
      placeholder: 'Colores souvenir'
    },
    {
      row: 1,
      key: 19,
      typeProductOwner: 'Gran formato',
      name: 'impression',
      title: 'Impresión',
      type: 'text',
      placeholder: 'Impresión gran formato'
    },
    {
      row: 1,
      key: 20,
      typeProductOwner: 'Papelería',
      name: 'tulla',
      title: 'Tula',
      type: 'text',
      placeholder: 'Tula papalería'
    },
    {
      row: 1,
      key: 21,
      typeProductOwner: 'Papelería',
      name: 'tacos',
      title: 'Tacos',
      type: 'text',
      placeholder: 'Tacos papalería'
    },
    {
      row: 1,
      key: 22,
      typeProductOwner: 'Papelería',
      name: 'paper',
      title: 'Papel',
      type: 'text',
      placeholder: 'Papel papalería'
    },
    {
      row: 2,
      key: 23,
      typeProductOwner: 'Papelería',
      name: 'leaves',
      title: 'Hojas',
      type: 'text',
      placeholder: 'Hojas papalería'
    },
    {
      row: 2,
      key: 24,
      typeProductOwner: 'Papelería',
      name: 'windowDisplays',
      title: 'Escaparelas',
      type: 'text',
      placeholder: 'Escaparelas papalería'
    },
    {
      row: 2,
      key: 25,
      typeProductOwner: 'Papelería',
      name: 'impression',
      title: 'Impresión',
      type: 'text',
      placeholder: 'Impresión papalería'
    },
    {
      row: 2,
      key: 26,
      typeProductOwner: 'Papelería',
      name: 'size',
      title: 'Tamaño',
      type: 'text',
      placeholder: 'Tamaño papalería'
    },
    {
      row: 1,
      key: 27,
      typeProductOwner: 'Otros',
      name: 'folder',
      title: 'Tamaño carpeta',
      type: 'text',
      placeholder: 'Tamaño carpeta otros'
    },
    {
      row: 2,
      key: 28,
      typeProductOwner: 'Otros',
      name: 'laminated',
      title: 'Laminada',
      type: 'select',
      options: ['Elige una opción', 'Si', 'No'],
      placeholder: 'Laminada otros'
    },
    {
      row: 2,
      key: 29,
      typeProductOwner: 'Otros',
      name: 'descriptionLaminated',
      title: 'Descripción laminada',
      type: 'text',
      placeholder: 'Descripción laminada'
    },
    {
      row: 2,
      key: 30,
      typeProductOwner: 'Otros',
      name: 'impression',
      title: 'Impresión',
      type: 'text',
      placeholder: 'Impresión papalería'
    }
  ]

  const rows = [...new Set(inputs.map(input => input.row))]

  return (
    !dataSupplies
      ? (
        <Formik
          initialValues={{
            typeProduct: '',
            name: '',
            characteristics: '',
            cost: ''
          }}
          onSubmit={values => {
            handleSubmit(values)
          }}
          validationSchema={validationSchema}
        >
          <Form className="space-y-6">
          {rows.map(row => (
            <div key={row} className="flex">
              {inputs
                .filter(input => input.row === row)
                .map((input) => (
                  (input.typeProductOwner === typeProductSelect || input.typeProductOwner === '') &&
                  (input.name !== 'frontPageInks' || (frontPage === 'Si' && input.name === 'frontPageInks')) &&
                  (input.name !== 'numberInks' || (frontPageInks === 'Si' && frontPage === 'Si')) &&
                  (input.name !== 'pantone' || (frontPageInks === 'Si' && frontPage === 'Si')) &&
                  (input.name !== 'code' || (frontPageInks === 'Si' && frontPage === 'Si')) &&
                  (input.name !== 'backCoverInks' || (backCover === 'Si' && input.name === 'backCoverInks')) &&
                  (input.name !== 'numberInksBackCover' || (backCoverInks === 'Si' && backCover === 'Si')) &&
                  (input.name !== 'pantoneBackCover' || (backCoverInks === 'Si' && backCover === 'Si')) &&
                  (input.name !== 'codeBackCover' || (backCoverInks === 'Si' && backCover === 'Si')) &&
                  (input.name !== 'innerSheetsInks' || (innerSheets === 'Si' && input.name === 'innerSheetsInks')) &&
                  (input.name !== 'numberInksInnerSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si')) &&
                  (input.name !== 'pantoneInnerSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si')) &&
                  (input.name !== 'codeInnerSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si'))
                    ? (
                      <>
                        {console.log(frontPage === 'Si' && frontPageInks === 'Si')}
                        {input.type === 'checkbox' &&
                        <div key={input.key} className="flex-1 mr-4 last:mr-0">
                        <label>{input.title}</label>
                        <div className="grid grid-cols-2 gap-4">
                          {input.checkboxes.map((checkbox, index) => (
                            <div key={index} className="flex items-center">
                              <input
                                type="checkbox"
                                name={checkbox.name}
                                id={checkbox.name}
                                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                              />
                              <label htmlFor={checkbox.name} className="ml-2">{checkbox.label}</label>
                            </div>
                          ))}
                        </div>
                      </div>}
                        {input.type === 'select' &&
                          (
                              <>
                              <div key={input.name} className="flex-1 mr-4 last:mr-0">
                                <label htmlFor={input.name}>{input.title}</label>
                                <Field as='select' name={input.name} id={input.name} value={input.value} onChange={input.action ?? undefined} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custo-light block w-full p-2.5">
                                  {input.options.map((option, index) => (
                                    <option key={index} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </Field>
                                <ErrorMessage
                                  name={input.name}
                                  component="div"
                                  className="text-red-500"
                                />
                              </div>
                              </>
                          )}
                            {input.type === 'text' && (
                              <>
                              <div key={input.key} className="flex-1 mr-4 last:mr-0">
                                <label htmlFor={input.name}>{input.title}</label>
                                <Field
                                  type={input.type}
                                  name={input.name}
                                  id={input.name}
                                  placeholder={input.placeholder}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                                />
                                <ErrorMessage
                                  name={input.name}
                                  component="div"
                                  className="text-red-500"
                                />
                              </div>
                              </>
                            )}

                        </>
                      )
                    : (
                        <></>
                      )
                ))}
            </div>
          ))}
            <h2 className='text-xl font-semibold text-gray-900 lg:text-2xl'>Insumos</h2>
            <button
              onClick={handleDataSupplies}
              className="text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:bg-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Administrar insumos
            </button>
            <button
              type="submit"
              className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:bg-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
            Crear producto
          </button>
        </Form>
      </Formik>
        )
      : (
          <>
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
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
                </form>
              </div>
          <div className="overflow-x-auto rounded-xl border border-gray-400">
              <table className="w-full text-sm text-left text-gray-500" {...getTableProps()}>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  {headerGroups.map(headerGroup => (
                      <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, index) => (
                          <th scope="col" className='px-6 py-3' key={`${column.id}-${index}`} {...column.getHeaderProps()}>
                            {column.render('Header')}
                        </th>
                        ))}
                        <th scope="col" key={5} className='px-6 py-3'>
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
                                return (<>
                          <td {...cell.getCellProps()} key={`${cell.column.id}-${index}`} className="px-4 py-3">{typeof cell.value === 'function' ? cell.value(cell) : cell.render('Cell')}</td>
                          {index === 8 &&
                              <td className="px-6 py-4 grid grid-cols-3  place-content-center" key={5}>
                                <button type="button" onClick={() => addProduct(cell.row.original)}>
                                  <AiOutlinePlusCircle alt="Icono agregar producto" title="Agregar producto" className="h-6 w-6 mr-2" />
                                </button>
                                <button type="button" onClick={() => deleteProduct(cell.row.original.id)}>
                                  <AiOutlineCloseCircle alt="Icono eliminar producto" title="Eliminar producto" className="h-6 w-6 mr-2" />
                                </button>
                              </td>
                          }
                        </>)
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

        <h2 className='text-xl font-semibold text-gray-900 lg:text-2xl'>Lista de insumos del producto</h2>

        <div className="overflow-x-auto rounded-xl border border-gray-400">
              <table className="w-full text-sm text-left text-gray-500" {...getTableProps()}>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  {headerGroups.map(headerGroup => (
                      <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, index) => (
                          <th scope="col" className='px-3 py-3' key={`${column.id}-${index}`} {...column.getHeaderProps()}>
                            {column.render('Header')}
                        </th>
                        ))}
                      </tr>
                  ))}
                </thead>
                <>
                <tbody>
                  {listSupplies.map(listSupply => {
                    return (
                      <tr
                        key={listSupply.id}
                        className="border-b border-gray-500"
                      >
                        <td className="px-4 py-3">{listSupply.name}</td>
                        <td className="px-4 py-3">{listSupply.dangerIndicators}</td>
                        <td className="px-4 py-3">{listSupply.useInstructions}</td>
                        <td className="px-4 py-3">{listSupply.advices}</td>
                        <td className="px-4 py-3">{listSupply.supplyType}</td>
                        <td className="px-4 py-3">{listSupply.sortingWord}</td>
                        <td className="px-4 py-3">{listSupply.quantity}</td>
                        <td className="px-4 py-3">{listSupply.averageCost}</td>
                        <td className="px-4 py-3">{listSupply.statedAt
                          ? (
                            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                              Activo
                            </span>
                            )
                          : (
                            <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                              Inactivo
                            </span>
                            )}</td>
                      </tr>
                    )
                  })}
                </tbody>
                </>
              </table>
            </div>

        <button
          onClick={handleDataSupplies}
          className="text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:bg-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Volver
        </button>
        </>
        )
  )
}

export function CreateButtonProduct () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: 'w-[1500px]' }))
    dispatch(setAction({ action: 'creating' }))
    dispatch(openModal({ title: 'Crear producto' }))
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
      Crear producto
    </button>
  )
}

export default CreateProduct
