import React from "react";
import { IRoom } from "../Interfaces";
import { Lobby } from "./Lobby";
import { Countdown } from "./Countdown";
import { HostGame } from "./HostGame";
import { Showcase } from "./Showcase";

interface Props {
    socket: SocketIOClient.Socket,
    roomInfo: IRoom,
    icons: string[]
}

export const HostScreen: React.FC<Props> = ({socket, roomInfo, icons}) => {
    return(
        <div>
            <h1>Host Screen</h1>
            <h2>Room Code: {roomInfo.code}</h2>
            {
                (roomInfo.stage === "game" || roomInfo.stage === "lobby") && <HostGame icons={icons} roomInfo={roomInfo} socket={socket} />
            }
            {
                roomInfo.stage === "showcase" && <Showcase icons={icons} roomInfo={roomInfo} socket={socket} />
            }
        </div>
    )
}