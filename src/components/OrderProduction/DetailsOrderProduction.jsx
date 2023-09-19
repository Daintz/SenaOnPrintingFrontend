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
    "name": "Nombre",
    "typeProduct": "Tipo de producto",
    "paperCutId": "Corte de papel",
    "cost": "Costo",
    // "observations": "Observaciones",
    // "statedAt": "Estado",
    "size": "Tamaño",
    "frontPage": "Portada",
    "frontPageInks": "Tinta portada",
    "frontPageNumberInks": "Número de tintas portada",
    "frontPagePantone": "Pantone de portada",
    "frontPageCode": "Código pantone portada",
    "backCover": "Contraportada",
    "backCoverInks": "Tinta de contraportada",
    "backCoverNumberInks": "Número de tintas contraportada",
    "backCoverPantone": "Pantone de contraportada",
    "backCoverCode": "Código pantone contraportada",
    "inside": "Interiores",
    "insideInks": "Tinta interior",
    "insideNumberInks": "Número de tintas interiores",
    "insidePantone": "Pantone interior",
    "insideCode": "Código pantone interior",
    "numberPages": "Número de páginas",
    "cover": "Portada",
    "bindings": "Acabados",
    "dimension": "Dimensión",
    "substratumFrontPage": "Sustrato portada",
    "substratumInside": "Sustrato interior",
    "substratum": "Sustrato",
    "materialReception": "Recepción material",
    "program": "Programa",
    "programVersion": "Versión programa",
    "indented": "Sangrados",
    "lineature": "Lineatura",
    "colorProfile": "Perfil de color",
    "typePoint": "Tipo de punto",
    "observations": "Observaciones",
    "image": "Imagen",
    "scheme": "Esquema",
    "impositionPlanchName": "Imposición plancha",
    "machineName": "Máquina",
    "typeService": "Sistema de impresión",
    "quantity": "Cantidad",
    "deliverDate": "Fecha de entrega",
    "userName": "Creado por",

  };

