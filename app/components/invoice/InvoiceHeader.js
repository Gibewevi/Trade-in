// Composant pour l'affichage des informations de la facture
export default function InvoiceHeader({ invoice }) {
  // Fonction pour formater la date
  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}${month}${day}`;
  }
  // Fonction pour formater la date en YYYY/MM/DD
  function formatDateExchangeRate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}/${month}/${day}`;
  }

  return (
    <div className='flex flex-col text-md'>
      <div className="flex flex-row">
        <span className="min-w-[130px]">Numéro : </span>
        <strong>#{invoice.id}- {formatDate(invoice.date)}</strong>
      </div>
      <div className="flex flex-row">
        <span className="min-w-[130px]">Date d'édition : </span>
        <strong>{formatDateExchangeRate(invoice.date)}</strong>
      </div>
    </div>
  );
}