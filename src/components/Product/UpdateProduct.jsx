import { usePutProductByIdMutation } from '../../context/Api/Common'
import { changeAction, closeModal, openEditing, openModal, setAction, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast } from 'react-toastify'
import { useEffect, useMemo, useState } from 'react'
import clientAxios from '../../config/clientAxios'
import { useGlobalFilter, usePagination, useTable } from 'react-table'
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  typeProduct: Yup.string().notOneOf(['Elige una opción'], 'Selecciona una opción válida')
})

function updateProduct () {
  const [dataApi, setDataApi] = useState([])
  const [listSupplies, setListSupplies] = useState([])
  const [listSuppliesIds, setListSuppliesIds] = useState([])

  useEffect(() => {
    fetchOptions()
    get()
  }, [])

  const get = async () => {
    const { data } = await clientAxios('/supply')
    setDataApi(data)
  }

  const dispatch = useDispatch()
  const { editingData } = useSelector((state) => state.modal)
  const [updateProduct, { error, isLoading }] = usePutProductByIdMutation()

  const [paperCutOptions, setpaperCutOptions] = useState([])
  const [typeProductSelect, setTypeProductSelect] = useState('')
  const [frontPage, setFrontPage] = useState('')
  const [frontPageInks, setFrontPageInks] = useState('')
  const [backCover, setBackCover] = useState('')
  const [backCoverInks, setBackCoverInks] = useState('')
  const [innerSheets, setInnerSheets] = useState('')
  const [innerSheetsInks, setInnerSheetsInks] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 4 // Número total de páginas del formulario

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + (typeProductSelect !== 'Libreta' ? 3 : 1))
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - (typeProductSelect !== 'Libreta' ? 3 : 1))
    }
  }

  useEffect(() => {
    setListSupplies(editingData.supplies.map(({ supply }) => supply
    ))
    setListSuppliesIds(editingData.supplies.map(({ supplyId }) => supplyId
    ))
    setTypeProductSelect(editingData.typeProduct)
    setFrontPage(editingData.frontPage === true ? 'Si' : 'No')
    setFrontPageInks(editingData.frontPageInks === true ? 'Si' : 'No')
    setBackCover(editingData.backCover === true ? 'Si' : 'No')
    setBackCoverInks(editingData.backCoverInks === true ? 'Si' : 'No')
    setInnerSheets(editingData.inside === true ? 'Si' : 'No')
    setInnerSheetsInks(editingData.insideInks === true ? 'Si' : 'No')
    console.log(editingData)
  }, [])

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

  const fetchOptions = () => {
    getPaperCut().then((options) => {
      setpaperCutOptions(options)
    })
  }

  const handleSubmit = async values => {
    if (isLoading) return <Spinner />
    if (error) return <Error type={error.status} message={error.error} />
    await updateProduct(values)

    dispatch(changeAction())
    dispatch(closeModal())
    toast.success('Producto actualizado con exito', {
      autoClose: 1000 // Duración de 1 segundos
    })
  }

  const handleTypeProduct = e => {
    setTypeProductSelect(e.target.value)
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

    const existingSupplyIds = listSuppliesIds.find(supply => supply === cell.id)

    if (!existingSupplyIds) {
      console.log(cell.id)
      setListSuppliesIds([...listSuppliesIds, cell.id])
      console.log(listSuppliesIds)
    }
  }

  useEffect(() => {
    console.log(listSuppliesIds)
  }, [listSuppliesIds])

  const deleteProduct = (cell) => {
    const updatedListSupplies = listSupplies.filter(supply => supply.id !== cell)
    setListSupplies(updatedListSupplies)

    const updatedListSuppliesIds = listSuppliesIds.filter(supply => supply !== cell)
    setListSuppliesIds(updatedListSuppliesIds)
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
      page: 1,
      key: 0,
      typeProductOwner: '',
      name: 'name',
      title: 'Nombre',
      type: 'text',
      placeholder: 'Nombre del producto'
    },
    {
      row: 1,
      page: 1,
      key: 1,
      typeProductOwner: '',
      name: 'typeProduct',
      title: 'Tipo de producto',
      type: 'select',
      options: ['Elige una opción', 'Libreta', 'Souvenir', 'Gran formato', 'Papelería'],
      value: typeProductSelect,
      action: handleTypeProduct
    },
    {
      row: 1,
      page: 1,
      key: 2,
      typeProductOwner: 'Libreta',
      name: 'notebookSize',
      title: 'Tamaño',
      type: 'select',
      options: ['Elije una opción', ...paperCutOptions]
    },
    {
      row: 2,
      page: 2,
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
      page: 2,
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
      page: 2,
      key: 5,
      typeProductOwner: 'Libreta',
      name: 'numberInks',
      title: 'No. de tintas proceso',
      type: 'text',
      placeholder: 'No. de tintas proceso libreta'
    },
    {
      row: 2,
      page: 2,
      key: 5,
      typeProductOwner: 'Libreta',
      name: 'pantone',
      title: 'Pantone',
      type: 'text',
      placeholder: 'Pantone libreta'
    },
    {
      row: 2,
      page: 2,
      key: 5,
      typeProductOwner: 'Libreta',
      name: 'code',
      title: 'Código',
      type: 'text',
      placeholder: 'Código libreta'
    },
    {
      row: 2,
      page: 2,
      key: 6,
      typeProductOwner: 'Libreta',
      name: 'susbtrateFrontPage',
      title: 'Sustrato',
      type: 'checkbox',
      checkboxes: [
        {
          label: 'Bond'
        },
        {
          label: 'Periódico'
        },
        {
          label: 'Bristol'
        },
        {
          label: 'Esmaltado C1S'
        },
        {
          label: 'Rústico/Cosido'
        },
        {
          label: 'Bond Adhesivo'
        },
        {
          label: 'Opalina'
        },
        {
          label: 'Esmaltado C2S'
        },
        {
          label: 'Esmalt Adhesivo'
        },
        {
          label: 'Albanene'
        },
        {
          label: 'Kraft'
        },
        {
          label: 'Vinilo adhesivo'
        },
        {
          label: 'Vinilo Transfer'
        },
        {
          label: 'P. Sublimación'
        },
        {
          label: 'Cartón Industrial'
        },
        {
          label: 'Cartón Duplex'
        },
        {
          label: 'Fotográfico'
        }
      ]
    },
    {
      row: 3,
      page: 2,
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
      page: 2,
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
      page: 2,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'numberInksBackCover',
      title: 'No. de tintas proceso',
      type: 'text',
      placeholder: 'No. de tintas proceso libreta'
    },
    {
      row: 3,
      page: 2,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'pantoneBackCover',
      title: 'Pantone',
      type: 'text',
      placeholder: 'Pantone libreta'
    },
    {
      row: 3,
      page: 2,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'codeBackCover',
      title: 'Código',
      type: 'text',
      placeholder: 'Código libreta'
    },
    {
      row: 4,
      page: 3,
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
      page: 3,
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
      page: 3,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'numberInksInnerSheets',
      title: 'No. de tintas proceso',
      type: 'text',
      placeholder: 'No. de tintas proceso libreta'
    },
    {
      row: 4,
      page: 3,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'pantoneInnerSheets',
      title: 'Pantone',
      type: 'text',
      placeholder: 'Pantone libreta'
    },
    {
      row: 4,
      page: 3,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'codeInnerSheets',
      title: 'Código',
      type: 'text',
      placeholder: 'Código libreta'
    },
    {
      row: 4,
      page: 3,
      key: 6,
      typeProductOwner: 'Libreta',
      name: 'susbtrateSheets',
      title: 'Sustrato',
      type: 'checkbox',
      checkboxes: [
        {
          label: 'Bond'
        },
        {
          label: 'Periódico'
        },
        {
          label: 'Bristol'
        },
        {
          label: 'Esmaltado C1S'
        },
        {
          label: 'Rústico/Cosido'
        },
        {
          label: 'Bond Adhesivo'
        },
        {
          label: 'Opalina'
        },
        {
          label: 'Esmaltado C2S'
        },
        {
          label: 'Esmalt Adhesivo'
        },
        {
          label: 'Albanene'
        },
        {
          label: 'Kraft'
        },
        {
          label: 'Vinilo adhesivo'
        },
        {
          label: 'Vinilo Transfer'
        },
        {
          label: 'P. Sublimación'
        },
        {
          label: 'Cartón Industrial'
        },
        {
          label: 'Cartón Duplex'
        },
        {
          label: 'Fotográfico'
        }
      ]
    },
    {
      row: 5,
      page: 1,
      key: 10,
      typeProductOwner: 'Libreta',
      name: 'numberSheets',
      title: 'Numero de paginas',
      type: 'text',
      placeholder: 'Numero de paginas del producto'
    },
    {
      row: 5,
      page: 1,
      key: 10,
      typeProductOwner: 'Libreta',
      name: 'cost',
      title: 'Costo',
      type: 'text',
      placeholder: 'Costo del producto'
    },
    {
      row: 5,
      page: 1,
      key: 10,
      typeProductOwner: 'Libreta',
      name: 'observations',
      title: 'Observaciones',
      type: 'textarea',
      placeholder: 'Observaciones del producto'
    },
    {
      row: 6,
      page: 1,
      key: 3,
      typeProductOwner: 'Libreta',
      name: 'cover',
      title: 'Encuadernacion',
      type: 'checkbox',
      checkboxes: [
        {
          label: 'Anillado doble O'
        },
        {
          label: 'Paso'
        },
        {
          label: 'Tapa dura'
        },
        {
          label: 'Rústico/Cosido'
        },
        {
          label: 'Lomo'
        },
        {
          label: 'Sobrecubierta'
        },
        {
          label: 'Tapa blanda'
        },
        {
          label: 'Caballete'
        }
      ]
    },
    {
      row: 6,
      page: 1,
      key: 6,
      typeProductOwner: 'Libreta',
      name: 'laminated',
      title: 'Acabados',
      type: 'checkbox',
      checkboxes: [
        {
          label: 'Brillo UV'
        },
        {
          label: 'Sanduchado'
        },
        {
          label: 'Laminado'
        },
        {
          label: 'Anillado'
        },
        {
          label: 'Plegado'
        },
        {
          label: 'Desprendible'
        },
        {
          label: 'Sobrecubierta'
        },
        {
          label: 'Tapa blanda'
        },
        {
          label: 'Caballete'
        }
      ]
    },
    {
      row: 6,
      page: 1,
      key: 6,
      typeProductOwner: 'Libreta',
      name: 'susbtrateNoteBook',
      title: 'Sustrato',
      type: 'checkbox',
      checkboxes: [
        {
          label: 'Bond'
        },
        {
          label: 'Periódico'
        },
        {
          label: 'Bristol'
        },
        {
          label: 'Esmaltado C1S'
        },
        {
          label: 'Rústico/Cosido'
        },
        {
          label: 'Bond Adhesivo'
        },
        {
          label: 'Opalina'
        },
        {
          label: 'Esmaltado C2S'
        },
        {
          label: 'Esmalt Adhesivo'
        },
        {
          label: 'Albanene'
        },
        {
          label: 'Kraft'
        },
        {
          label: 'Vinilo adhesivo'
        },
        {
          label: 'Vinilo Transfer'
        },
        {
          label: 'P. Sublimación'
        },
        {
          label: 'Cartón Industrial'
        },
        {
          label: 'Cartón Duplex'
        },
        {
          label: 'Fotográfico'
        }
      ]
    },
    {
      row: 2,
      page: 1,
      key: 10,
      typeProductOwner: 'Souvenir',
      name: 'dimensionSouvenir',
      title: 'Dimension',
      type: 'text',
      placeholder: 'Dimension de souvenir'
    },
    {
      row: 2,
      page: 1,
      key: 10,
      typeProductOwner: 'Souvenir',
      name: 'costSouvenir',
      title: 'Costo',
      type: 'text',
      placeholder: 'Costo de souvenir'
    },
    {
      row: 2,
      page: 1,
      key: 10,
      typeProductOwner: 'Souvenir',
      name: 'observationsSouvenir',
      title: 'Observaciones',
      type: 'textarea',
      placeholder: 'Observaciones de souvenir'
    },
    {
      row: 3,
      page: 1,
      key: 10,
      typeProductOwner: 'Souvenir',
      name: 'laminatedSouvenir',
      title: 'Acabados',
      type: 'checkbox',
      checkboxes: [
        {
          label: 'Brillo UV'
        },
        {
          label: 'Sanduchado'
        },
        {
          label: 'Laminado'
        },
        {
          label: 'Anillado'
        },
        {
          label: 'Plegado'
        },
        {
          label: 'Desprendible'
        },
        {
          label: 'Sobrecubierta'
        },
        {
          label: 'Tapa blanda'
        },
        {
          label: 'Caballete'
        }
      ]
    },
    {
      row: 2,
      page: 1,
      key: 10,
      typeProductOwner: 'Gran formato',
      name: 'dimensionLargeFormat',
      title: 'Dimension',
      type: 'text',
      placeholder: 'Dimension de gran formato'
    },
    {
      row: 2,
      page: 1,
      key: 10,
      typeProductOwner: 'Gran formato',
      name: 'costLargeFormat',
      title: 'Costo',
      type: 'text',
      placeholder: 'Costo de Gran formato'
    },
    {
      row: 2,
      page: 1,
      key: 10,
      typeProductOwner: 'Gran formato',
      name: 'observationsLargeFormat',
      title: 'Observaciones',
      type: 'textarea',
      placeholder: 'Observaciones de gran formato'
    },
    {
      row: 3,
      page: 1,
      key: 10,
      typeProductOwner: 'Gran formato',
      name: 'laminatedLargeFormat',
      title: 'Acabados',
      type: 'checkbox',
      checkboxes: [
        {
          label: 'Brillo UV'
        },
        {
          label: 'Sanduchado'
        },
        {
          label: 'Laminado'
        },
        {
          label: 'Anillado'
        },
        {
          label: 'Plegado'
        },
        {
          label: 'Desprendible'
        },
        {
          label: 'Sobrecubierta'
        },
        {
          label: 'Tapa blanda'
        },
        {
          label: 'Caballete'
        }
      ]
    },
    {
      row: 3,
      page: 1,
      key: 10,
      typeProductOwner: 'Gran formato',
      name: 'susbtrateLargeFormat',
      title: 'Sustrato',
      type: 'checkbox',
      checkboxes: [
        {
          label: 'Bond'
        },
        {
          label: 'Periódico'
        },
        {
          label: 'Bristol'
        },
        {
          label: 'Esmaltado C1S'
        },
        {
          label: 'Rústico/Cosido'
        },
        {
          label: 'Bond Adhesivo'
        },
        {
          label: 'Opalina'
        },
        {
          label: 'Esmaltado C2S'
        },
        {
          label: 'Esmalt Adhesivo'
        },
        {
          label: 'Albanene'
        },
        {
          label: 'Kraft'
        },
        {
          label: 'Vinilo adhesivo'
        },
        {
          label: 'Vinilo Transfer'
        },
        {
          label: 'P. Sublimación'
        },
        {
          label: 'Cartón Industrial'
        },
        {
          label: 'Cartón Duplex'
        },
        {
          label: 'Fotográfico'
        }
      ]
    },
    {
      row: 2,
      page: 1,
      key: 10,
      typeProductOwner: 'Papelería',
      name: 'dimensionStationery',
      title: 'Dimension',
      type: 'text',
      placeholder: 'Dimension de papeleria'
    },
    {
      row: 2,
      page: 1,
      key: 10,
      typeProductOwner: 'Papelería',
      name: 'costStationery',
      title: 'Costo',
      type: 'text',
      placeholder: 'Costo de Papelería'
    },
    {
      row: 2,
      page: 1,
      key: 10,
      typeProductOwner: 'Papelería',
      name: 'observationsStationery',
      title: 'Observaciones',
      type: 'textarea',
      placeholder: 'Observaciones de papeleria'
    },
    {
      row: 3,
      page: 1,
      key: 10,
      typeProductOwner: 'Papelería',
      name: 'laminatedStationery',
      title: 'Acabados',
      type: 'checkbox',
      checkboxes: [
        {
          label: 'Brillo UV'
        },
        {
          label: 'Sanduchado'
        },
        {
          label: 'Laminado'
        },
        {
          label: 'Anillado'
        },
        {
          label: 'Plegado'
        },
        {
          label: 'Desprendible'
        },
        {
          label: 'Sobrecubierta'
        },
        {
          label: 'Tapa blanda'
        },
        {
          label: 'Caballete'
        }
      ]
    },
    {
      row: 3,
      page: 1,
      key: 10,
      typeProductOwner: 'Papelería',
      name: 'susbtrateStationery',
      title: 'Sustrato',
      type: 'checkbox',
      checkboxes: [
        {
          label: 'Bond'
        },
        {
          label: 'Periódico'
        },
        {
          label: 'Bristol'
        },
        {
          label: 'Esmaltado C1S'
        },
        {
          label: 'Rústico/Cosido'
        },
        {
          label: 'Bond Adhesivo'
        },
        {
          label: 'Opalina'
        },
        {
          label: 'Esmaltado C2S'
        },
        {
          label: 'Esmalt Adhesivo'
        },
        {
          label: 'Albanene'
        },
        {
          label: 'Kraft'
        },
        {
          label: 'Vinilo adhesivo'
        },
        {
          label: 'Vinilo Transfer'
        },
        {
          label: 'P. Sublimación'
        },
        {
          label: 'Cartón Industrial'
        },
        {
          label: 'Cartón Duplex'
        },
        {
          label: 'Fotográfico'
        }
      ]
    }
  ]

  const rows = [...new Set(inputs.map(input => input.row))]

  const convertStringtoArray = (string) => {
    const str = string
    const valuesArray = str.split(',').map(value => {
      const num = parseFloat(value.trim())
      return isNaN(num) ? value.trim() : num
    })

    return valuesArray
  }

  return (
    <Formik
      initialValues={{
        id: editingData.id,
        name: editingData.name,
        typeProduct: editingData.typeProduct,
        notebookSize: editingData.size,
        frontPage: editingData.frontPage === true ? 'Si' : 'No',
        frontPageInks: editingData.frontPageInks === true ? 'Si' : 'No',
        numberInks: editingData.frontPageNumberInks,
        pantone: editingData.frontPagePantone,
        code: editingData.frontPageCode,
        susbtrateFrontPage: editingData.substratumFrontPage !== '' ? convertStringtoArray(editingData.substratumFrontPage) : '',
        backCover: editingData.backCover === true ? 'Si' : 'No',
        backCoverInks: editingData.backCoverInks === true ? 'Si' : 'No',
        numberInksBackCover: editingData.backCoverNumberInks,
        pantoneBackCover: editingData.backCoverPantone,
        codeBackCover: editingData.backCoverCode,
        innerSheets: editingData.inside === true ? 'Si' : 'No',
        innerSheetsInks: editingData.insideInks === true ? 'Si' : 'No',
        numberInksInnerSheets: editingData.insideNumberInks,
        pantoneInnerSheets: editingData.insidePantone,
        codeInnerSheets: editingData.insideCode,
        susbtrateSheets: editingData.substratumInside !== '' ? convertStringtoArray(editingData.substratumInside) : '',
        numberSheets: editingData.numberPages,
        cost: editingData.cost ? (editingData.typeProduct === 'Libreta' ? editingData.cost : '0') : '0',
        costSouvenir: editingData.cost ? (editingData.typeProduct === 'Souvenir' ? editingData.cost : '0') : '0',
        costLargeFormat: editingData.cost ? (editingData.typeProduct === 'Gran formato' ? editingData.cost : '0') : '0',
        costStationery: editingData.cost ? (editingData.typeProduct === 'Papelería' ? editingData.cost : '0') : '0',
        observations: editingData.observations !== '' ? (editingData.typeProduct === 'Libreta' ? editingData.observations : '') : '',
        cover: editingData.cover !== '' ? convertStringtoArray(editingData.cover) : '',
        laminated: editingData.bindings ? (editingData.typeProduct === 'Libreta' ? convertStringtoArray(editingData.bindings) : []) : [],
        susbtrateNoteBook: editingData.substratum ? (editingData.typeProduct === 'Libreta' ? convertStringtoArray(editingData.substratum) : []) : [],
        dimensionSouvenir: editingData.dimension !== '' ? (editingData.typeProduct === 'Souvenir' ? editingData.dimension : '') : '',
        observationsSouvenir: editingData.observations !== '' ? (editingData.typeProduct === 'Souvenir' ? editingData.observations : '') : '',
        laminatedSouvenir: editingData.bindings ? (editingData.typeProduct === 'Souvenir' ? convertStringtoArray(editingData.bindings) : []) : [],
        dimensionLargeFormat: editingData.dimension !== '' ? (editingData.typeProduct === 'Gran formato' ? editingData.dimension : '') : '',
        observationsLargeFormat: editingData.observations !== '' ? (editingData.typeProduct === 'Gran formato' ? editingData.observations : '') : '',
        laminatedLargeFormat: editingData.bindings ? (editingData.typeProduct === 'Gran formato' ? convertStringtoArray(editingData.bindings) : []) : [],
        susbtrateLargeFormat: editingData.substratum ? (editingData.typeProduct === 'Gran formato' ? convertStringtoArray(editingData.substratum) : []) : [],
        dimensionStationery: editingData.dimension !== '' ? (editingData.typeProduct === 'Papelería' ? editingData.dimension : '') : '',
        observationsStationery: editingData.observations !== '' ? (editingData.typeProduct === 'Papelería' ? editingData.observations : '') : '',
        laminatedStationery: editingData.bindings ? (editingData.typeProduct === 'Papelería' ? convertStringtoArray(editingData.bindings) : []) : [],
        supplies: [],
        selectedCheckboxes: [],
        susbtrateStationery: editingData.substratum ? (editingData.typeProduct === 'Papelería' ? convertStringtoArray(editingData.substratum) : []) : [],
        SupplyIds: listSuppliesIds
      }}
      onSubmit={values => {
        console.log(values)
        const coverToSaveInDatabase = values.cover.length !== 0 ? values.cover.join(', ') : ''
        const susbtrateFrontPageToSaveInDatabase = values.susbtrateFrontPage.length !== 0 ? values.susbtrateFrontPage.join(', ') : ''
        const susbtrateSheetsToSaveInDatabase = values.susbtrateSheets.length !== 0 ? values.susbtrateSheets.join(', ') : ''
        const susbtrateToSaveInDatabase =
        values.susbtrateNoteBook.length !== 0
          ? values.susbtrateNoteBook.join(', ')
          : values.susbtrateLargeFormat.length !== 0
            ? values.susbtrateLargeFormat.join(', ')
            : values.susbtrateStationery.length !== 0
              ? values.susbtrateStationery.join(', ')
              : ''
        const laminatedToSaveInDatabase =
        values.laminated.length !== 0
          ? values.laminated.join(', ')
          : values.laminatedSouvenir.length !== 0
            ? values.laminatedSouvenir.join(', ')
            : values.laminatedLargeFormat.length !== 0
              ? values.laminatedLargeFormat.join(', ')
              : values.laminatedStationery.length !== 0
                ? values.laminatedStationery.join(', ')
                : ''

        const dataFormToApi = {
          id: editingData.id,
          Name: values.name,
          TypeProduct: values.typeProduct,
          size: values.notebookSize,
          Cost: values.cost !== '0' ? parseInt(values.cost) : (values.costSouvenir !== '0' ? parseInt(values.costSouvenir) : (values.costLargeFormat !== '0' ? parseInt(values.costLargeFormat) : (values.costStationary !== '0' ? parseInt(values.costStationary) : 0))),
          Observations: values.observations !== ''
            ? values.observations
            : (values.observationsSouvenir !== ''
                ? values.observationsSouvenir
                : (values.observationsStationery !== ''
                    ? values.observationsStationery
                    : values.observationsLargeFormat)),
          FrontPage: values.frontPage === 'Si',
          FrontPageInks: values.frontPageInks === 'Si',
          FrontPageNumberInks: values.numberInks,
          FrontPagePantone: values.pantone,
          FrontPageCode: values.code,
          BackCover: values.backCover === 'Si',
          BackCoverInks: values.backCoverInks === 'Si',
          BackCoverNumberInks: values.numberInksBackCover,
          BackCoverPantone: values.backCoverPantone,
          BackCoverCode: values.codeBackCover,
          Inside: values.innerSheets === 'Si',
          InsideInks: values.innerSheetsInks === 'Si',
          InsideNumberInks: values.numberInksInnerSheets,
          InsidePantone: values.pantoneInnerSheets,
          InsideCode: values.codeInnerSheets,
          NumberPages: parseInt(values.numberSheets),
          Dimension: values.dimensionSouvenir ? values.dimensionSouvenir : (values.dimensionStationery ? values.dimensionStationery : values.dimensionLargeFormat),
          cover: coverToSaveInDatabase,
          substratum: susbtrateToSaveInDatabase,
          substratumFrontPage: susbtrateFrontPageToSaveInDatabase,
          substratumInside: susbtrateSheetsToSaveInDatabase,
          bindings: laminatedToSaveInDatabase,
          SupplyIds: listSuppliesIds
        }
        console.log(listSuppliesIds)
        console.log(dataFormToApi)
        console.log(values)

        // console.log({ ...values, typeProduct: typeProductSelect })
        handleSubmit(dataFormToApi)
      }}
      validationSchema={validationSchema}
    >
    {({ handleChange, values }) => (
    <Form>
      <div>
        {currentPage === 1 && (
          <div>
          {rows.map(row => (
          <div key={row} className="flex">
            {inputs
              .filter(input => input.row === row & input.page === 1)
              .map((input) => (
                (input.typeProductOwner === typeProductSelect || input.typeProductOwner === '') &&
                (input.name !== 'frontPageInks' || (frontPage === 'Si' && input.name === 'frontPageInks')) &&
                (input.name !== 'numberInks' || (frontPageInks === 'Si' && frontPage === 'Si')) &&
                (input.name !== 'pantone' || (frontPageInks === 'Si' && frontPage === 'Si')) &&
                (input.name !== 'code' || (frontPageInks === 'Si' && frontPage === 'Si')) &&
                (input.name !== 'susbtrateFrontPage' || (frontPageInks === 'Si' && frontPage === 'Si')) &&
                (input.name !== 'backCoverInks' || (backCover === 'Si' && input.name === 'backCoverInks')) &&
                (input.name !== 'numberInksBackCover' || (backCoverInks === 'Si' && backCover === 'Si')) &&
                (input.name !== 'pantoneBackCover' || (backCoverInks === 'Si' && backCover === 'Si')) &&
                (input.name !== 'codeBackCover' || (backCoverInks === 'Si' && backCover === 'Si')) &&
                (input.name !== 'susbtrateBackCover' || (backCoverInks === 'Si' && backCover === 'Si')) &&
                (input.name !== 'innerSheetsInks' || (innerSheets === 'Si' && input.name === 'innerSheetsInks')) &&
                (input.name !== 'numberInksInnerSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si')) &&
                (input.name !== 'pantoneInnerSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si')) &&
                (input.name !== 'codeInnerSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si')) &&
                (input.name !== 'susbtrateSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si'))
                  ? (
                    <>
                    {input.type === 'checkbox' && (
                      <div key={input.key} className="flex-1 mr-4 last:mr-0 space-y-6">
                        <label>{input.title}</label>
                        <div className="grid grid-cols-2 gap-4">
                          {input.checkboxes.map((checkbox, index) => (
                            <div key={index} className="flex items-center">
                              <Field
                                type="checkbox"
                                name={input.name}
                                value={checkbox.label}
                                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                              />
                              <label htmlFor={input.label} className="ml-2">
                                {checkbox.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                        {input.type === 'select' &&
                          <div key={input.name} className="flex-1 mr-4 last:mr-0">
                            <label htmlFor={input.name}>{input.title}</label>
                            <Field
                              as='select'
                              name={input.name}
                              id={input.name}
                              value={values[input.name]}
                              onChange={(e) => {
                                handleChange(e)
                                input.action && input.action(e)
                              }}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custo-light block w-full p-2.5"
                            >
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
                          }
                          {input.type === 'select' & input.name === '' &&
                          <div key={input.name} className="flex-1 mr-4 last:mr-0">
                            <label htmlFor={input.name}>{input.title}</label>
                            <Field
                              as='select'
                              name={input.name}
                              id={input.name}
                              value={values[input.name]}
                              onChange={(e) => {
                                handleChange(e)
                                input.action && input.action(e)
                              }}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custo-light block w-full p-2.5"
                            >
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
                          }
                        {input.type === 'textarea' &&
                          <div key={input.key} className="flex-1 mr-4 last:mr-0">
                            <label htmlFor={input.name}>{input.title}</label>
                            <Field
                              as="textarea"
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
                        }
                        {input.type === 'text' &&
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
                        }
                      </>
                    )
                  : (
                      <></>
                    )
              )
              )
            }
          </div>
          ))}
        </div>
        )}

        {currentPage === 2 && (
          <div>
          {rows.map(row => (
          <div key={row} className="flex">
            {inputs
              .filter(input => input.row === row & input.page === 2)
              .map((input) => (
                (input.typeProductOwner === typeProductSelect || input.typeProductOwner === '') &&
                (input.name !== 'frontPageInks' || (frontPage === 'Si' && input.name === 'frontPageInks')) &&
                (input.name !== 'numberInks' || (frontPageInks === 'Si' && frontPage === 'Si')) &&
                (input.name !== 'pantone' || (frontPageInks === 'Si' && frontPage === 'Si')) &&
                (input.name !== 'code' || (frontPageInks === 'Si' && frontPage === 'Si')) &&
                (input.name !== 'susbtrateFrontPage' || (frontPageInks === 'Si' && frontPage === 'Si')) &&
                (input.name !== 'backCoverInks' || (backCover === 'Si' && input.name === 'backCoverInks')) &&
                (input.name !== 'numberInksBackCover' || (backCoverInks === 'Si' && backCover === 'Si')) &&
                (input.name !== 'pantoneBackCover' || (backCoverInks === 'Si' && backCover === 'Si')) &&
                (input.name !== 'codeBackCover' || (backCoverInks === 'Si' && backCover === 'Si')) &&
                (input.name !== 'susbtrateBackCover' || (backCoverInks === 'Si' && backCover === 'Si')) &&
                (input.name !== 'innerSheetsInks' || (innerSheets === 'Si' && input.name === 'innerSheetsInks')) &&
                (input.name !== 'numberInksInnerSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si')) &&
                (input.name !== 'pantoneInnerSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si')) &&
                (input.name !== 'codeInnerSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si')) &&
                (input.name !== 'susbtrateSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si'))
                  ? (
                    <>
                    {input.type === 'checkbox' && (
                      <div key={input.key} className="flex-1 mr-4 last:mr-0 space-y-6">
                        <label>{input.title}</label>
                        <div className="grid grid-cols-2 gap-4">
                          {input.checkboxes.map((checkbox, index) => (
                            <div key={index} className="flex items-center">
                              <Field
                                type="checkbox"
                                name={input.name}
                                value={checkbox.label}
                                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                              />
                              <label htmlFor={input.label} className="ml-2">
                                {checkbox.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                        {input.type === 'select' &&
                          <div key={input.name} className="flex-1 mr-4 last:mr-0">
                            <label htmlFor={input.name}>{input.title}</label>
                            <Field
                              as='select'
                              name={input.name}
                              id={input.name}
                              value={values[input.name]}
                              onChange={(e) => {
                                handleChange(e)
                                input.action && input.action(e)
                              }}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custo-light block w-full p-2.5"
                            >
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
                          }
                          {input.type === 'select' & input.name === '' &&
                          <div key={input.name} className="flex-1 mr-4 last:mr-0">
                            <label htmlFor={input.name}>{input.title}</label>
                            <Field
                              as='select'
                              name={input.name}
                              id={input.name}
                              value={values[input.name]}
                              onChange={(e) => {
                                handleChange(e)
                                input.action && input.action(e)
                              }}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custo-light block w-full p-2.5"
                            >
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
                          }
                        {input.type === 'textarea' &&
                          <div key={input.key} className="flex-1 mr-4 last:mr-0">
                            <label htmlFor={input.name}>{input.title}</label>
                            <Field
                              as="textarea"
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
                        }
                        {input.type === 'text' &&
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
                        }
                      </>
                    )
                  : (
                      <></>
                    )
              )
              )
            }
          </div>
          ))}
        </div>
        )}

        {currentPage === 3 && (
          <div>
          {rows.map(row => (
          <div key={row} className="flex">
            {inputs
              .filter(input => input.row === row & input.page === 3)
              .map((input) => (
                (input.typeProductOwner === typeProductSelect || input.typeProductOwner === '') &&
                (input.name !== 'frontPageInks' || (frontPage === 'Si' && input.name === 'frontPageInks')) &&
                (input.name !== 'numberInks' || (frontPageInks === 'Si' && frontPage === 'Si')) &&
                (input.name !== 'pantone' || (frontPageInks === 'Si' && frontPage === 'Si')) &&
                (input.name !== 'code' || (frontPageInks === 'Si' && frontPage === 'Si')) &&
                (input.name !== 'susbtrateFrontPage' || (frontPageInks === 'Si' && frontPage === 'Si')) &&
                (input.name !== 'backCoverInks' || (backCover === 'Si' && input.name === 'backCoverInks')) &&
                (input.name !== 'numberInksBackCover' || (backCoverInks === 'Si' && backCover === 'Si')) &&
                (input.name !== 'pantoneBackCover' || (backCoverInks === 'Si' && backCover === 'Si')) &&
                (input.name !== 'codeBackCover' || (backCoverInks === 'Si' && backCover === 'Si')) &&
                (input.name !== 'susbtrateBackCover' || (backCoverInks === 'Si' && backCover === 'Si')) &&
                (input.name !== 'innerSheetsInks' || (innerSheets === 'Si' && input.name === 'innerSheetsInks')) &&
                (input.name !== 'numberInksInnerSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si')) &&
                (input.name !== 'pantoneInnerSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si')) &&
                (input.name !== 'codeInnerSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si')) &&
                (input.name !== 'susbtrateSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si'))
                  ? (
                    <>
                    {input.type === 'checkbox' && (
                      <div key={input.key} className="flex-1 mr-4 last:mr-0 space-y-6">
                        <label>{input.title}</label>
                        <div className="grid grid-cols-2 gap-4">
                          {input.checkboxes.map((checkbox, index) => (
                            <div key={index} className="flex items-center">
                              <Field
                                type="checkbox"
                                name={input.name}
                                value={checkbox.label}
                                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                              />
                              <label htmlFor={input.label} className="ml-2">
                                {checkbox.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                        {input.type === 'select' &&
                          <div key={input.name} className="flex-1 mr-4 last:mr-0">
                            <label htmlFor={input.name}>{input.title}</label>
                            <Field
                              as='select'
                              name={input.name}
                              id={input.name}
                              value={values[input.name]}
                              onChange={(e) => {
                                handleChange(e)
                                input.action && input.action(e)
                              }}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custo-light block w-full p-2.5"
                            >
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
                          }
                          {input.type === 'select' & input.name === '' &&
                          <div key={input.name} className="flex-1 mr-4 last:mr-0">
                            <label htmlFor={input.name}>{input.title}</label>
                            <Field
                              as='select'
                              name={input.name}
                              id={input.name}
                              value={values[input.name]}
                              onChange={(e) => {
                                handleChange(e)
                                input.action && input.action(e)
                              }}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custo-light block w-full p-2.5"
                            >
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
                          }
                        {input.type === 'textarea' &&
                          <div key={input.key} className="flex-1 mr-4 last:mr-0">
                            <label htmlFor={input.name}>{input.title}</label>
                            <Field
                              as="textarea"
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
                        }
                        {input.type === 'text' &&
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
                        }
                      </>
                    )
                  : (
                      <></>
                    )
              )
              )
            }
          </div>
          ))}
        </div>
        )}

        {currentPage === 4 && (
          <>
          <div className="w-full md:w-1/2 space-y-6">
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

      <h className='text-xl font-semibold text-gray-900 lg:text-2xl'>Lista de insumos del producto</h>

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
      </>
        )
      }
      </div>
      <div className='space-x-5 mt-8'>
        <button type='button' onClick={handlePrevPage} disabled={currentPage === 1} className='text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:bg-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
          Página anterior
        </button>
        <button type='button' onClick={handleNextPage} disabled={currentPage === totalPages} className='text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:bg-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
          Siguiente página
        </button>
      </div>

      <button
        type="submit"
        className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:bg-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
      >
        Editar producto
      </button>
    </Form>
    )}
  </Formik>
  )
}

export function UpdateButtonProduct ({ product }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleEdit = (data) => {
    dispatch(setWidth({ width: 'w-[1500px]' }))
    dispatch(openModal({ title: 'Editar producto' }))
    dispatch(setAction({ action: 'editing' }))
    dispatch(openEditing({ editingData: data }))
  }
  // ?

  return (
    <button type="button" alt="Icono editar" title="Editar el producto" onClick={() => {
      handleEdit(product)
    }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
      </svg>
    </button>
  )
}

export default updateProduct
