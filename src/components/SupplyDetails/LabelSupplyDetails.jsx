import { format } from 'fecha';
import QRCode from 'react-qr-code'
const LabelSupplyDetails = ({ detail }) => {
  const currentDate = new Date(Date.now());
  const formattedDate = format(currentDate, 'dddd D [de] MMMM [de] YYYY', 'es');
  const pdfUrl = `https://localhost:7262/api/BuySuppliesDetail/file/${detail.id}`
  function openPDF(pdfUrl) {
    window.open(pdfUrl, '_blank');

  }
console.log(detail)
  return (
    <>
      <div className="my-6">
        <div className="text-center">
          <h1 className="font-black text-3xl">Informe compra de insumos</h1>
          <p className="text-xl">Creado el día: {formattedDate}</p>
        </div>
      </div>
      <div className="container mx-auto w-1/3 rounded-lg border-4 border-orange-500 p-4">
        <div className="flex flex-col items-center">
          <QRCode value={pdfUrl} className="w-48 h-48 object-cover" />
          <button onClick={() => openPDF(pdfUrl)}></button>
          <div className="sticky top-0">
            <h1 className="text-sm font-bold">NOMBRE DEL INSUMO</h1>
            <h2>{detail.supply.name}</h2>
            <div className="flex flex-wrap justify-center">

              {detail.supply.supplyXSupplyPictogram.map((pictogram, index) => {
                return(
                  <img key={index}
                  src={pictogram.supplyPictogram.pictogramFile}
                  className='"w-20 h-20 object-contain rounded-md'
                />
                )
              })}
            </div>
            <h3 className="text-sm font-bold">Fecha de Vencimiento</h3>
            <div className="flex items-center">
              <h2 className="text-base">{detail.expirationDate}</h2>
            </div>
            <h2 className="text-sm font-bold">Palabra de Advertencia</h2>
            <div className="flex items-center">
              <h2 className="text-base">{detail.supply.sortingWord === 1 ? 'PELIGRO' : 'ADVERTENCIA'}</h2>
            </div>
            <h2 className="text-sm font-bold">CONSEJO DE PRUDENCIA</h2>
            <div className="flex items-center">
              <p>{detail.supply.advices}</p>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            {/* Add code to display images */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LabelSupplyDetails;
