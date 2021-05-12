import React from "react";
import { IRoom } from "./Interfaces";
import { v4 as uuidv4 } from "uuid";

interface Props {
    roomInfo: IRoom,
    icons: string[],
    socket: SocketIOClient.Socket
}

export const Lobby: React.FC<Props> = ({roomInfo, icons, socket}) => {
    return(
        <div className="Lobby">
            <h1><b><u>Players</u></b></h1>
            {roomInfo.players.map((player) => {
                if (player.id === socket.id && player.isHost) return <button onClick={() => socket.emit("StartGame", roomInfo.code)}>Start Game</button>
                return <></>
            })
            }
            <div className="Players">
                {
                    roomInfo.players.map((player, idx) => {
                        return(
                            <div className="PlayerIcon" key={uuidv4()}>
                                <img src={icons[idx%icons.length]} alt={`${player.nick}'s Icon`} />
                                <h3>{player.nick}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}