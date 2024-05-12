export default function PricingOption() {
    return (
        <div className="w-full rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
            <div className="flex flex-row gap-y-5 bg-slate-100 w-full h-full rounded-lg p-4">
                <div className="flex flex-col items-center justify-center w-[90px]">
                    {/* <span className="text-slate-700 font-bold text-lg">Fondateur</span> */}
                    <span className="text-purple-600 font-bold text-xl">$94.99</span>
                </div>
                <div className="flex flex-col w-full justify-center items-center text-slate-800">
                    <div className="flex flex-row gap-x-3">
                        <img src='/images/CarbonCheckmarkFilled.svg' className="w-[20px]" alt="Checked" />
                        <span>formation compléte</span>
                    </div>
                    <div className="flex flex-row gap-x-3">
                        <img src='/images/CarbonCheckmarkFilled.svg' className="w-[20px]" alt="Checked" />
                        <span>accès discord privé</span>
                    </div>
                </div>
            </div>
            <span className="text-slate-100 text-sm">payment en une seule fois (à vie)</span>
        </div>
    );
}
