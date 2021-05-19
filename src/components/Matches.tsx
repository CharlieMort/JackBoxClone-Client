import React from "react"
import { v4 } from "uuid";
import { IRoom } from "../Interfaces";

interface Props {
    roomInfo: IRoom,
    socket: SocketIOClient.Socket,
    icons: string[]
}

export const Matches: React.FC<Props> = ({roomInfo, socket, icons}) => {
    return(
        <div>
            <button onClick={() => socket.emit("NextLeaderboard", roomInfo.code)}>Next</button>
            {
                roomInfo.matchOutcomes.map((match, idx) => {
                    return (
                        <div className="Match" key={v4()}>
                            <div className="PlayerIcon" key={v4()}>
                                <img src={icons[match.players[0].idx%icons.length]} alt={`${match.players[0].nick}'s Icon`} />
                                <h3>{match.players[0].nick}</h3>
                            </div>
                            <h1>{match.outcome}</h1>
                            <div className="PlayerIcon" key={v4()}>
                                <img src={icons[match.players[1].idx%icons.length]} alt={`${match.players[1].nick}'s Icon`} />
                                <h3>{match.players[1].nick}</h3>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}