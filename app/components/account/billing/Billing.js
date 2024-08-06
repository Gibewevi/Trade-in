'use client';

import BillingForm from './BillingForm';
import billingService from '@/app/service/billingService';
import { useState } from 'react';

export default function Billing({ billingData }) {
    const [billing, setBilling] = useState(billingData);
    const [billingMessage,setBillingMessage] = useState(null);

    const normalizeBillingData = (data) => {
        return {
            ...data,
            billingAddressLine2: data.billingAddressLine2 || ''
        };
    };

    const isBillingDataEqual = (data1, data2) => {
        const keys = [
            'email',
            'fullName',
            'billingAddressLine1',
            'billingAddressLine2',
            'billingCity',
            'billingState',
            'billingPostalCode',
            'billingCountry'
        ];

        return keys.every(key => data1[key] === data2[key]);
    };

    const handleModifyBillingForm = async (newBillingData) => {
        const normalizedBillingData = normalizeBillingData(billing);
        const normalizedNewBillingData = normalizeBillingData(newBillingData);

        if (isBillingDataEqual(normalizedBillingData, normalizedNewBillingData)) {
            setBillingMessage('No changes made to the billing information.');
            return;
        }
        const response = await billingService.setBillingByUserId(newBillingData);
        setBilling(newBillingData);
        setBillingMessage('Billing information updated successfully.');
    };

    return (
        <div>
            <BillingForm billingData={billing} handleModifyBillingForm={handleModifyBillingForm} billingMessage={billingMessage} />
        </div>
    );
}
