import React from "react";
import { IRoom } from "../Interfaces";
import { Lobby } from "./Lobby";
import { Countdown } from "./Countdown";

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
                roomInfo.started 
                ? <Countdown startTime={120} roomInfo={roomInfo} />
                :
                    roomInfo.players.length >= 2
                    ? <button onClick={() => socket.emit("StartGame", roomInfo.code)}>Start Game?</button>
                    : <h3>Not Enough Players To Start</h3>
            }
            <Lobby roomInfo={roomInfo} icons={icons} socket={socket} />
        </div>
    )
}