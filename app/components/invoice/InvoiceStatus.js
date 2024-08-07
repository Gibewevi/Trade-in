// Composant pour le statut de la facture
export default function InvoiceStatus() {
  return (
    <div className='flex flex-col'>
      <h2 className='text-lg font-bold'>STATUS</h2>
      <div className='flex flex-row items-center gap-x-1 mt-1'>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#87eb73" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m-2 19.59l-5-5L10.59 15L14 18.41L21.41 11l1.596 1.586Z" /><path fill="none" d="m14 21.591l-5-5L10.591 15L14 18.409L21.41 11l1.595 1.585z" /></svg>
        <span className='text-[#87eb73] text-sm'>Total entièrement payé via Stripe</span>
      </div>
    </div>
  );
}