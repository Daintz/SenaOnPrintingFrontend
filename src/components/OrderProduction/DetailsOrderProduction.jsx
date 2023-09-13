import { useDispatch, useSelector } from 'react-redux'
import { openModal, setAction, setDetailsData, setWidth } from '../../context/Slices/Modal/ModalSlice'
import { GrView } from 'react-icons/gr'
import { useGetProductByIdQuery } from '../../context/Api/Common'
import { jsPDF } from 'jspdf';
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'
function DetailsOrderProduction () {
  const { detailsData } = useSelector((state) => state.modal);
  const { productId } = detailsData;

  // Manejo de datos del producto
  const { data: productInfo, isLoading, isError } = useGetProductByIdQuery(productId);
  const propertyMapping = {
    // "name": "Nombre",
    "typeProduct": "Tipo de Producto",
    "paperCutId": "ID de Corte de Papel",
    "cost": "Costo",
    "observations": "Observaciones",
    "statedAt": "Estado",
    "size": "Tamaño",
    "frontPage": "Portada",
    "frontPageInks": "Tinta de Portada",
    "frontPageNumberInks": "Número de Tintas en Portada",
    "frontPagePantone": "Pantone de Portada",
    "frontPageCode": "Código de Portada",
    "backCover": "Contraportada",
    "backCoverInks": "Tinta de Contraportada",
    "backCoverNumberInks": "Número de Tintas en Contraportada",
    "backCoverPantone": "Pantone de Contraportada",
    "backCoverCode": "Código de Contraportada",
    "inside": "Interior",
    "insideInks": "Tinta Interior",
    "insideNumberInks": "Número de Tintas Interiores",
    "insidePantone": "Pantone Interior",
    "insideCode": "Código Interior",
    "numberPages": "Número de Páginas",
    "cover": "Portada",
    "bindings": "Encuadernación",
    "dimension": "Dimensión",
    "substratumFrontPage": "Sustrato de Portada",
    "substratumInside": "Sustrato Interior",
    "substratum": "Sustrato"
  };

const filteredProductInfo = Object.keys(productInfo || {}).reduce((acc, key) => {
  const mappedProperty = propertyMapping[key] || key;
  if (!Array.isArray(productInfo[key]) && productInfo[key] !== null && productInfo[key] !== undefined) {
    acc[mappedProperty] = productInfo[key];
  }
  return acc;
}, {});

console.log(filteredProductInfo);

// Luego, puedes seguir utilizando filteredProductInfo en lugar de productInfo en tu código
const productProperties = Object.entries(filteredProductInfo || {});
const middleIndex = Math.ceil(productProperties.length / 2);
const firstColumnProperties = productProperties.slice(0, middleIndex);
const secondColumnProperties = productProperties.slice(middleIndex);


const generatePDF = () => {
  const doc = new jsPDF();

  // Título del PDF
  doc.setFontSize(16);
  doc.text('Detalles de la Orden de Producción', 10, 10);

  // Contenido de la primera columna
  doc.setFontSize(12);
  let yPosition = 30;

  Object.entries(filteredProductInfo || {}).forEach(([property, value]) => {
    doc.text(`${property}: ${value}`, 20, yPosition);
    yPosition += 10;
  });

  // Contenido de la segunda columna
  yPosition = 30;
  const secondColumnX = 100;

  Object.entries(detailsData || {}).forEach(([property, value]) => {
    doc.text(`${property}: ${value}`, secondColumnX, yPosition);
    yPosition += 10;
  });

  // Guardar el PDF
  const fileName = 'detalles_orden_produccion.pdf';
  doc.save(fileName);
};
  return (
    <>
    <div className="flex gap-5 grid-cols-4 mb-3">
    <div className="w-2/4">

    <p><b>Creada por:</b> {detailsData.userName}</p>
    <p><b>Cliente:</b> {detailsData.name}</p>
    <p><b>Producto:</b> {detailsData.product}</p>
    <p><b>Cantidad piezas:</b> {detailsData.quantity}</p>
      <p><b>Recepción del material:</b> {detailsData.materialReception}</p>
      <p><b>Programa:</b> {detailsData.program}</p>
      <p><b>Versión programa:</b> {detailsData.programVersion}</p>


    <p><b>Esquema:</b> <img src={detailsData.scheme} width={200} height={200}/></p>
    <ul>
  {firstColumnProperties.map(([property, value]) => (
    // Omitir las propiedades 'name' y 'cost' en la primera columna
    (property !== 'name' && property !== 'id') && (
      <li key={property}>
    <strong>{property}:</strong> {typeof value === 'boolean' ? (value ? 'Sí' : 'No') : value}
      </li>
    )
  ))}
</ul>
    </div>
    <div className="w-2/4">
    <p><b>Pefil de color:</b> {detailsData.colorProfile}</p>
    <p><b>Sistema de impresión:</b> {detailsData.typeService}</p>
    {detailsData.typePoint && (
  <p><b>Tipo de punto:</b> {detailsData.typePoint}</p>
)}
    <p><b>Maquina:</b> {detailsData.machineName}</p>
    <p><b>Imposición plancha:</b> {detailsData.impositionPlanchName}</p>
      <p><b>Observaciones de orden:</b> {detailsData.observations}</p>
      {/* <p><b>Estado de orden:</b> {detailsData.orderStatus}</p> */}
    <p><b>Imagen:</b><img src={detailsData.image} width={200} height={200}/></p>
    <ul>
    {secondColumnProperties.map(([property, value]) => (
      
  <li key={property}>
    <strong>{property}:</strong> {typeof value === 'boolean' ? (value ? 'Sí' : 'No') : value}
  </li>
))}    <button
className="flex items-center justify-center border border-gray-400 text-white bg-custom-blue hover:bg-custom-blue-light focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 gap-3"
onClick={ generatePDF }
type="button"
>
<BsFillFileEarmarkPdfFill className='w-5 h-5'/>

</button>
        </ul>
    </div>

    </div>

    </>
  )
}

export function DetailsButtonOrderProduction ({ orderProduction }) {
  // ? Este bloque de codigo se usa para poder usar las funciones que estan declaradas en ModalSlice.js y se estan exportando alli
  const dispatch = useDispatch()
  const handleOpen = () => {
    dispatch(setWidth({ width: 'w-[900px]' }))
    dispatch(openModal({ title: 'Detalles orden de producción' }))
    dispatch(setAction({ action: 'details' }))
    dispatch(setDetailsData({ detailsData: orderProduction }))
  }
  // ?

  return (
    
      <button type="button" onClick={() => {
        handleOpen()
      }}
      >
      <GrView alt="Icono detalles" title="Ver detalles de OP" className="opacity-60 h-5 w-5 mr-2" />
      </button>
      
  )
}

export default DetailsOrderProduction

