import { useDispatch, useSelector } from 'react-redux'
import { openModal, setAction, setDetailsData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { GrView } from 'react-icons/gr'
import { BsQrCode } from "react-icons/bs";
import { useState, useRef } from 'react'
import { data } from 'autoprefixer';
import LabelSupplyDetails from './LabelSupplyDetails'
import { useReactToPrint } from 'react-to-print'
import { BsFillFileEarmarkBreakFill } from 'react-icons/bs'
const formatDate = (dateString, format = { year: 'numeric', month: 'long', day: 'numeric' }) => {
  if (dateString != null) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, format);

    return formattedDate;
  } else {
    return "N/A"
  }
};




function DetailsSupplyDetails() {



  
  const [loading, setLoading] = useState(false)
  const { detailsData } = useSelector((state) => state.modal)
  const { description, entryDate, statedAt, provider, buySuppliesDetails } = detailsData
  if (loading) {
    return <div>Cargando...</div>

  }
  return (
    <>
      <p><b>Descripcion:</b> {description}</p>
      <p><b>Fecha de entrada:</b> {formatDate(entryDate)}</p>
      <p>
        <b>Proveedor: </b>
        {provider.nitCompany} - {provider.nameCompany}
      </p>
      <br></br>
      <b>Estado:</b> {' '}
      {statedAt
        ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
          Activo
        </span>
        : <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
          Inactivo
        </span>}
      <hr />
      <b>Insumos</b>
      <div className='flex w-full m-0'>
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='border-collapse border border-slate-400'>Nombre</th>
              <th className='border-collapse border border-slate-400'>Bodega</th>
              <th className='border-collapse border border-slate-400'>Fecha de caducidad</th>
              <th className='border-collapse border border-slate-400'>Unidad de Medida</th>
              <th className='border-collapse border border-slate-400'>Precio</th>
              <th className='border-collapse border border-slate-400'>Cantidad</th>
              <th className='border-collapse border border-slate-400'>Subtotal</th>
              <th className=''>Etiqueta</th>
            </tr>
          </thead>
          <tbody>
            {buySuppliesDetails.map((detail, index) => {
             const tablePDFRef = useRef();
             const generatePDF = useReactToPrint({
              content: () => tablePDFRef.current,
              documentTitle: 'Informe de loteo de insumos'
            })
             
              return (
                <tr key={index} className='hover:bg-stone-100'>
                  <td className='border border-slate-400 text-center'>{detail.supply.name}</td>
                  <td className='border border-slate-400 text-center'>{detail.warehouse.ubication}</td>
                  <td className='border border-slate-400 text-center'>{formatDate(detail.expirationDate, 'dd/mm/yyyy')}</td>
                  <td className='border border-slate-400 text-center'>{detail.unitMeasures.name}</td>
                  <td className='border border-slate-400 text-center'>$ {(detail.supplyCost).toLocaleString('en-US')}</td>
                  <td className='border border-slate-400 text-center'>{detail.supplyQuantity}</td>
                  <td className='border border-slate-400 text-center'>$ {(detail.supplyCost * detail.supplyQuantity).toLocaleString('en-US')}</td>
                  <td className='grid justify-items-center'>

                    <div className='hidden'>
                      <div ref={tablePDFRef}>
                        <LabelSupplyDetails key={index} detail={detail} />
                      </div>
                    </div>
                    <div className="relative bg-white py-6 px-20 shadow-2xl mdm:py-6 mdm:px-8 mb-2">
                      <button
                        className="flex items-center justify-center border border-gray-400 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 gap-3"
                        onClick={generatePDF}
                        type="button"
                      >
                        <BsFillFileEarmarkBreakFill />
                        Generar Etiqeuta
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            <tr className='text-center'>
              <td colSpan={7} className='border border-slate-400'>
                <b className='pl-2'>Valor Total: </b>
                {`$ ${buySuppliesDetails.map((detail) => (detail.supplyCost * detail.supplyQuantity)).reduce((a, b) => a + b, 0).toLocaleString('en-US')}`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
export function DetailsButtomSupplyDetails({ supplyDetails }) {
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: 'w-[1200px]' }))
    dispatch(openModal({ title: 'Detalles compra de insumos' }))
    dispatch(setAction({ action: 'details' }))
    dispatch(setDetailsData({ detailsData: supplyDetails }))
  }
  return (
    <button type="button" onClick={() => {
      handleOpen()
    }}>
      <GrView className="opacity-60 h-5 w-5 mr-2" />
    </button>
  )
}
export default DetailsSupplyDetails