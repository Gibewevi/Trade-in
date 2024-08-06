import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import BillingDetails from '@/app/components/invoice/BillingDetails';
import CompanyDetails from '@/app/components/invoice/CompanyDetails';
import PaymentTerms from '@/app/components/invoice/PaymentTerms';
import InvoiceStatus from '@/app/components/invoice/InvoiceStatus';
import InvoiceHeader from '@/app/components/invoice/InvoiceHeader';
import TaxDetails from '@/app/components/invoice/TaxDetails';
import { AmountDetails } from '@/app/components/invoice/AmountDetails';

const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

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


export default async function Page() {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get('loginJWT');

  if (!tokenCookie) {
    return <div>No session token found</div>;
  }

  const token = tokenCookie.value;
  let userData;
  try {
    userData = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Invalid token', error);
    return <div>Invalid token</div>;
  }

  // Récupération des données de facturation avec l'ID utilisateur directement depuis le cookie
  const billing = await prisma.billing.findUnique({
    where: {
      userId: userData.id,
    },
    include: {
      user: true,
    },
  });

  // Récupération de la facture par userId et courseId = 1
  const invoice = await prisma.invoice.findFirst({
    where: {
      userId: userData.id,
      courseId: 1,
    },
    include: {
      user: true,
    },
  });

  if (!invoice) {
    return <div>No invoice found.</div>;
  }

  // Montant total (TTC) et taux de taxes
  const totalAmount = parseFloat(invoice.totalAmount); // 150
  const tpsRate = invoice.tps; // 5%
  const tvqRate = invoice.tvp; // 8%
  const totalTaxRate = tpsRate + tvqRate; // 13%

  // Calcul du montant HT à partir du montant TTC
  const amountHt = parseFloat((totalAmount / (1 + totalTaxRate / 100)).toFixed(2));

  // Calcul des montants de la TPS et de la TVQ en partant du montant TTC
  const tpsAmountUSD = parseFloat((totalAmount * (tpsRate / (100 + totalTaxRate))).toFixed(2));
  const tvqAmountUSD = parseFloat((totalAmount * (tvqRate / (100 + totalTaxRate))).toFixed(2));
  const totalCalculatedAmountUSD = parseFloat((amountHt + tpsAmountUSD + tvqAmountUSD).toFixed(2));

  // Conversion des montants en devise locale
  const exchangeRate = parseFloat(invoice.exchangeRate);
  const tpsAmountLocal = parseFloat((tpsAmountUSD * exchangeRate).toFixed(2));
  const tvqAmountLocal = parseFloat((tvqAmountUSD * exchangeRate).toFixed(2));
  const totalAmountLocal = parseFloat((totalCalculatedAmountUSD * exchangeRate).toFixed(2));

  return (
    <div className='flex flex-col gap-y-4 w-full text-slate-500 p-[30px] mt-[-80px]'>
      <h1 className='font-bold text-2xl'>FACTURE</h1>
      <div className='flex flex-col gap-y-3'>
        <InvoiceHeader invoice={invoice} />
        <BillingDetails billing={billing} />
        <CompanyDetails />

        <div className='flex flex-col mt-3'>
          <h2 className='text-lg font-bold'>DÉTAILS</h2>
          <div className='flex flex-col gap-y-1'>
            <div className='flex flex-col text-right'>
              <span className='text-xs'>Taux de change calculé le {formatDateExchangeRate(invoice.date)}</span>
              <span className='text-xs'>USD vers {invoice.currency} = {invoice.exchangeRate}</span>
            </div>

            <AmountDetails
              label="BITLEARN INVESTMENT"
              amountUSD={amountHt}
              amountLocal={amountHt * invoice.exchangeRate}
              currency={invoice.currency}
              hiddenPrice= {true}
            />

            {invoice.taxRate > 0 &&
              <>
                <TaxDetails
                  label={`TPS (${invoice.tps}%)`}
                  amountUSD={tpsAmountUSD}
                  amountLocal={tpsAmountLocal}
                  totalAfterTaxUSD={amountHt + tpsAmountUSD}
                  totalAfterTaxLocal={(amountHt + tpsAmountUSD) * exchangeRate}
                  currency={invoice.currency}
                />
                <TaxDetails
                  label={`TVQ (${invoice.tvp}%)`}
                  amountUSD={tvqAmountUSD}
                  amountLocal={tvqAmountLocal}
                  totalAfterTaxUSD={amountHt + tpsAmountUSD + tvqAmountUSD}
                  totalAfterTaxLocal={totalAmountLocal}
                  currency={invoice.currency}
                />
              </>
            }
            <AmountDetails
              label="Total"
              amountUSD={totalCalculatedAmountUSD}
              amountLocal={totalAmountLocal}
              currency={invoice.currency}
              hasBorder={false}
            />
          </div>
        </div>

        <PaymentTerms />
        <InvoiceStatus />

      </div>
    </div>
  );
}
