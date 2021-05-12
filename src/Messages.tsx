import React from "react";
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
                <img className="Msg-Icon" src={icons[idx%icons.length]} alt={`${player.nick}'s Icon`} />
                <h2 className="Msg-Name">{player.nick}</h2>
            </div>
            <Player roomInfo={roomInfo} player={player} socket={socket} roomCode={roomInfo.code} />
        </div>
    )
}