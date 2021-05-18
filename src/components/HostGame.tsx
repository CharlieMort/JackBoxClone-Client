import React from "react";
import { IRoom } from "../Interfaces";
import { Countdown } from "./Countdown";
import { Lobby } from "./Lobby";

interface Props {
    roomInfo: IRoom,
    socket: SocketIOClient.Socket,
    icons: string[]
}

export const HostGame: React.FC<Props> = ({roomInfo, socket, icons}) => {
    return(
        <div>
            {
                roomInfo.started 
                ? <Countdown startTime={20} roomInfo={roomInfo} stage="game" nextStage="matches" />
                :
                    roomInfo.players.length >= 2
                    ? <button onClick={() => socket.emit("StartGame", roomInfo.code)}>Start Game?</button>
                    : <h3>Not Enough Players To Start</h3>
            }
            <Lobby roomInfo={roomInfo} icons={icons} socket={socket} />
        </div>
    )
}