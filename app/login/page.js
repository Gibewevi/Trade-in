// page.js
'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation'
import LoginForm from "../components/login/LoginForm";
import AddressForm from "../components/login/AdressForm";
import userService from "../service/user";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Page() {
    const router = useRouter();
    const [form, setForm] = useState('login');
    const [credentials, setCredentials] = useState();
    const [errorLogin, setErrorLogin] = useState(null);

    const handleLogin = async (credentials) => {
        setCredentials(credentials);
        try {
            const login = await userService.login(credentials);
            console.log('login : ', login);
            console.log('login success : ', login.data.success);
            if (login.data.success) {
                if (login.data.isAccountVerified) {
                    window.location.href = '/';
                } else {
                    setForm('accountVerified');
                }
            } else {
                setErrorLogin(login.body.message);
            }
        } catch (error) {
            setErrorLogin("An error occurred during login.");
            console.error('Login error:', error);
        }
    };

    const handleAddressSubmit = async (addressData) => {
        try {
            console.log('addressData api : ', addressData);

            // Ajoutez l'email des informations d'identification à l'objet addressData
            if (credentials && credentials.email) {
                addressData.email = credentials.email;
            }

            const response = await fetch('/api/account/billing-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addressData),
            });

            if (!response.ok) {
                throw new Error('Failed to save address');
            }

            const user = await response.json();
            if (user.accountVerified) {
                window.location.href = '/';
            } else {
                console.log('User account is not verified:', result);
            };
        } catch (error) {
            console.error('Error saving address:', error);
        }
    };

    return (
        <Elements stripe={stripePromise}>
            <div className="flex items-center justify-center w-full h-screen bg-slate-200">
                {form === 'login' ? (
                    <LoginForm handleLogin={handleLogin} errorLogin={errorLogin} />
                ) : (
                    <AddressForm onSubmit={handleAddressSubmit} />
                )}
            </div>
        </Elements>
    )
}
