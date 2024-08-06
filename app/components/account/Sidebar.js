'use client'
import SidebarItem from "./SidebarItem"
import { usePathname } from 'next/navigation';
export default function Sidebar() {

    const pathname = usePathname();
    const currentSection = pathname.split('/account/')[1]?.split('/')[0];
    console.log('current section : ', currentSection);
    return (
        <div className={`flex flex-col w-[200px] p-5 gap-y-4 border-r border-gray-500`}>
            <SidebarItem title="détails" titleSection={'billing'} icon='/images/CarbonUser.svg' url='/account/billing' currentSection={currentSection}/>
            <SidebarItem title="sécurité" titleSection={'security'} icon='/images/CarbonUser.svg' url='/account/security' currentSection={currentSection}/>
            <SidebarItem title="facturation" titleSection={'invoice'} icon='/images/CarbonUser.svg' url='/account/invoice' currentSection={currentSection}/>
            <SidebarItem title="Help / discord " titleSection={'help'} icon='/images/CarbonUserWhite.svg' url='/account/help' currentSection={currentSection}/>
            <SidebarItem title="certification" titleSection={'certificate'} icon='/images/CarbonUser.svg' url='/account/certificate' currentSection={currentSection}/>
        </div>
    )
} 