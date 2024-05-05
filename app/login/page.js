'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation'
import LoginForm from "../components/login/LoginForm";
import userService from "../service/user";

export default function Page() {

    const router = useRouter()
    const [credentials, setCredentials] = useState();
    const [errorLogin, setErrorLogin] = useState(null);

    const handleLogin = async (credentials) => {
        setCredentials(credentials);
        try {
            const login = await userService.login(credentials);
            console.log('login : ', login.body.data.success);
            if (login.body.data.success) {
                window.location.reload();
            } else {
                setErrorLogin(login.body.message);
            }
        } catch (error) {
            setErrorLogin("An error occurred during login.");
            console.error('Login error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-screen bg-slate-200">
            <LoginForm handleLogin={handleLogin} errorLogin={errorLogin}/>
        </div>
    )
}
