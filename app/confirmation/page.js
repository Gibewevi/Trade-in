import HeaderConfirmation from "../components/confirmation/HeaderConfirmation";
export default function Page() {
    return (
        <div className="flex items-center justify-center w-full h-screen bg-red-400">
            <div className="w-[500px] bg-slate-100 rounded-2xl overflow-hidden">
                <HeaderConfirmation />
                <div className="flex flex-col  gap-y-3 p-5 text-slate-800 relative">
                    <span>Tu as désormais accès à la formation complète.</span>
                    <span><span className="font-bold">Récupère ton mot de passe</span> sur ta boite mail et connecte toi avec login pour profiter de BitLearn.</span>
                    <span>Récupere ton accès au <span className="font-bold">discord privé</span> en cliquant ci-dessous.</span>
                    <div className="w-full h-[40px] relative">
                    <button className="absolute bottom-0 right-0 flex flex-row gap-x-1 justify-center items-center font-bold bg-[#705DF2] text-slate-100 p-2 rounded-lg">
                        <img src='/images/CarbonLogoDiscord.svg' className="w-[30px]"/>
                         <span>Discord</span>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
