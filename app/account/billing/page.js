import Sidebar from "@/app/components/account/Sidebar";
import Billing from "@/app/components/account/billing/Billing";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

export default async function Page() {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('loginJWT');

    if (!tokenCookie) {
        return <div>No session token found</div>;
    }

    const token = tokenCookie.value;
    let userData;
    try {
        userData = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.error('Invalid token', error);
        return <div>Invalid token</div>;
    }

    // Récupération des données de facturation avec l'ID utilisateur directement depuis le cookie
    const billingData = await prisma.billing.findUnique({
        where: {
            userId: userData.id,
        },
        include: {
            user: true,
        },
    });
    billingData.email = userData.email;
    console.log('Billing data: ', billingData);

    return (
        <div className="w-full h-screen bg-slate-200 p-2">
            <div className="flex justify-center items-center w-full h-[150px] bg-slate-800 rounded-xl">
                <span className="text-slate-200 font-bold text-3xl">Account</span>
            </div>

            <div className="flex flex-row justify-center max-w-6xl mx-auto mt-10">
                <div className="">
                    <Sidebar />
                </div>
                <div className="w-[450px]">
                    <Billing billingData={billingData} />
                </div>

            

            </div>

        </div>
    );
}
