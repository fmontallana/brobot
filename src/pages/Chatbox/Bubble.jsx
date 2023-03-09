import React from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import robot from '../../assets/robot-head.webp'

function Bubble({ role, message, time, children }) {

    const [user] = useLocalStorage("user")

    return (
        <div className={`flex gap-2 w-full h-full px-2 ${role === "user" ? "flex-row-reverse" : ""} `}>
            {/* profile picture */}
            <div className='flex-shrink-0'>
                {role === "user" ? <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`} alt="profile picture" className="rounded-full w-10 h-10 border border-secondary-focus" /> : <img src={robot} height={10} width={10} alt="profile picture" className="rounded-full w-10 h-10 border border-secondary-focus" />}

            </div>
            {/* chat message */}
            <div className={`w-9/12 h-full min-h-14 flex flex-col ${role === "user" ? "text-right items-end" : "items-start"}`}>
                <div className={`${role === "user" ? "flex-row-reverse" : ""} flex items-center gap-1`}>
                    {/* <span className="text-primary font-bold">{role === "user" ? "You" : "AI"}</span> */}
                    {/* <span>|</span> */}
                    {/* <span className="text-primary text-xs">12:00</span> */}
                </div>
                <p className={`${role === "user" ? "bg-primary-content" : "border border-primary-content"} text-slate-200 flex-1 px-2 py-1 rounded grid place-items-center`}>{message || children}</p>

            </div>
        </div>
    )
}

export default Bubble