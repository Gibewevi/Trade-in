import Link from "next/link";

export default function Header() {
    return (
        <div className="fixed w-full h-[80px] z-50">
            <div className="flex flex-row h-full bg-slate-100 items-center p-6">
                <div className="flex flex-1 gap-x-[70px]">
                    <Link href="/" aria-label="Homepage">
                        <h1 className="font-black text-3xl text-slate-900">BitLearn</h1>
                    </Link>
                    <nav className="flex flex-row items-center gap-x-[70px] ">
                        <Link href="/lessons/definition-des-cryptomonnaies"><span className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-4">Lessons</span></Link>
                        <Link href="/challenges"><span className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-4">Challenges</span></Link>
                        <Link href="/airdrops"><span className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-4">Airdrops</span></Link>
                        {/* <Link href="/community"><span className="text-slate-900">actualités</span></Link> */}
                        <Link href="/community"><span className="text-slate-500 hover:text-slate-900 hover:underline hover:underline-offset-4">Community</span></Link>
                    </nav>
                </div>
                <div className="flex flex-row justify-center items-center gap-x-5">
                    <div className="flex flex-row w-[100px]">
                        <img src='/images/CarbonUser.svg' className="w-[25px]" />
                        <span className="text-md text-slate-900 font-semibold ml-2">Login</span>
                    </div>
                    <Link href="/join">
                        <button className="group h-[40px] bg-[#705DF2] p-4 rounded-xl flex justify-center items-center overflow-hidden relative">
                            <div className="absolute left-0 top-0 w-0 h-full bg-[#8b7bf3] transition-all duration-300 ease-in-out group-hover:w-full"></div>
                            <span className="z-10 text-slate-100 text-md font-bold">Commence maintenant</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
