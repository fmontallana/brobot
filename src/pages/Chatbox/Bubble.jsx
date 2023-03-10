import React from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import robot from '../../assets/robot-head.webp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase.config'

function Bubble({ role, message, time, children }) {

    const [user, loading, error] = useAuthState(auth)

    if (!user) return null

    return (
        <div className={`flex gap-2 w-full h-auto px-2 ${role === "user" ? "flex-row-reverse" : ""} `}>
            {/* profile picture */}
            <div className='flex-shrink-0 self-end'>
                {role === "user" ? <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`} alt="profile picture" className="rounded-full w-10 h-10 border border-secondary-focus" /> : <img src={robot} height={10} width={10} alt="profile picture" className="rounded-full w-10 h-10 border border-secondary-focus" />}

            </div>
            {/* chat message */}
            <div className={`w-9/12 min-h-14 flex flex-col ${role === "user" ? "text-right items-end" : "items-start"}`}>

                <div className={`${role === "user" ? "bg-primary-content" : "border border-primary-content"} text-slate-200 px-2 py-1 rounded grid place-items-center`}>{message || children}</div>

            </div>
        </div>
    )
}

export default Bubble