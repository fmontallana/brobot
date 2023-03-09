import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Bubble from './Bubble'
import { postRequest } from '../../api/request'

function Chatbox({ user }) {

    const [scrollDelay, setScrollDelay] = useState(0)
    const [inputValue, setInputValue] = useState("")
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([{
        role: "AI",
        message: `Hey ${user?.displayName?.split(" ")[0]}! What's up? 🤔`,
        time: "12:00"
    }])
    const scroll = useRef(null)
    const input = useRef(null)

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

        setMessages(prev => [...prev, {
            role: "user",
            message: inputValue,
            time: "12:00"
        }])
        setTyping(true)
        const newMessages = [...messages, {
            role: "user",
            message: inputValue,
            time: "12:00"
        }].map(message => {
            return {
                role: message.role === "user" ? "user" : "assistant",
                content: message.message
            }
        })

        postRequest('http://localhost:5001/api/getcompletion', newMessages)
            .then((res) => {
                console.log(res.data)
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
        <div className='container h-[100dvh] max-w-sm mx-auto flex flex-col justify-end items-end'>
            <div className='py-4 flex flex-col gap-4 items-center w-full mx-auto overflow-y-scroll '>
                {messages.map((message, index) => {
                    return (
                        <Bubble key={index} role={message.role} message={message.message} time={message.time} />
                    )
                })}
                {typing && <Bubble role={"AI"} message={"Typing..."} />}

                <span ref={scroll} ></span>
            </div>
            <div className='h-2/12 w-80 mx-auto py-2 flex-shrink-0 flex rounded-lg overflow-hidden'>
                <input ref={input} value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Type here" className=" input input-bordered w-full max-w-xs rounded-none rounded-l-lg focus:outline-none" />
                <button onClick={handleSend} className="rounded-none rounded-r-lg btn btn-primary">Send</button>
            </div>
        </div>
    )
}

export default Chatbox