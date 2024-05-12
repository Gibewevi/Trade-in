import { NextResponse } from 'next/server';
import authService from './app/service/auth';

export async function middleware(request) {
    // Assurer que isUserAuthenticated est async et utiliser await ici
    const isAuth = await authService.isUserAuthenticated(request);

    if (!isAuth) {
        return NextResponse.redirect(new URL('/login', request.url));
    } else {
        // Définir un cookie pour indiquer l'état d'authentification
        const response = NextResponse.next();
    }
}

export const config = {
    matcher: ['/actuality'],
};
