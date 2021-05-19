import React from "react";
import { IRoom } from "../Interfaces";

interface Props {
    socket: SocketIOClient.Socket,
    roomInfo: IRoom
}

export const NextRoundCard: React.FC<Props> = ({socket, roomInfo}) => {
    return(
        <div>
            <h1>Round {roomInfo.round + 1}</h1>
            <button onClick={() => socket.emit("NextRound", roomInfo.code)}>Onwards</button>
        </div>
    )
}