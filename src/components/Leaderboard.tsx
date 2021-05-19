import React from "react";
import { v4 } from "uuid";
import { IRoom } from "../Interfaces";

interface Props {
    roomInfo: IRoom,
    socket: SocketIOClient.Socket
}

export const Leaderboard: React.FC<Props> = ({roomInfo, socket}) => {
    return(
        <div>
            <button onClick={() => socket.emit("NextStage", roomInfo.code)}>Next</button>
            <ol>
            {
                roomInfo.leaderBoard.map((player, idx) => {
                    return(
                        <li key={v4()}>
                            {player.nick}: {player.score} {"<3"}
                        </li>
                    )
                })
            }
            </ol>
        </div>
    )
}