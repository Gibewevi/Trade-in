
'use client'
import Sidebar from "@/app/components/account/Sidebar";
import SecurityForm from "@/app/components/account/security/SecurityForm";
import passwordService from "@/app/service/password";

export default function Page() {

    async function handleUpdatePassword(oldPassword, password) {
        console.log("Updating password... : ", oldPassword, password);
        const passwordUpdated = await passwordService.setPassword(oldPassword, password);
    };

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
                    <SecurityForm handleUpdatePassword={handleUpdatePassword} />
                </div>

            </div>

        </div>
    );
}
