import React from "react";
import { IRoom } from "../Interfaces";
import { Lobby } from "./Lobby";
import { Countdown } from "./Countdown";
import { HostGame } from "./HostGame";
import { Showcase } from "./Showcase";
import { MatchScreen } from "./MatchScreen";
import { Matches } from "./Matches";
import { Leaderboard } from "./Leaderboard";
import { NextRoundCard } from "./NextRoundCard";

interface Props {
    socket: SocketIOClient.Socket,
    roomInfo: IRoom,
    icons: string[]
}

export const HostScreen: React.FC<Props> = ({socket, roomInfo, icons}) => {
    
    console.log(roomInfo.stage);
    return(
        <div>
            <h1>Host Screen</h1>
            <h2>Room Code: {roomInfo.code}</h2>
            {
                (roomInfo.stage === "game" || roomInfo.stage === "lobby") && <HostGame icons={icons} roomInfo={roomInfo} socket={socket} />
            }
            {
                roomInfo.stage === "matches" && <MatchScreen roomInfo={roomInfo} socket={socket} />
            }
            {
                roomInfo.stage === "showcase" && <Showcase icons={icons} roomInfo={roomInfo} socket={socket} />
            }
            {
                roomInfo.stage === "match_showcase" && <Matches icons={icons} roomInfo={roomInfo} socket={socket} />
            }
            {
                roomInfo.stage === "leaderboard" && <Leaderboard roomInfo={roomInfo} socket={socket} />
            }
            {
                roomInfo.stage === "show_round" && <NextRoundCard roomInfo={roomInfo} socket={socket} />
            }
        </div>
    )
}