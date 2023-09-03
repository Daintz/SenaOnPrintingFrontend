import { useDispatch, useSelector } from 'react-redux'
import { openModal, setAction, setDetailsData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { GrView } from 'react-icons/gr'

function DetailsProduct () {
  const { detailsData } = useSelector((state) => state.modal)
  const { typeProduct, name, observations, cost, size, frontPage, frontPageInks, FrontPagePantone, frontPageCode, statedAt, backCover, backCoverInks, backCoverPantone, backCoverCode, inside, insideInks, insidePantone, insideCode, numberPages, dimension, cover, susbtrateFrontPage, susbtrateSheets, bindings, susbtrateLargeFormat, susbtrateStationery, supplies, substratum } = detailsData
  console.log(detailsData)

  return (
    <div className="grid grid-cols-3 gap-16 ">
      <div>
        <p><b>Nombre:</b> {name}</p>
        <p><b>Tipo de producto:</b> {typeProduct}</p>
        <p><b>Observaciones:</b> {observations}</p>
        <p><b>Costo:</b> {cost}</p>
        <p><b>Tamaño:</b> {size}</p>
        <p><b>Portada:</b> {frontPage === true ? 'Si' : 'No'}</p>
        <p><b>Tintas portada:</b> {frontPageInks === true ? 'Si' : 'No'}</p>
        <p><b>Portada pantone:</b> {FrontPagePantone}</p>
        <p><b>Portada codigo:</b> {frontPageCode}</p>
        <p><b>Sutratos Portada:</b> {susbtrateFrontPage}</p>
        <p><b>Contraportada:</b> {backCover === true ? 'Si' : 'No'}</p>
      </div>
      <div>
        <p><b>Tintas contraportada:</b> {backCoverInks === true ? 'Si' : 'No'}</p>
        <p><b>Contraportada pantone:</b> {backCoverPantone}</p>
        <p><b>Contraportada codigo:</b> {backCoverCode}</p>
        <p><b>Sustratos contraportada:</b> {susbtrateSheets}</p>
        <p><b>Interior hojas:</b> {inside === true ? 'Si' : 'No'}</p>
        <p><b>Tintas interior hojas:</b> {insideInks === true ? 'Si' : 'No'}</p>
        <p><b>Interior hojas pantone:</b> {insidePantone}</p>
        <p><b>Interior hojas codigo:</b> {insideCode}</p>
        <p><b>Numero de paginas:</b> {numberPages}</p>
        <p><b>Dimension:</b> {dimension}</p>
        <p><b>Encuadernacion:</b> {cover}</p>
      </div>
      <div>
        <p><b>Acabados:</b> {bindings}</p>
        <p><b>Sustratos gran formato:</b> {susbtrateLargeFormat}</p>
        <p><b>Sustratos papeleria:</b> {susbtrateStationery}</p>
        <p><b>Sustratos:</b> {substratum}</p>
        <p><b>Insumos:</b> {supplies[0].supply.name}</p>
      </div>

      <p>
      <b>Estado:</b> {' '}
      {statedAt
        ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
            Activo
          </span>
        : <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            Inactivo
          </span>}
      </p>
    </div>
  )
}

export function DetailsButtonProduct ({ product }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: 'w-[1100px]' }))
    dispatch(openModal({ title: 'Detalles producto' }))
    dispatch(setAction({ action: 'details' }))
    dispatch(setDetailsData({ detailsData: product }))
  }
  // ?

  return (
      <button type="button" onClick={() => {
        handleOpen()
      }}>
        <GrView alt="Icono detalles" title="Ver detalles del producto" className="opacity-60 h-5 w-5 mr-2" />
      </button>
  )
}

export default DetailsProduct
