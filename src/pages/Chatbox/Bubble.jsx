import React from 'react'
import useLocalStorage from '../../hooks/useLocalStorage'
import robot from '../../assets/robot-head.webp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase.config'

function Bubble({ role, message, time, children }) {

    const [user, loading, error] = useAuthState(auth)

    if (!user) return null

    return (
        <div className={`flex justify-start gap-2 w-full h-auto px-2 ${role === "user" ? "flex-row-reverse" : ""} `}>
            {/* profile picture */}
            <div className='flex-shrink-0 self-end'>
                <img src={role === "user" ? user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}` : robot} alt="profile picture" className="rounded-full w-8 h-8 border border-secondary-focus" />
            </div>
            {/* chat message */}
            <div className={`flex-1 min-h-14 flex flex-col ${role === "user" ? "text-right items-end" : "items-start"}`}>

                <div className={`${role === "user" ? "bg-primary-content" : "border border-primary-content"} text-slate-200 px-2 py-1 rounded grid place-items-center`}>{message || children}</div>
            </div>
            <div className='w-8' />
        </div>
    )
}

export default Bubble