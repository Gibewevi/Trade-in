import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';  

const isUserAuthenticated = async () => {
    const cookieStore = cookies();
    const jwtCookie = cookieStore.get('jwt');  
    const jwtToken = jwtCookie ? jwtCookie.value : '';  

    if (jwtToken) {
        try {
            // Verifying the JWT using jose
            const { payload } = await jwtVerify(jwtToken, new TextEncoder().encode(process.env.JWT_SECRET));
            return true;  
        } catch (error) {
            console.error('Invalid JWT:', error);
            return false;  
        }
    }
    return false;  
}

const authService = {
    isUserAuthenticated
}

export default authService;
