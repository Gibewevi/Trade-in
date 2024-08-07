// page.js
'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation'
import LoginForm from "../components/login/LoginForm";
import AddressForm from "../components/login/AdressForm";
import ForgotPassword from "../components/login/ForgotPassword";

import userService from "../service/user";
import passwordService from "../service/password";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Page() {
    const router = useRouter();
    const [form, setForm] = useState('login');
    const [credentials, setCredentials] = useState();
    const [errorLogin, setErrorLogin] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (credentials) => {
        setCredentials(credentials);
        try {
            const login = await userService.login(credentials);

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

    const handleForgotPassword = async (email) => {
        setIsLoading(true); // Activer le spinner
        try {
            console.log('Email for password reset:', email);
            const response = await passwordService.requestPasswordReset(email);
            if (response.message === "Email de réinitialisation envoyé avec succès.") {
                alert("Un email de réinitialisation a été envoyé à votre adresse.");
            } else {
                alert("Une erreur est survenue lors de la demande de réinitialisation de mot de passe.");
            }
        } catch (error) {
            console.error('Erreur lors de la demande de réinitialisation de mot de passe:', error);
            alert("Une erreur est survenue lors de la demande de réinitialisation de mot de passe.");
        } finally {
            setIsLoading(false); 
        }
    };


    return (
        <Elements stripe={stripePromise}>
            <div className="flex items-center justify-center w-full h-screen bg-slate-200">
                <div className="w-[400px] max-w-[400px] shadow-xl bg-slate-100 rounded-xl p-9">
                    {form === 'login' ? (
                        <LoginForm handleLogin={handleLogin} errorLogin={errorLogin} setForm={setForm} />
                    ) : form === 'accountVerified' ? (
                        <AddressForm onSubmit={handleAddressSubmit} />
                    ) : form === 'forgotPassword' ? (
                        <ForgotPassword setForm={setForm} handleForgotPassword={handleForgotPassword} isLoading={isLoading}/>
                    ) : null}
                </div>



            </div>
        </Elements>
    )
}
