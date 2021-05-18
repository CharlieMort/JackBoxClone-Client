import React from "react";
import { IRoom } from "../Interfaces";
import { Countdown } from "./Countdown";

interface Props {
    roomInfo: IRoom,
    socket: SocketIOClient.Socket
}

export const MatchScreen: React.FC<Props> = ({roomInfo, socket}) => {
    return(
        <div>
            <Countdown roomInfo={roomInfo} startTime={30} stage="matches" nextStage="showcase" />
            <h1>Choose Your Match</h1>
        </div>
    )
}