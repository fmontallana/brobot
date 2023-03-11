import React, { useEffect, useRef, useState } from 'react'
import Bubble from './Bubble'
import { getRequest, postRequest } from '../../api/request'
import useLocalStorage from '../../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../data/constant'
import { TbHome2, TbSend } from 'react-icons/tb'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase.config'
import { useUserStore } from '../../stores/user.store'
import { useMessagesStore } from '../../stores/messages.store'




function Chatbox() {
    const nav = useNavigate()
    const [user, loading, error] = useAuthState(auth)
    const [scrollDelay, setScrollDelay] = useState(500)
    const [inputValue, setInputValue] = useState("")
    const [typing, setTyping] = useState(false)
    const scroll = useRef(null)
    const input = useRef(null)
    const messages = useMessagesStore(state => state.messages)
    const setMessages = useMessagesStore(state => state.setMessages)
    const addMessage = useMessagesStore(state => state.addMessage)



    //scroll to bottom on load
    useEffect(() => {
        const timeout = setTimeout(() => {
            scroll?.current?.scrollIntoView({ behavior: "instant" })
        }, 500)

        return () => clearTimeout(timeout)
    }, [])

    // get messages from db
    useEffect(() => {
        if (!user) return
        getRequest('api/messages', { uid: user?.uid })
            .then(res => {
                // res.data is an array of messages
                setMessages([{
                    role: "assistant",
                    content: `Hey ${user?.displayName?.split(" ")[0]}! What's up? 🤔`,
                }, ...res.data])
            })
    }, [user])

    // auto scroll to bottom when new message is added
    useEffect(() => {

        const timeout = setTimeout(() => {
            scroll?.current?.scrollIntoView({ behavior: 'smooth' })
        }, scrollDelay)

        return () => clearTimeout(timeout)

    }, [messages])

    // handle enter key
    useEffect(() => {
        const handleEnter = (e) => {
            if (e.key === "Enter") {
                handleSend()
            }
        }
        input?.current?.addEventListener("keydown", handleEnter)

        return () => input?.current?.removeEventListener("keydown", handleEnter)
    }, [inputValue])


    // handle send button
    const handleSend = () => {
        if (inputValue.length === 0) return

        setTyping(true)

        addMessage([{
            role: "user",
            content: inputValue,
        }])

        const newMessages = [{
            role: "user",
            content: inputValue,
        }]

        postRequest('api/getcompletion', { content: newMessages, uid: user?.uid })
            .then((res) => {
                //res.data is object
                addMessage([res.data])
            })
            .finally(() => setTyping(false))

        setInputValue("")
    }


    return (
        <div className='container h-full w-full  flex flex-col justify-end items-end'>
            <div className='py-4 flex flex-col gap-4 items-center w-full mx-auto overflow-y-scroll '>

                {messages?.map((message, index) => {
                    return (
                        <Bubble key={index} role={message.role} message={message.content} time={message.time} />
                    )
                })}
                {typing && <Bubble role={"AI"} >
                    <div className='h-full flex items-end gap-1'>
                        <span className='h-2 w-2 bg-slate-300 rounded-full animate-bounce anim-delay'></span>
                        <span className='h-2 w-2 bg-slate-300 rounded-full animate-bounce anim-delay'></span>
                        <span className='h-2 w-2 bg-slate-300 rounded-full animate-bounce anim-delay'></span>
                    </div>
                </Bubble>}

                <span ref={scroll} ></span>
            </div>
            <div className='h-2/12 w-full mx-auto p-2 flex-shrink-0 flex rounded-lg overflow-hidden'>
                <button onClick={() => nav(ROUTES.HOME)} className="rounded-none rounded-l-lg btn glass">
                    <TbHome2 size={24} />
                </button>
                <input ref={input} value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Type here" className=" input input-bordered w-full max-w-xs rounded-none  focus:outline-none" />
                <button onClick={handleSend} className="rounded-none rounded-r-lg btn glass">
                    <TbSend size={24} />
                </button>
            </div>
        </div>
    )
}

export default Chatbox