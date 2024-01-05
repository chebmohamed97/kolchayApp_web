import { useState } from "react"

export default function SidebarItemOnlyLogo({item}){
        return (
            <a href={item.path || "#"} className="SideBarItemLogo">
                { item.icon && <i className={item.icon}></i> }
            </a>
                
        )

}