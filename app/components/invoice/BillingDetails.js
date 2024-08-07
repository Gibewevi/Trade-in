// Composant pour l'affichage des informations de facturation
export default function BillingDetails({ billing }) {
    // Fonction pour mettre en majuscule la première lettre de chaque mot
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }

    return (
        <div className='flex flex-col gap-y-1'>
            <h2 className='text-lg font-bold'>FACTURÉ À</h2>
            <div className='flex flex-col text-md'>
                <strong className=''>{toTitleCase(billing.fullName)}</strong>
                <span className=''>{billing.billingAddressLine1}</span>
                {billing.billingAddressLine2 && <span className=''>{billing.billingAddressLine2}</span>}
                <span className=''>{billing.billingCity}</span>
                <span className=''>{billing.billingPostalCode}</span>
                <span className=''>{billing.billingState} ({billing.billingCountry})</span>
                <div className='flex justify-end mt-3'>
                   <textarea
                        className='w-full h-[30px] border rounded overflow-hidden resize-none text-right pr-5 focus:border-purple-500 focus:border-2 focus:outline-none text-xxs'
                        placeholder="Vous pouvez ajouter plus d'informations dans cette zone éditable..."
                    ></textarea> 
                </div>
            </div>
        </div>
    );
}