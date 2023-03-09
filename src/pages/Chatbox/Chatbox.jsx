import React, { useEffect, useRef, useState } from 'react'
import Bubble from './Bubble'
import { getRequest, postRequest } from '../../api/request'
import useLocalStorage from '../../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../data/constant'
import { TbHome2, TbSend } from 'react-icons/tb'




function Chatbox() {
    const nav = useNavigate()
    const [user] = useLocalStorage("user")
    const [scrollDelay, setScrollDelay] = useState(0)
    const [inputValue, setInputValue] = useState("")
    const [typing, setTyping] = useState(false)
    const scroll = useRef(null)
    const input = useRef(null)
    const [messages, setMessages] = useState([{
        role: "AI",
        message: `Hey ${user?.displayName?.split(" ")[0]}! What's up? 🤔`,
        time: "12:00"
    }])



    scroll?.current?.scrollIntoView({ behavior: 'smooth' })

    useEffect(() => {
        // setMessages([{
        //     role: "AI",
        //     message: `Hey ${user?.displayName?.split(" ")[0]}! What's up? 🤔`,
        //     time: "12:00"
        // }])
        getRequest('api/messages', { uid: user?.uid })
            .then(res => {
                if (res.data.length === 0) return
                const newMessages = res?.data?.map(message => {
                    return {
                        role: message.role === "user" ? "user" : "AI",
                        message: message.content,
                        time: "12:00"
                    }
                })

                setMessages([{
                    role: "AI",
                    message: `Hey ${user?.displayName?.split(" ")[0]}! What's up? 🤔`,
                    time: "12:00"
                }, ...newMessages])
            })
    }, [])


    // auto scroll to bottom
    useEffect(() => {
        if (scrollDelay === 0) return
        const timeout = setTimeout(() => {
            scroll?.current?.scrollIntoView({ behavior: 'smooth' })
        }, scrollDelay)

        return () => clearTimeout(timeout)

    }, [messages, scrollDelay])

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

        setMessages(prev => [...prev, {
            role: "user",
            message: inputValue,
            time: "12:00"
        }])

        const newMessages = [{
            role: "user",
            message: inputValue,
            time: "12:00"
        }].map(message => {
            return {
                role: message.role === "user" ? "user" : "assistant",
                content: message.message
            }
        })

        postRequest('api/getcompletion', { messages: newMessages, uid: user?.uid })
            .then((res) => {
                const newMessages = [res.data].map(message => {
                    return {
                        role: message.role === "user" ? "user" : "AI",
                        message: message.content,
                        time: "12:00"
                    }
                })
                setMessages(prev => [...prev, ...newMessages])
            })
            .finally(() => {
                setTyping(false)
            })

        setScrollDelay(500)
        setInputValue("")
    }


    return (
        <div className='container h-full w-full  flex flex-col justify-end items-end'>
            <div className='py-4 flex flex-col gap-4 items-center w-full mx-auto overflow-y-scroll '>

                {messages?.map((message, index) => {
                    return (
                        <Bubble key={index} role={message.role} message={message.message} time={message.time} />
                    )
                })}
                {typing && <Bubble role={"AI"} >
                    <div className='h-full flex items-end gap-1'>
                        <span className='h-2 w-2 glass rounded-full animate-bounce anim-delay'></span>
                        <span className='h-2 w-2 glass rounded-full animate-bounce anim-delay'></span>
                        <span className='h-2 w-2 glass rounded-full animate-bounce anim-delay'></span>
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