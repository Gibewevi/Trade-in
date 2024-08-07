// app/reset-password/[token]/page.js
import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function ResetPassword({ params }) {
    const { token } = params;

    if (!token) {
        notFound(); // Redirige vers une page 404 si le token n'est pas fourni
    }

    // Vérifier si le token existe dans la base de données et s'il n'est pas expiré
    const resetToken = await prisma.passwordResetToken.findUnique({
        where: {
            uuid: token,
        },
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
        notFound(); // Redirige vers une page 404 si le token n'est pas valide ou expiré
    }

    // Formater la date pour l'affichage
    const formattedExpiryDate = resetToken.expiresAt.toLocaleString();

    return (
        <div className="flex items-center justify-center w-full h-screen bg-slate-200 text-slate-800">
            <div className="w-[400px] max-w-[400px] shadow-xl bg-slate-100 rounded-xl p-9">
                <h1 className="text-xl font-bold mb-4">Réinitialiser le mot de passe</h1>
                <h1 className="text-xl font-bold mb-4">Expiration: {formattedExpiryDate}</h1>
                <form className="flex flex-col">
                    <input
                        type="password"
                        placeholder="Nouveau mot de passe"
                        className="mb-4 p-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        className="mb-4 p-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="flex justify-center items-center p-3 w-full bg-[#8b7bf3] hover:bg-[#705DF2] h-[50px] rounded-xl font-bold text-lg text-white hover:text-slate-100 transition duration-300 ease-in-out text-center"
                    >
                        Réinitialiser
                    </button>
                </form>
            </div>
        </div>
    );
}