const filteredProductInfo = Object.keys(productInfo || {}).reduce((acc, key) => {
  const mappedProperty = propertyMapping[key] || key;
  if (!Array.isArray(productInfo[key]) && productInfo[key] !== null && productInfo[key] !== undefined && productInfo[key] !== '') {
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

const formatDate = (dateStr) => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};
const generatePDF = () => {
  const doc = new jsPDF();

  // Título del PDF
  doc.setFontSize(16);
  doc.text('Detalles de la Orden de Producción', 10, 10);

  // Contenido de la primera columna
  doc.setFontSize(12);
  let yPosition = 30;
console.log(filteredProductInfo)
  Object.entries(filteredProductInfo || {}).forEach(([property, value]) => {
    // Utiliza el objeto propertyMapping para traducir la propiedad
    const translatedProperty = propertyMapping[property] || property;

    // Excluye las propiedades no deseadas y los valores nulos o indefinidos
    if (
      ![
        'id',
        'quotationClientDetailId',
        'userId',
        'impositionPlanchId',
        'machineId',
        'orderDate',
        'orderStatus',
        'statedAt',
        'impositionPlanch',
        'machine',
        'quotationClientDetail',
        'user',
        'productId',
        'product',
        
      ].includes(property) &&
      value !== null &&
      value !== undefined && 
      value !== ''
    ) {
      if (typeof value === 'boolean') {
        // Formatea propiedades booleanas
        doc.text(`${translatedProperty}: ${value ? 'Sí' : 'No'}`, 20, yPosition);
      } else if (property === 'deliverDate') {
        // Formatea la fecha de entrega
        const formattedDate = formatDate(value);
        doc.text(`${translatedProperty}: ${formattedDate}`, 20, yPosition);
      } else if (property === 'Observaciones' && value) {
        doc.text('Observaciones:', 20, yPosition);
        yPosition += 10;
      
        const columnWidth = 75; // Ancho de la columna para observaciones
        const lines = doc.splitTextToSize(value, columnWidth);
      
        lines.forEach((line) => {
          doc.text(line, 20, yPosition);
          yPosition += 10;
        });
      }
      
      else {
        doc.text(`${translatedProperty}: ${value}`, 20, yPosition);
      }

      yPosition += 10;
    }
  });

  // Contenido de la segunda columna
  yPosition = 30;
  const secondColumnX = 100;

  Object.entries(detailsData || {}).forEach(([property, value]) => {
    // Utiliza el objeto propertyMapping para traducir la propiedad
    const translatedProperty = propertyMapping[property] || property;

    // Excluye las propiedades no deseadas y los valores nulos o indefinidos
    if (
      ![
        'id',
        'quotationClientDetailId',
        'userId',
        'impositionPlanchId',
        'machineId',
        'orderDate',
        'orderStatus',
        'statedAt',
        'impositionPlanch',
        'machine',
        'quotationClientDetail',
        'user',
        'productId',
        'product',
      ].includes(property) &&
      value !== null &&
      value !== undefined
    ) {
      if (typeof value === 'boolean') {
        // Formatea propiedades booleanas
        doc.text(`${translatedProperty}: ${value ? 'Sí' : 'No'}`, secondColumnX, yPosition);
      } else if (property === 'deliverDate') {
        // Formatea la fecha de entrega
        const formattedDate = formatDate(value);
        doc.text(`${translatedProperty}: ${formattedDate}`, secondColumnX, yPosition);
      } else if (property === 'image' && value) {
        // Si la propiedad es 'image' y tiene un valor, crea un enlace personalizado para "Imagen: [ver imagen]"
        const linkText = 'Imagen: ';
        doc.text(linkText, secondColumnX, yPosition);
  
        // Cambiar la fuente a negrita solo para "Ver imagen"
        doc.setFont('helvetica', 'bold'); // Establecer fuente y estilo en negrita
  
        // Agregar el enlace "Ver imagen"
        const linkX = secondColumnX + doc.getStringUnitWidth(linkText) * 4; // Alinea el enlace con el texto
        const linkY = yPosition;
        doc.textWithLink('[Ver imagen]', linkX, linkY, { url: value });
  
        // Restaurar la fuente normal
        doc.setFont('helvetica', 'normal'); // Restaurar fuente normal
      } else if (property === 'scheme' && value) {
        // Si la propiedad es 'scheme' y tiene un valor, crea un enlace personalizado para "Esquema: [ver esquema]"
        const linkText = 'Esquema: ';
        doc.text(linkText, secondColumnX, yPosition);
  
        // Cambiar la fuente a negrita solo para "Ver esquema"
        doc.setFont('helvetica', 'bold'); // Establecer fuente y estilo en negrita
  
        // Agregar el enlace "Ver esquema"
        const linkX = secondColumnX + doc.getStringUnitWidth(linkText) * 4; // Alinea el enlace con el texto
        const linkY = yPosition;
        doc.textWithLink('[Ver esquema]', linkX, linkY, { url: value });
  
        // Restaurar la fuente normal
        doc.setFont('helvetica', 'normal'); // Restaurar fuente normal
      } else if (property === 'observations') {
        // Ajustar observaciones al espacio de la columna
        const columnWidth = 90; // Ancho de la columna donde se mostrarán las observaciones
        const fontSize = 12; // Tamaño de fuente
      
        if (value) {
          doc.text('Observaciones:', secondColumnX, yPosition);
          yPosition += fontSize;
      
          // Divide las observaciones en líneas que se ajusten al ancho de la columna
          const lines = doc.splitTextToSize(value, columnWidth);
      
          // Imprime cada línea en la columna
          lines.forEach((line) => {
            doc.text(line, secondColumnX, yPosition);
            yPosition += fontSize;
          });
        }
      } else {
        doc.text(`${translatedProperty}: ${value}`, secondColumnX, yPosition);
      }
      
  
      yPosition += 10;
    }
  });

  // Guardar el PDF
  const fileName = `Orden_produccion_${detailsData.product}.pdf`;
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
    (property !== 'name' && property !== 'id' && property !== 'statedAt') && (
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