import StartingBuy from "./StartingBuy"
export default function Introduction() {
    return (
        <div className="w-full p-[150px]">
            <div className="flex flex-col gap-y-[35px] justify-center items-center max-w-3xl mx-auto text-slate-800">
                <h2 className="text-6xl font-extrabold text-center">De zéro à expert.</h2>
                <h2 className="text-5xl font-bold">Deviens trader professionnel.</h2>
                <div className="flex flex-row text-lg">
                    <span>L'intégralité de ta formation et des outils <span className="font-bold">disponible en un seul endroit.</span></span>

                </div>
                <span>Maîtrisez le trading de cryptomonnaies en 91 heures. De zéro à expert, tout ce dont vous avez besoin pour réussir est ici. Lancez-vous maintenant.</span>
                <StartingBuy />
            </div>
        </div>
    )
}