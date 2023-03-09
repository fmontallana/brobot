import React from 'react'
import robotHead from '../assets/robot-head.webp'

function BrobotAvatar({ size = "w-24" }) {
    return (
        <div className="avatar animate-bounce">
            <div className={`${size} mask mask-hexagon`}>
                <img src={robotHead} />
            </div>
        </div>
    )
}

export default BrobotAvatar