import React, { useState } from "react";
import { v4 } from "uuid";
import { Msgs } from "./Msgs";
import { IPlayer, IRoom } from "../Interfaces";
import { Link } from "react-router-dom";

interface Props {
    roomInfo: IRoom,
    player: IPlayer,
    socket: SocketIOClient.Socket,
    icons: string[],
    idx: number
}

export const MsgWindow: React.FC<Props> = ({roomInfo, player, socket, icons, idx}) => {
    const [msg, setMsg] = useState<string>();

    const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMsg(e.target.value);
    }

    const Submit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMsg("");
        socket.emit("SendMsg", roomInfo.code, msg, player.id);
    }

    return(
        <div className="Messages-Wrapper">
            <div className="Messages">
                <div className="Top-Banner">
                    <Link className="Home-Btn" to="/game">
                        <svg xmlns="http://www.w3.org/2000/svg" className="Home-Icon" viewBox="0 0 20 20" fill="white">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    <img className="Msg-Icon" src={icons[idx%icons.length]} alt={`${player.nick}'s Icon`} />
                    <h2 className="Msg-Name">{player.nick}</h2>
                </div>
                <div className="Player">
                    { // Loop through all the converstations
                        roomInfo.conversations.map((convo) => {
                            if (convo.recipiants.includes(socket.id) && convo.recipiants.includes(player.id)) {
                                // This is the one that cotains us both *snuggles*
                                return <Msgs conversation={convo} id={socket.id} key={v4()} />
                            }
                            return <></>
                        })
                    }
                    <div>
                        <form className="BottomBar" onSubmit={Submit}>
                            <input className="Msg-Box" type="text" autoFocus={true} placeholder="Enter Msg...." value={msg} onChange={OnChange} />
                            <input className="Send" type="submit" value="Send" />
                        </form>
                    </div>
                    <div ref={el => el?.scrollIntoView()} />
                </div>
            </div>
        </div>
    );
}