// Composant pour l'affichage des informations de facturation
export default function BillingDetails({ billing }) {
    // Fonction pour mettre en majuscule la première lettre de chaque mot
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
    console.log('billing front end : ', billing);
    return (
        <div className='flex flex-col gap-y-1'>
            <h2 className='text-lg font-bold'>FACTURÉ À</h2>
            <div className='flex flex-col'>
                <strong className='text-xs'>{toTitleCase(billing.fullName)}</strong>
                <span className='text-xs'>{billing.billingAddressLine1}</span>
                {billing.billingAddressLine2 && <span className='text-xs'>{billing.billingAddressLine2}</span>}
                <span className='text-xs'>{billing.billingCity}</span>
                <span className='text-xs'>{billing.billingPostalCode}</span>
                <span className='text-xs'>{billing.billingState} ({billing.billingCountry})</span>
                <div className='flex justify-end'>
                    <textarea
                        className='w-full h-[30px] border rounded overflow-hidden resize-none p-2 text-right pr-5 focus:border-purple-500 focus:border-2 focus:outline-none text-xxs'
                        placeholder="Vous pouvez ajouter plus d'informations dans cette zone éditable..."
                    ></textarea>
                </div>
            </div>
        </div>
    );
}