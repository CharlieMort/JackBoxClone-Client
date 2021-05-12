import React from "react";
import { Link } from "react-router-dom";
import { IPlayer, IRoom } from "./Interfaces";
import { Player } from "./Player";

interface Props {
    roomInfo: IRoom,
    player: IPlayer,
    icons: string[],
    socket: SocketIOClient.Socket,
    idx: number
}

export const Messages: React.FC<Props> = ({roomInfo, player, icons, socket, idx}) => {
    return(
        <div className="Messages">
            <div className="Top-Banner">
                <Link className="Home-Btn" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" className="Home-Icon" viewBox="0 0 20 20" fill="white">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                    </svg>
                </Link>
                <img className="Msg-Icon" src={icons[idx%icons.length]} alt={`${player.nick}'s Icon`} />
                <h2 className="Msg-Name">{player.nick}</h2>
            </div>
            <Player roomInfo={roomInfo} player={player} socket={socket} roomCode={roomInfo.code} />
        </div>
    )
}