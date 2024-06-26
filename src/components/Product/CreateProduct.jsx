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
import React, { useEffect, useMemo, useState } from 'react'
import { useTable, usePagination, useGlobalFilter } from 'react-table'
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { FaAsterisk } from 'react-icons/fa'
import clientAxios from '../../config/clientAxios'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  typeProduct: Yup.string().notOneOf(['Elige una opción'], 'Selecciona una opción válida').oneOf(['Libreta', 'Souvenir', 'Gran formato', 'Papelería'], 'Selecciona una opción válida'),
  cost: Yup.string().required('Campo requerido')
})

const validationSchemaNotebook = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  typeProduct: Yup.string().notOneOf(['Elige una opción'], 'Selecciona una opción válida'),
  notebookSize: Yup.string().required('Campo requerido'),
  cost: Yup.string().required('Campo requerido'),
  observations: Yup.string().required('Campo requerido'),
  frontPage: Yup.string().notOneOf(['Elige una opción'], 'Selecciona una opción válida'),
  backCover: Yup.string().notOneOf(['Elige una opción'], 'Selecciona una opción válida'),
  innerSheets: Yup.string().notOneOf(['Elige una opción'], 'Selecciona una opción válida')
})

const validationSchemaSouvenir = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  typeProduct: Yup.string().notOneOf(['Elige una opción'], 'Selecciona una opción válida'),
  costSouvenir: Yup.string().required('Campo requerido'),
  observationsSouvenir: Yup.string().required('Campo requerido')
})

const validationSchemaLargeFormat = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  typeProduct: Yup.string().notOneOf(['Elige una opción'], 'Selecciona una opción válida'),
  costLargeFormat: Yup.string().required('Campo requerido'),
  observationsLargeFormat: Yup.string().required('Campo requerido')
})

const validationSchemaStationery = Yup.object().shape({
  name: Yup.string().required('Campo requerido'),
  typeProduct: Yup.string().notOneOf(['Elige una opción'], 'Selecciona una opción válida'),
  costStationery: Yup.string().required('Campo requerido'),
  observationsStationery: Yup.string().required('Campo requerido')
})

