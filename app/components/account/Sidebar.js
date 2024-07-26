import SidebarItem from "./SidebarItem"
export default function Sidebar() {
    return (
        <div className={`flex flex-col w-[200px] p-5 gap-y-4 border-r border-gray-500`}>
            <SidebarItem title="billing" icon='/images/CarbonUser.svg' />
            <SidebarItem title="sécurité" icon='/images/CarbonUser.svg' />
            <SidebarItem title="factures" icon='/images/CarbonUser.svg' />
            <SidebarItem title="Help / discord " icon='/images/CarbonUserWhite.svg' />
            <SidebarItem title="details" icon='/images/CarbonUser.svg' />
        </div>
    )
} 