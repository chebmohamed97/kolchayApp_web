import { useState } from "react"

export default function TopbarItem({item}){

        return (
            <>
            <a className="topbarItem" href={item.path || "#"} >
                { item.icon && <i className={item.icon}></i> }
                {item.title}
            </a>
            </>
            
        )
    }
