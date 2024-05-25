import React, { useState } from 'react';
import { AddressElement, useStripe, useElements } from '@stripe/react-stripe-js';

const AddressForm = ({ onSubmit }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [address, setAddress] = useState(null);
    const [isComplete, setIsComplete] = useState(false);

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setError('Stripe n\'est pas chargé');
            return;
        }

        if (!isComplete) {
            setError('Veuillez entrer une adresse valide.');
            return;
        }

        setError(''); // Réinitialisez l'erreur avant de soumettre
        try {
            await onSubmit(address); // Assurez-vous que onSubmit est une fonction asynchrone
        } catch (error) {
            setError('Erreur lors de la soumission de l\'adresse.');
        }
    };

    return (
        <div className='flex flex-col w-[440px] bg-slate-50 p-5 gap-y-2 shadow-xl rounded-xl'>
            <span className='text-[#8b7bf3] font-black text-3xl'>Dernière étape!</span>
            <span className='text-[#8b7bf3] font-medium text-md'>Accédez à Bitlearn en validant votre compte.</span>
            <form onSubmit={handleSubmitForm} className=''>
                <AddressElement 
                    options={{ mode: 'billing' }} 
                    onChange={(event) => {
                        setAddress(event.value.address);
                        setIsComplete(event.complete);
                        if (event.complete) {
                            setError('');
                        } else {
                            setError('Veuillez entrer une adresse valide.');
                        }
                    }}
                />
                {error && <p className="text-red-500">{error}</p>} {/* Affichez l'erreur si elle existe */}
                <button
                    type="submit"
                    disabled={!stripe || !elements || !isComplete}
                    className="mt-6 p-3 bg-[#8b7bf3] hover:bg-[#705DF2] h-[58px] w-full rounded-xl font-bold text-lg text-white hover:text-slate-100 transition duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Soumettre
                </button>
            </form>
        </div>
    );
};

export default AddressForm;
