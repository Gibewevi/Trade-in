// Composant pour les informations de l'entreprise
export default function CompanyDetails() {
  return (
    <div className='flex flex-col gap-y-1'>
      <h2 className='text-lg font-bold'>FACTURÉ PAR</h2>
      <div className='flex flex-col text-md'>
        <strong className=''>BITLEARN</strong>
        <span >5 rue Hallée</span>
        <span >SHERBROOKE</span>
        <span >J1H 5M5</span>
        <span >Canada (CA)</span>
        <span >Numéro d'entreprise du Québec (NEQ) : 900 653 817 00016</span>
        <span >Numéro d'identification à la TPS : 123456789 RT0001</span>
        <span >Numéro d'identification à la TVQ : 1234567891 TQ0001</span>
      </div>
    </div>
  );
}