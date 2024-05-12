export default function Page() {
    return (
        <div className="w-full h-screen bg-slate-200">
            <div className="flex justify-center items-center gap-x-1 w-full h-[150px] bg-slate-800 ">
                <img src='/images/CarbonLogoDiscord.svg' className="w-[35px]" />
                <span className="text-slate-200 font-bold text-3xl">Discord</span>
            </div>

            <div className="flex flex-col gap-y-[50px] mt-10 max-w-3xl mx-auto sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">

                <div className="h-[400px] max-w-[350px] mx-auto border border-r border-slate-800 w-full relative">
                    <div className='bg-red-400 flex flex-col items-center gap-y-6 w-full md:w-[90%] md:absolute md:top-0 md:left-0'>
                        <div>
                            <img src='/images/CarbonEarthEuropeAfricaFilled.svg' className="w-[60px]" />
                        </div>

                        <div className="flex flex-row gap-x-1">
                            <span className="text-2xl text-slate-800 font-extrabold">Serveur</span>
                            <span className="text-2xl text-slate-800 font-semibold">Public</span>
                        </div>

                        <span className="text-md text-slate-800 font-medium">Bitlearn server gratuit</span>

                        <div className="h-[150px] flex flex-col gap-y-1 justify-center bg-slate-600 shadow-xl p-5 rounded-xl w-full text-sm text-slate-200 font-medium">
                            <div className="flex flex-row gap-x-1 ">
                                <img src='/images/CarbonCheckmarkGreen.svg' className="w-[20px]" />
                                <span >Ouvert à tous</span>
                            </div>
                            <div className="flex flex-row gap-x-1">
                                <img src='/images/SystemUiconsCross.svg' className="w-[20px]" />
                                <span >Aucun support garanti</span>
                            </div>
                            <div className="flex flex-row gap-x-1">
                                <img src='/images/SystemUiconsCross.svg' className="w-[20px]" />
                                <span >Non dédié spécifiquement à Bitlearn</span>
                            </div>
                            <div className="flex flex-row gap-x-1">
                                <img src='/images/SystemUiconsCross.svg' className="w-[20px]" />
                                <span >Aucune mises à jours</span>
                            </div>
                        </div>
                        <button className="w-[60%] h-[40px] bg-slate-400 p-4 rounded-xl flex gap-x-2 justify-center items-center overflow-hidden relative">
                            <img src='/images/CarbonLogoDiscord.svg' className="w-[30px]" />
                            <span className="z-10 text-slate-100 text-md font-bold">Discord</span>
                        </button>
                    </div>

                </div>

                <div className="w-full relative">
                    <div className='mx-auto max-w-[350px] flex flex-col items-center gap-y-6 w-[90%] md:w-[90%] md:absolute md:right-0 md:top-0'>
                        <div>
                            <img src='/images/CarbonLocked.svg' className="w-[60px]" />
                        </div>

                        <div className="flex flex-row gap-x-1">
                            <span className="text-2xl text-slate-800 font-extrabold">Serveur</span>
                            <span className="text-2xl text-slate-800 font-semibold">Privé</span>
                        </div>

                        <span className="text-md text-slate-800 font-medium">Serveur privé Bitlearn</span>

                        <div className="h-[150px] flex flex-col gap-y-1 justify-center bg-slate-600 shadow-xl p-5 rounded-xl w-full text-sm text-slate-200 font-medium">
                            <div className="flex flex-row gap-x-1 ">
                                <img src='/images/CarbonCheckmarkGreen.svg' className="w-[20px]" />
                                <span>Communauté dynamique</span>
                            </div>
                            <div className="flex flex-row gap-x-1">
                                <img src='/images/CarbonCheckmarkGreen.svg' className="w-[20px]" />
                                <span>Support direct de Pixelcoin</span>
                            </div>
                            <div className="flex flex-row gap-x-1">
                                <img src='/images/CarbonCheckmarkGreen.svg' className="w-[20px]" />
                                <span>Canaux d'aide dédiés pour chaque leçon</span>
                            </div>
                            <div className="flex flex-row gap-x-1">
                                <img src='/images/CarbonCheckmarkGreen.svg' className="w-[20px]" />
                                <span>Accès en avant-première aux nouvelles et mises à jour</span>
                            </div>
                        </div>
                        <button className="w-[60%] h-[40px] bg-[#705DF2] p-4 rounded-xl flex gap-x-2 justify-center items-center overflow-hidden relative">
                            <img src='/images/CarbonLogoDiscord.svg' className="w-[30px]" />
                            <span className="z-10 text-slate-100 text-md font-bold">Discord Bitlearn</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
