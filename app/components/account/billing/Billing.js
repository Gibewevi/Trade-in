'use client';

import BillingForm from './BillingForm';
import billingService from '@/app/service/billingService';

export default function Billing({ billingData }) {

    const handleModifyBillingForm = async (newBillingData) => {
        const response = await billingService.setBillingByUserId(newBillingData);
    };

    return (
        <div>
            <BillingForm billingData={billingData} handleModifyBillingForm={handleModifyBillingForm} />
        </div>
    );
}
