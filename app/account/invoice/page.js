
'use client'
import Sidebar from "@/app/components/account/Sidebar";
import Invoice from "@/app/components/account/invoice/Invoice";

export default function Page() {


    return (
        <div className="w-full h-screen bg-slate-200 p-2">
            <div className="flex justify-center items-center w-full h-[150px] bg-slate-800 rounded-xl">
                <span className="text-slate-200 font-bold text-3xl">Account</span>
            </div>

            <div className="flex flex-row justify-center max-w-6xl mx-auto mt-10">
                <div className="">
                    <Sidebar />
                </div>
                <div className="w-[540px]">
                    <Invoice />
                </div>

            </div>

        </div>
    );
}
