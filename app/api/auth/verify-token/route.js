// pages/api/auth/verify-token.js
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';  
import { NextResponse } from 'next/server';

export async function POST(req) {
    // Extraire le JWT du cookie
    const cookieStore = cookies(req);
    const jwtCookie = cookieStore.get('jwt');  
    const jwtToken = jwtCookie? jwtCookie.value : '';  

    if (!jwtToken) {
        // Pas de token trouvé, retourner une erreur
        return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    try {
        // Vérifier le JWT
        const { payload } = await jwtVerify(jwtToken, new TextEncoder().encode(process.env.JWT_SECRET));
        // Si la vérification est réussie, retourner une réponse positive
        return NextResponse.json({ success: true, data: payload }, { status: 200 });
    } catch (error) {
        // Gérer les erreurs de vérification
        console.error('Invalid JWT:', error);
        return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }
}
