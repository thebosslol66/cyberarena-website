import React from 'react'
import {Link} from "react-router-dom";



export const WebsiteOverlay = () => {
    return (
        <div className="flex flex-col absolute w-full h-full z-10 p-10 text-white">
            <div className="flex font-bold flex-col my-auto max-w-[38rem] backdrop-blur-[40px] p-4 rounded-3xl">
                <div className="uppercase text-8xl">Dominate</div>
                <div className="uppercase text-4xl mb-6">the Virtual Battlefield</div>
                <div className="mb-6">
                    Test your skills and strategy against players from around the world. Prove your worth on the virtual battlefield and become the master of CyberArena. Join the electrifying adventure now.
                </div>
                <Link to='/dashboard' className="mr-auto px-6 py-2 bg-white text-lg text-black uppercase rounded-lg font-bold">Start playing</Link>
            </div>
        </div>
    )
}
