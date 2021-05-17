import React from "react";
import { IRoom } from "../Interfaces";

interface Props {
    roomInfo: IRoom,
    socket: SocketIOClient.Socket
}

export const Match: React.FC<Props> = ({roomInfo, socket}) => {
    return(
        <div>
            <h1>Pick Someone To Match With</h1>
        </div>
    )
}