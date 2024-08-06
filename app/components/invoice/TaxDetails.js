// Composant pour l'affichage des détails des taxes
export default function TaxDetails({ label, amountUSD, amountLocal, totalAfterTaxUSD, totalAfterTaxLocal, currency }) {
    // Fonction pour formater la date
    function formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (`0${d.getMonth() + 1}`).slice(-2);
        const day = (`0${d.getDate()}`).slice(-2);
        return `${year}${month}${day}`;
    }
    return (
        <div className='w-full flex flex-row items-center justify-between border-b border-gray-300 pb-1'>
            <span className='text-xs'>{label}</span>
            <div className='flex flex-row gap-x-3'>
                <div className='flex flex-col text-right'>
                    <span className='text-md'>- {amountUSD.toFixed(2)} USD</span>
                    <span className='text-xs'>- {amountLocal.toFixed(2)} {currency}</span>
                </div>
                <div className='flex flex-col items-center'>
                    <span className='text-md'>{totalAfterTaxUSD.toFixed(2)} USD</span>
                    <span className='text-xs'>{totalAfterTaxLocal.toFixed(2)} {currency}</span>
                </div>
            </div>
        </div>
    );
}