import Link from "next/link";
import authService from "@/app/service/auth";
import { headers } from 'next/headers';

export default async function Header() {
    const isConnected = await authService.isUserAuthenticated();


    return (
        <div className="fixed w-full h-[80px] z-50">
            <div className="flex flex-row h-full bg-slate-100 items-center p-6">
                <div className="flex flex-1 gap-x-[70px]">
                    <Link href="/" aria-label="Homepage">
                        <h1 className="font-black text-3xl text-slate-900">BitLearn</h1>
                    </Link>
                    <nav className="flex flex-row items-center gap-x-[70px] ">
                        <Link href="/lessons/definition-des-cryptomonnaies"><span className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-4">Lessons</span></Link>
                        {isConnected && <Link href="/account/billing">
                            <span className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-4">Account</span>
                        </Link>}
                        <Link href="/actuality"><span className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-4">Actuality</span></Link>
                        {/* <Link href="/challenges"><span className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-4">Challenges</span></Link> */}
                        {/* <Link href="/airdrops"><span className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-4">Airdrops</span></Link> */}
                        <Link href="/backtesting"><span className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-4">Backtesting</span></Link>
                        <Link href="/trading-board"><span className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-4">Trading board</span></Link>
                        <Link href="/trading-board"><span className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-4">Challenges</span></Link>
                        {/* <Link href="/insights"><span className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-4">Insights</span></Link> */}
                        {/* <Link href="/watchlists"><span className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-4">watchlists</span></Link> */}
                    </nav>
                </div>
                <div className="flex flex-row justify-center items-center gap-x-5">
                    <div className="flex flex-row w-[100px]">
                        {isConnected ? <div className="flex flex-row"><img src='/images/CarbonLogout.svg' className="w-[25px]" />
                            <Link href="/account">
                                <span className="text-md text-slate-900 font-semibold ml-2 hover:text-slate-900 hover:underline hover:underline-offset-4">Logout</span>
                            </Link></div> :
                            <div className="flex flex-row">
                                <img src='/images/CarbonUser.svg' className="w-[25px]" />
                                <Link href="/login">
                                    <span className="text-md text-slate-900 font-semibold ml-2">Login</span>
                                </Link>
                            </div>}
                    </div>
                    {isConnected ? <Link href="/discord">
                        <button className="group h-[40px] bg-[#705DF2] p-4 rounded-xl flex gap-x-2 justify-center items-center overflow-hidden relative">
                            <img src='/images/CarbonLogoDiscord.svg' className="w-[30px]" />
                            <span className="z-10 text-slate-100 text-md font-bold">Discord</span>
                        </button>
                    </Link> : <Link href="/subscription">
                        <button className="group h-[40px] bg-[#705DF2] p-4 rounded-xl flex justify-center items-center overflow-hidden relative">
                            <div className="absolute left-0 top-0 w-0 h-full bg-[#8b7bf3] transition-all duration-300 ease-in-out group-hover:w-full"></div>
                            <span className="z-10 text-slate-100 text-md font-bold">Commence maintenant</span>
                        </button>
                    </Link>}
                </div>
            </div>
        </div>
    );
}
