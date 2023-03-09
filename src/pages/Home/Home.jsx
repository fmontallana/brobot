import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../data/constant'
import BrobotAvatar from '../../components/BrobotAvatar'
import useLocalStorage from '../../hooks/useLocalStorage'

function Home() {

    const [user] = useLocalStorage("user")
    const nav = useNavigate()

    const logout = () => {
        window.localStorage.removeItem("user")
        window.location.reload()
    }

    return (
        <div className='h-full w-full px-6 flex flex-col gap-10 justify-center items-center'>
            <BrobotAvatar />
            <div className='flex flex-col gap-4 text-center'>
                <h1 className='font-bold text-xl'>Brobot V1</h1>
                <p>👋 Hey there! Are you ready to chat with the coolest bot in town? 💁‍♀️💁‍♂️</p>
                <p>💣 This chat bot app is the bomb dot com! It'll make you laugh, it'll make you swoon, and it'll always have a witty response. 💬💭</p>
                <p>🤩 So go ahead, hit me up and let's get this conversation poppin'! 🔥🎉</p>
            </div>
            {user ? <div className='flex gap-2'>
                <button className='btn bg-primary glass text-gray-800 hover:text-slate-300' onClick={() => nav(ROUTES.CHAT)}>back to chat</button>
                <button className='btn glass' onClick={logout}>logout</button>
            </div> : <button className='btn glass' onClick={() => nav(ROUTES.LOGIN)}>Let's Chat!</button>}
        </div>
    )
}

export default Home