function CreateProduct () {
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
  const [createProduct, { error, isLoading }] = usePostProductMutation()

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
    console.log(values)
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
      setListSuppliesIds([...listSuppliesIds, cell.id])
    }
  }

  const deleteProduct = (cell) => {
    const updatedListSupplies = listSupplies.filter(supply => supply.id !== cell)
    setListSupplies(updatedListSupplies)

    const updatedListSuppliesIds = listSuppliesIds.filter(supply => supply !== cell)
    console.log(updatedListSuppliesIds)
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
      placeholder: 'Nombre del producto',
      obligatory: true
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
      action: handleTypeProduct,
      obligatory: true
    },
    {
      row: 1,
      page: 1,
      key: 2,
      typeProductOwner: 'Libreta',
      name: 'notebookSize',
      title: 'Tamaño',
      type: 'select',
      options: ['Elije una opción', ...paperCutOptions],
      obligatory: true
    },
    {
      row: 2,
      page: 2,
      key: 3,
      typeProductOwner: 'Libreta',
      name: 'frontPage',
      title: 'Portada',
      type: 'select',
      options: ['Elige una opción', 'Si', 'No'],
      value: frontPage,
      action: handleFrontPage,
      obligatory: true
    },
    {
      row: 2,
      page: 2,
      key: 4,
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
      key: 6,
      typeProductOwner: 'Libreta',
      name: 'pantone',
      title: 'Pantone',
      type: 'text',
      placeholder: 'Pantone libreta'
    },
    {
      row: 2,
      page: 2,
      key: 7,
      typeProductOwner: 'Libreta',
      name: 'code',
      title: 'Código',
      type: 'text',
      placeholder: 'Código libreta'
    },
    {
      row: 2,
      page: 2,
      key: 8,
      typeProductOwner: 'Libreta',
      name: 'susbtrateFrontPage',
      title: 'Sustrato',
      type: 'checkbox',
      checkboxes: [
        {
          key: 1,
          label: 'Bond'
        },
        {
          key: 2,
          label: 'Periódico'
        },
        {
          key: 3,
          label: 'Bristol'
        },
        {
          key: 4,
          label: 'Esmaltado C1S'
        },
        {
          key: 5,
          label: 'Rústico/Cosido'
        },
        {
          key: 6,
          label: 'Bond Adhesivo'
        },
        {
          key: 7,
          label: 'Opalina'
        },
        {
          key: 8,
          label: 'Esmaltado C2S'
        },
        {
          key: 9,
          label: 'Esmalt Adhesivo'
        },
        {
          key: 10,
          label: 'Albanene'
        },
        {
          key: 11,
          label: 'Kraft'
        },
        {
          key: 12,
          label: 'Vinilo adhesivo'
        },
        {
          key: 13,
          label: 'Vinilo Transfer'
        },
        {
          key: 14,
          label: 'P. Sublimación'
        },
        {
          key: 15,
          label: 'Cartón Industrial'
        },
        {
          key: 16,
          label: 'Cartón Duplex'
        },
        {
          key: 16,
          label: 'Fotográfico'
        }
      ]
    },
    {
      row: 3,
      page: 2,
      key: 9,
      typeProductOwner: 'Libreta',
      name: 'backCover',
      title: 'Contraportada',
      type: 'select',
      options: ['Elige una opción', 'Si', 'No'],
      value: backCover,
      action: handleBackCover,
      obligatory: true
    },
    {
      row: 3,
      page: 2,
      key: 10,
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
      key: 11,
      typeProductOwner: 'Libreta',
      name: 'numberInksBackCover',
      title: 'No. de tintas proceso',
      type: 'text',
      placeholder: 'No. de tintas proceso libreta'
    },
    {
      row: 3,
      page: 2,
      key: 12,
      typeProductOwner: 'Libreta',
      name: 'pantoneBackCover',
      title: 'Pantone',
      type: 'text',
      placeholder: 'Pantone libreta'
    },
    {
      row: 3,
      page: 2,
      key: 13,
      typeProductOwner: 'Libreta',
      name: 'codeBackCover',
      title: 'Código',
      type: 'text',
      placeholder: 'Código libreta'
    },
    {
      row: 4,
      page: 3,
      key: 14,
      typeProductOwner: 'Libreta',
      name: 'innerSheets',
      title: 'Interior paginas',
      type: 'select',
      options: ['Elige una opción', 'Si', 'No'],
      value: innerSheets,
      action: handleInnerSheets,
      obligatory: true
    },
    {
      row: 4,
      page: 3,
      key: 15,
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
      key: 16,
      typeProductOwner: 'Libreta',
      name: 'numberInksInnerSheets',
      title: 'No. de tintas proceso',
      type: 'text',
      placeholder: 'No. de tintas proceso libreta'
    },
    {
      row: 4,
      page: 3,
      key: 17,
      typeProductOwner: 'Libreta',
      name: 'pantoneInnerSheets',
      title: 'Pantone',
      type: 'text',
      placeholder: 'Pantone libreta'
    },
    {
      row: 4,
      page: 3,
      key: 18,
      typeProductOwner: 'Libreta',
      name: 'codeInnerSheets',
      title: 'Código',
      type: 'text',
      placeholder: 'Código libreta'
    },
    {
      row: 4,
      page: 3,
      key: 19,
      typeProductOwner: 'Libreta',
      name: 'susbtrateSheets',
      title: 'Sustrato',
      type: 'checkbox',
      checkboxes: [
        {
          key: 1,
          label: 'Bond'
        },
        {
          key: 2,
          label: 'Periódico'
        },
        {
          key: 3,
          label: 'Bristol'
        },
        {
          key: 4,
          label: 'Esmaltado C1S'
        },
        {
          key: 5,
          label: 'Rústico/Cosido'
        },
        {
          key: 6,
          label: 'Bond Adhesivo'
        },
        {
          key: 7,
          label: 'Opalina'
        },
        {
          key: 8,
          label: 'Esmaltado C2S'
        },
        {
          key: 9,
          label: 'Esmalt Adhesivo'
        },
        {
          key: 10,
          label: 'Albanene'
        },
        {
          key: 11,
          label: 'Kraft'
        },
        {
          key: 12,
          label: 'Vinilo adhesivo'
        },
        {
          key: 13,
          label: 'Vinilo Transfer'
        },
        {
          key: 14,
          label: 'P. Sublimación'
        },
        {
          key: 15,
          label: 'Cartón Industrial'
        },
        {
          key: 16,
          label: 'Cartón Duplex'
        },
        {
          key: 16,
          label: 'Fotográfico'
        }
      ]
    },
    {
      row: 5,
      page: 1,
      key: 20,
      typeProductOwner: 'Libreta',
      name: 'numberSheets',
      title: 'Numero de paginas',
      type: 'text',
      placeholder: 'Numero de paginas del producto'
    },
    {
      row: 5,
      page: 1,
      key: 21,
      typeProductOwner: 'Libreta',
      name: 'cost',
      title: 'Costo',
      type: 'text',
      placeholder: 'Costo del producto',
      obligatory: true
    },
    {
      row: 5,
      page: 1,
      key: 22,
      typeProductOwner: 'Libreta',
      name: 'observations',
      title: 'Observaciones',
      type: 'textarea',
      placeholder: 'Observaciones del producto',
      obligatory: true
    },
    {
      row: 6,
      page: 1,
      key: 23,
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
      key: 24,
      typeProductOwner: 'Libreta',
      name: 'laminated',
      title: 'Acabados',
      type: 'checkbox',
      checkboxes: [
        {
          key: 1,
          label: 'Brillo UV'
        },
        {
          key: 2,
          label: 'Laminado'
        },
        {
          key: 3,
          label: 'Plegado'
        },
        {
          key: 4,
          label: 'Sanduchado'
        },
        {
          key: 4,
          label: 'Grafa'
        },
        {
          key: 4,
          label: 'Desprendible'
        }
      ]
    },
    {
      row: 6,
      page: 1,
      key: 25,
      typeProductOwner: 'Libreta',
      name: 'susbtrateNoteBook',
      title: 'Sustrato',
      type: 'checkbox',
      checkboxes: [
        {
          key: 1,
          label: 'Bond'
        },
        {
          key: 2,
          label: 'Periódico'
        },
        {
          key: 3,
          label: 'Bristol'
        },
        {
          key: 4,
          label: 'Esmaltado C1S'
        },
        {
          key: 5,
          label: 'Rústico/Cosido'
        },
        {
          key: 6,
          label: 'Bond Adhesivo'
        },
        {
          key: 7,
          label: 'Opalina'
        },
        {
          key: 8,
          label: 'Esmaltado C2S'
        },
        {
          key: 9,
          label: 'Esmalt Adhesivo'
        },
        {
          key: 10,
          label: 'Albanene'
        },
        {
          key: 11,
          label: 'Kraft'
        },
        {
          key: 12,
          label: 'Vinilo adhesivo'
        },
        {
          key: 13,
          label: 'Vinilo Transfer'
        },
        {
          key: 14,
          label: 'P. Sublimación'
        },
        {
          key: 15,
          label: 'Cartón Industrial'
        },
        {
          key: 16,
          label: 'Cartón Duplex'
        },
        {
          key: 16,
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
      placeholder: 'Costo de souvenir',
      obligatory: true
    },
    {
      row: 2,
      page: 1,
      key: 10,
      typeProductOwner: 'Souvenir',
      name: 'observationsSouvenir',
      title: 'Observaciones',
      type: 'textarea',
      placeholder: 'Observaciones de souvenir',
      obligatory: true
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
          key: 1,
          label: 'Brillo UV'
        },
        {
          key: 2,
          label: 'Sanduchado'
        },
        {
          key: 3,
          label: 'Laminado'
        },
        {
          key: 4,
          label: 'Anillado'
        },
        {
          key: 5,
          label: 'Plegado'
        },
        {
          key: 6,
          label: 'Desprendible'
        },
        {
          key: 7,
          label: 'Sobrecubierta'
        },
        {
          key: 8,
          label: 'Tapa blanda'
        },
        {
          key: 9,
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
      placeholder: 'Costo de Gran formato',
      obligatory: true
    },
    {
      row: 2,
      page: 1,
      key: 10,
      typeProductOwner: 'Gran formato',
      name: 'observationsLargeFormat',
      title: 'Observaciones',
      type: 'textarea',
      placeholder: 'Observaciones de gran formato',
      obligatory: true
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
          key: 1,
          label: 'Brillo UV'
        },
        {
          key: 2,
          label: 'Sanduchado'
        },
        {
          key: 3,
          label: 'Laminado'
        },
        {
          key: 4,
          label: 'Anillado'
        },
        {
          key: 5,
          label: 'Plegado'
        },
        {
          key: 6,
          label: 'Desprendible'
        },
        {
          key: 7,
          label: 'Sobrecubierta'
        },
        {
          key: 8,
          label: 'Tapa blanda'
        },
        {
          key: 9,
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
          key: 1,
          label: 'Bond'
        },
        {
          key: 2,
          label: 'Periódico'
        },
        {
          key: 3,
          label: 'Bristol'
        },
        {
          key: 4,
          label: 'Esmaltado C1S'
        },
        {
          key: 5,
          label: 'Rústico/Cosido'
        },
        {
          key: 6,
          label: 'Bond Adhesivo'
        },
        {
          key: 7,
          label: 'Opalina'
        },
        {
          key: 8,
          label: 'Esmaltado C2S'
        },
        {
          key: 9,
          label: 'Esmalt Adhesivo'
        },
        {
          key: 10,
          label: 'Albanene'
        },
        {
          key: 11,
          label: 'Kraft'
        },
        {
          key: 12,
          label: 'Vinilo adhesivo'
        },
        {
          key: 13,
          label: 'Vinilo Transfer'
        },
        {
          key: 14,
          label: 'P. Sublimación'
        },
        {
          key: 15,
          label: 'Cartón Industrial'
        },
        {
          key: 16,
          label: 'Cartón Duplex'
        },
        {
          key: 16,
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
      placeholder: 'Costo de Papelería',
      obligatory: true
    },
    {
      row: 2,
      page: 1,
      key: 10,
      typeProductOwner: 'Papelería',
      name: 'observationsStationery',
      title: 'Observaciones',
      type: 'textarea',
      placeholder: 'Observaciones de papeleria',
      obligatory: true
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
          key: 1,
          label: 'Brillo UV'
        },
        {
          key: 2,
          label: 'Sanduchado'
        },
        {
          key: 3,
          label: 'Laminado'
        },
        {
          key: 4,
          label: 'Anillado'
        },
        {
          key: 5,
          label: 'Plegado'
        },
        {
          key: 6,
          label: 'Desprendible'
        },
        {
          key: 7,
          label: 'Sobrecubierta'
        },
        {
          key: 8,
          label: 'Tapa blanda'
        },
        {
          key: 9,
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
          key: 1,
          label: 'Bond'
        },
        {
          key: 2,
          label: 'Periódico'
        },
        {
          key: 3,
          label: 'Bristol'
        },
        {
          key: 4,
          label: 'Esmaltado C1S'
        },
        {
          key: 5,
          label: 'Rústico/Cosido'
        },
        {
          key: 6,
          label: 'Bond Adhesivo'
        },
        {
          key: 7,
          label: 'Opalina'
        },
        {
          key: 8,
          label: 'Esmaltado C2S'
        },
        {
          key: 9,
          label: 'Esmalt Adhesivo'
        },
        {
          key: 10,
          label: 'Albanene'
        },
        {
          key: 11,
          label: 'Kraft'
        },
        {
          key: 12,
          label: 'Vinilo adhesivo'
        },
        {
          key: 13,
          label: 'Vinilo Transfer'
        },
        {
          key: 14,
          label: 'P. Sublimación'
        },
        {
          key: 15,
          label: 'Cartón Industrial'
        },
        {
          key: 16,
          label: 'Cartón Duplex'
        },
        {
          key: 16,
          label: 'Fotográfico'
        }
      ]
    }
  ]

  const rows = [...new Set(inputs.map(input => input.row))]

  return (
    <Formik
      initialValues={{
        name: '',
        typeProduct: '',
        notebookSize: '',
        frontPage: '',
        frontPageInks: '',
        numberInks: '',
        pantone: '',
        code: '',
        susbtrateFrontPage: [],
        backCover: '',
        backCoverInks: '',
        numberInksBackCover: '',
        pantoneBackCover: '',
        codeBackCover: '',
        innerSheets: '',
        innerSheetsInks: '',
        numberInksInnerSheets: '',
        pantoneInnerSheets: '',
        codeInnerSheets: '',
        susbtrateSheets: [],
        numberSheets: '',
        cost: '',
        costSouvenir: '',
        costLargeFormat: '',
        costStationery: '',
        observations: '',
        cover: [],
        laminated: [],
        susbtrateNoteBook: [],
        dimensionSouvenir: '',
        observationsSouvenir: '',
        laminatedSouvenir: [],
        dimensionLargeFormat: '',
        observationsLargeFormat: '',
        laminatedLargeFormat: [],
        susbtrateLargeFormat: [],
        dimensionStationery: '',
        observationsStationery: '',
        laminatedStationery: [],
        supplies: [],
        selectedCheckboxes: [],
        susbtrateStationery: []
      }}
      onSubmit={values => {
        const coverToSaveInDatabase = values.cover ? values.cover.join(', ') : ''
        const susbtrateFrontPageToSaveInDatabase = values.susbtrateFrontPage ? values.susbtrateFrontPage.join(', ') : ''
        const susbtrateSheetsToSaveInDatabase = values.susbtrateSheets ? values.susbtrateSheets.join(', ') : ''
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
          Name: values.name,
          TypeProduct: typeProductSelect,
          size: values.notebookSize,
          Cost: values.cost !== '' ? parseInt(values.cost) : (values.costSouvenir !== '' ? parseInt(values.costSouvenir) : (values.costLargeFormat !== '' ? parseInt(values.costLargeFormat) : (values.costStationary !== '' ? parseInt(values.costStationary) : null))),
          Observations: values.observations !== ''
            ? values.observations
            : (values.observationsSouvenir !== ''
                ? values.observationsSouvenir
                : (values.observationsStationery !== ''
                    ? values.observationsStationery
                    : values.observationsLargeFormat)),
          FrontPage: values.frontPage === 'Si',
          FrontPageInks: values.frontPageInks === 'Si',
          FrontPageNumberInks: values.numberInks ? values.numberInks : '',
          FrontPagePantone: values.pantone ? values.pantone : '',
          FrontPageCode: values.code ? values.code : '',
          BackCover: values.backCover === 'Si',
          BackCoverInks: values.backCoverInks === 'Si',
          BackCoverNumberInks: values.numberInksBackCover ? values.numberInksBackCover : '',
          backCoverPantone: values.pantoneBackCover ? values.pantoneBackCover : '',
          backCoverCode: values.codeBackCover ? values.codeBackCover : '',
          Inside: values.innerSheets === 'Si',
          InsideInks: values.innerSheetsInks === 'Si',
          InsideNumberInks: values.numberInksInnerSheets ? values.numberInksInnerSheets : '',
          InsidePantone: values.pantoneInnerSheets ? values.pantoneInnerSheets : '',
          InsideCode: values.codeInnerSheets ? values.codeInnerSheets : '',
          NumberPages: values.numberSheets ? parseInt(values.numberSheets) : 0,
          Dimension: values.dimensionSouvenir ? values.dimensionSouvenir : (values.dimensionStationery ? values.dimensionStationery : (values.dimensionLargeFormat ? values.dimensionLargeFormat : '')),
          cover: coverToSaveInDatabase,
          substratum: susbtrateToSaveInDatabase,
          substratumFrontPage: susbtrateFrontPageToSaveInDatabase,
          substratumInside: susbtrateSheetsToSaveInDatabase,
          bindings: laminatedToSaveInDatabase,
          SupplyIds: listSuppliesIds
        }
        console.log(dataFormToApi)
        console.log(values)

        // console.log({ ...values, typeProduct: typeProductSelect })
        handleSubmit(dataFormToApi)
      }}
      validationSchema={typeProductSelect === 'Gran formato' ? validationSchemaLargeFormat : typeProductSelect === 'Papelería' ? validationSchemaStationery : typeProductSelect === 'Souvenir' ? validationSchemaSouvenir : typeProductSelect === 'Libreta' ? validationSchemaNotebook : validationSchema}
  >
  {({ handleChange, values }) => (
    <Form>
      <>
        {currentPage === 1
          ? <>
          {rows.map(row => (
          <div key={row} className="flex">
            {inputs
              .filter(input => input.row === row & input.page === 1)
              .map((input, index) => (
                (input.typeProductOwner === typeProductSelect || input.typeProductOwner === '')
                  ? <React.Fragment key={index}>
                    {input.type === 'checkbox'
                      ? <div key={input.key} className="flex-1 mr-4 last:mr-0 space-y-2 mt-5">
                        <div className='flex flex-row'>
                          <label>{input.title}</label>
                          {input.obligatory ? <FaAsterisk className='w-2 h-2  ml-1 text-red-900' /> : null}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {input.checkboxes.map((checkbox, index) => (
                            <div key={checkbox.key} className="flex items-center">
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
                      : null}
                    {input.type === 'select'
                      ? <div key={input.name} className="flex-1 mr-4 last:mr-0 mt-5">
                      <div className='flex flex-row'>
                        <label htmlFor={input.name}>{input.title}</label>
                        {input.obligatory ? <FaAsterisk className='w-2 h-2  ml-1 text-red-900' /> : null}
                      </div>
                      <Field
                        as='select'
                        name={input.name}
                        id={input.name}
                        value={values[input.name]}
                        onChange={(e) => {
                          handleChange(e)
                          input?.action(e)
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
                      : null}
                    {input.type === 'select' & input.name === ''
                      ? <div key={input.name} className="flex-1 mr-4 last:mr-0 mt-5">
                        <div className='flex flex-row'>
                          <label htmlFor={input.name}>{input.title}</label>
                          {input.obligatory ? <FaAsterisk className='w-2 h-2  ml-1 text-red-900' /> : null}
                        </div>
                        <Field
                          as='select'
                          name={input.name}
                          id={input.name}
                          value={values[input.name]}
                          onChange={(e) => {
                            handleChange(e)
                            input?.action(e)
                          }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custo-light block w-full p-2.5"
                        >
                            {input.options.map((option, index) => (
                              <option key={option.key} value={option}>
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
                      : null
                    }
                    {input.type === 'textarea'
                      ? <div key={input.key} className="flex-1 mr-4 last:mr-0 mt-5">
                        <div className='flex flex-row'>
                          <label htmlFor={input.name}>{input.title}</label>
                          {input.obligatory ? <FaAsterisk className='w-2 h-2  ml-1 text-red-900' /> : null}
                        </div>
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
                      : null
                    }
                    {input.type === 'text'
                      ? <div key={input.key} className="flex-1 mr-4 last:mr-0 mt-5">
                        <div className='flex flex-row'>
                          <label htmlFor={input.name}>{input.title}</label>
                          {input.obligatory ? <FaAsterisk className='w-2 h-2  ml-1 text-red-900' /> : null}
                        </div>
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
                      : null
                    }
                  </React.Fragment>
                  : null
              ))}
          </div>
          ))}
        </>
          : null
        }

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
                (input.name !== 'innerSheetsInks' || (innerSheets === 'Si' && input.name === 'innerSheetsInks'))
                  ? <>
                    {input.type === 'checkbox'
                      ? <div key={input.key} className="flex-1 mr-4 last:mr-0 space-y-2 mt-5">
                        <div className='flex flex-row'>
                          <label>{input.title}</label>
                          {input.obligatory ? <FaAsterisk className='w-2 h-2  ml-1 text-red-900' /> : null}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {input.checkboxes.map((checkbox, index) => (
                            <div key={checkbox.key} className="flex items-center">
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
                      : null}
                    {input.type === 'select'
                      ? <div key={input.name} className="flex-1 mr-4 last:mr-0 mt-5">
                      <div className='flex flex-row'>
                        <label htmlFor={input.name}>{input.title}</label>
                        {input.obligatory ? <FaAsterisk className='w-2 h-2  ml-1 text-red-900' /> : null}
                      </div>
                      <Field
                        as='select'
                        name={input.name}
                        id={input.name}
                        value={values[input.name]}
                        onChange={(e) => {
                          handleChange(e)
                          input?.action(e)
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custo-light block w-full p-2.5"
                      >
                          {input.options.map((option, index) => (
                            <option key={option.key} value={option}>
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
                      : null}
                    {input.type === 'select' & input.name === ''
                      ? <div key={input.name} className="flex-1 mr-4 last:mr-0 mt-5">
                        <div className='flex flex-row'>
                          <label htmlFor={input.name}>{input.title}</label>
                          {input.obligatory ? <FaAsterisk className='w-2 h-2  ml-1 text-red-900' /> : null}
                        </div>
                        <Field
                          as='select'
                          name={input.name}
                          id={input.name}
                          value={values[input.name]}
                          onChange={(e) => {
                            handleChange(e)
                            input?.action(e)
                          }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custo-light block w-full p-2.5"
                        >
                            {input.options.map((option, index) => (
                              <option key={option.key} value={option}>
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
                      : null
                    }
                    {input.type === 'text'
                      ? <div key={input.key} className="flex-1 mr-4 last:mr-0 mt-5">
                        <div className='flex flex-row'>
                          <label htmlFor={input.name}>{input.title}</label>
                          {input.obligatory ? <FaAsterisk className='w-2 h-2  ml-1 text-red-900' /> : null}
                        </div>
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
                      : null
                    }
                  </>
                  : null
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
                (input.name !== 'innerSheetsInks' || (innerSheets === 'Si' && input.name === 'innerSheetsInks')) &&
                (input.name !== 'numberInksInnerSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si')) &&
                (input.name !== 'pantoneInnerSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si')) &&
                (input.name !== 'codeInnerSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si')) &&
                (input.name !== 'susbtrateSheets' || (innerSheetsInks === 'Si' && innerSheets === 'Si'))
                  ? <>
                    {input.type === 'checkbox'
                      ? <div key={input.key} className="flex-1 mr-4 last:mr-0 space-y-2 mt-5">
                        <div className='flex flex-row'>
                          <label>{input.title}</label>
                          {input.obligatory ? <FaAsterisk className='w-2 h-2  ml-1 text-red-900' /> : null}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {input.checkboxes.map((checkbox, index) => (
                            <div key={checkbox.key} className="flex items-center">
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
                      : null}
                    {input.type === 'select'
                      ? <div key={input.name} className="flex-1 mr-4 last:mr-0 mt-5">
                      <div className='flex flex-row'>
                        <label htmlFor={input.name}>{input.title}</label>
                        {input.obligatory ? <FaAsterisk className='w-2 h-2  ml-1 text-red-900' /> : null}
                      </div>
                      <Field
                        as='select'
                        name={input.name}
                        id={input.name}
                        value={values[input.name]}
                        onChange={(e) => {
                          handleChange(e)
                          input?.action(e)
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custo-light block w-full p-2.5"
                      >
                          {input.options.map((option, index) => (
                            <option key={option.key} value={option}>
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
                      : null}
                    {input.type === 'select' & input.name === ''
                      ? <div key={input.name} className="flex-1 mr-4 last:mr-0 mt-5">
                        <div className='flex flex-row'>
                          <label htmlFor={input.name}>{input.title}</label>
                          {input.obligatory ? <FaAsterisk className='w-2 h-2  ml-1 text-red-900' /> : null}
                        </div>
                        <Field
                          as='select'
                          name={input.name}
                          id={input.name}
                          value={values[input.name]}
                          onChange={(e) => {
                            handleChange(e)
                            input?.action(e)
                          }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-custom-blue-light focus:border-custo-light block w-full p-2.5"
                        >
                            {input.options.map((option, index) => (
                              <option key={option.key} value={option}>
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
                      : null
                    }
                    {input.type === 'text'
                      ? <div key={input.key} className="flex-1 mr-4 last:mr-0 mt-5">
                        <div className='flex flex-row'>
                          <label htmlFor={input.name}>{input.title}</label>
                          {input.obligatory ? <FaAsterisk className='w-2 h-2  ml-1 text-red-900' /> : null}
                        </div>
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
                      : null
                    }
                  </>
                  : null
              )
              )
            }
          </div>
          ))}
        </div>
        )}

        {currentPage === 4 && (
          <>
          <h1 className='text-xl font-semibold text-gray-900 lg:text-2xl'>Agregar insumos al producto</h1>
          <div className="w-full md:w-1/2 mt-5">
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
          <div className="overflow-x-auto rounded-xl border border-gray-400 mt-5">
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

      <h1 className='text-xl font-semibold text-gray-900 lg:text-2xl mt-10'>Lista de insumos del producto</h1>

      <div className="overflow-x-auto rounded-xl border border-gray-400  mt-5">
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
      </>
      <div className='space-x-5 mt-8'>
        {currentPage > 1 & currentPage <= totalPages
          ? <button type='button' onClick={handlePrevPage} disabled={currentPage === 1} className="text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:bg-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center">
          Página anterior
        </button>
          : null}
        {currentPage > 0 & currentPage < totalPages
          ? <button type='button' onClick={handleNextPage} disabled={currentPage === totalPages} className="text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:bg-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center">
          Siguiente página
        </button>
          : null}

      </div>

      <button
        type="submit"
        className="w-full text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:outline-none focus:bg-custom-blue-light font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
      >
        Crear producto
      </button>
    </Form>
  )}
</Formik>
  )
}

export function CreateButtonProduct () {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: 'w-[1600px]' }))
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
