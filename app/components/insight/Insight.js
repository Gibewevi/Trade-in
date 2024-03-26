export default function Insight(props) {
    return (
        <div className="flex flex-col gap-y-2 p-3 w-[400px] h-[450px] rounded-lg border border-1 bg-slate-100 shadow-lg border-gray-300">
            <div className="flex flex-row justify-between">
                <div className="flex items-center justify-center w-[70px] h-[25px] bg-blue-500 text-slate-100 rounded-lg p-1">
                    <span className="text-sm">new !</span>
                </div>
                <div className="">
                    <img src='/images/CarbonBookmarkAdd.svg' className="w-[25px]" />
                </div>
            </div>
            <div className="flex flex-row gap-x-3">
                <span className="text-lg text-slate-700 font-bold tracking-wide">{props.paire}</span>
                <span className="text-lg text-slate-700">,{props.UT}</span>
                <span className="text-lg text-slate-700"> {props.type}</span>
            </div>

            <img src={props.urlImage} className="w-full h-[330px] bg-cover rounded-lg" />
            <span>{props.description}</span>
            <div className="flex flex-row justify-between gap-x-3">
                <div className="flex flew-row gap-x-3">
                    <img src={'/images/CarbonFavorite.svg'} className="w-[25px]" />
                </div>
                <div></div>
                <img src='/images/CarbonLogoYoutube.svg' className="w-[30px]" />
            </div>
        </div>
    )
}