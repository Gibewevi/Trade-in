// Composant pour l'affichage des montants
export function AmountDetails({ label, amountUSD, amountLocal, currency, hasBorder = true, hiddenPrice }) {
  return (
    <div className={`w-full flex flex-row items-center justify-between ${hasBorder ? 'border-b border-gray-300 pb-1' : 'pb-2'}`}>
      <span className='text-sm'><strong>{label}</strong></span>
      <div className='flex flex-col text-right'>
        {!hiddenPrice &&
          <>
            <span className='text-md'>{amountUSD.toFixed(2)} USD</span>
            <span className='text-xs'>- {amountLocal.toFixed(2)} {currency}</span>
          </>
          }
      </div>
    </div>
  );
}