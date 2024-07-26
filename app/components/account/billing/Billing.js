import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import BillingForm from './BillingForm';

export default function Billing({billingData}) {
    console.log("billingdata form : ",billingData);
    return (
        <div>
            <BillingForm billingData={billingData}/>
        </div>
    );
}
