export default function HeaderConfirmation() {
    return (
        <div className="flex justify-center items-center w-full h-[100px] bg-[#705DF2]">
            <div className="flex flex-row gap-x-2">
                <span className="text-2xl text-slate-200 font-bold">Merci pour ton achat !</span>
                <img src='/images/CarbonFaceWinkFilled.svg' className="w-[30px]"/>
            </div>
        </div>
    );
}
