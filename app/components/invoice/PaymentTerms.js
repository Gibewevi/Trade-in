// Composant pour les délais de paiement
export default function PaymentTerms() {
  return (
    <div className='flex flex-col gap-y-2'>
      <h2 className='text-lg font-bold'>DÉLAI DE PAIEMENT</h2>
      <p className='text-sm'>À payer dans les 30 jours suivant la réception de la facture.</p>
      <div className='flex flex-col text-xs'>
        <p>Des frais de retard de 1,5% par mois (19,56% par année) seront appliqués aux paiements en retard.</p>
        <p>Conformément aux lois du Québec, des frais de recouvrement de 40 CAD peuvent être appliqués en cas de non-paiement.</p>
      </div>
    </div>
  );
}