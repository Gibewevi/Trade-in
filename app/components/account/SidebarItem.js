import Link from "next/link";

export default function SidebarItem(props) {
    const isActive = props.currentSection === props.titleSection;
    return (
        <Link href={props.url}>
            <div className={`flex flex-row items-center gap-x-1 fill-[#1c1b1b] text-lg hover:underline hover:underline-offset-2 text-slate-800 ${isActive ? 'font-bold' : 'font-normal'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 32 32">
                    <path d="M16 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7m10 28h-2v-5a5 5 0 0 0-5-5h-6a5 5 0 0 0-5 5v5H6v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7z" />
                </svg>
                {props.title}
            </div>
        </Link>
    );
}
