import React, { useState } from "react";
import { IRoom } from "../Interfaces";

interface Props {
    roomInfo: IRoom,
    socket: SocketIOClient.Socket,
    icons: string[]
}

export const PickMatch: React.FC<Props> = ({roomInfo, socket, icons}) => {
    const [matched, setMatched] = useState(false);

    const Choose = (idx: number) => {
        socket.emit("PickMatch", idx, roomInfo.code);
        setMatched(true);
    }

    if (matched) {
        return(
            <div>
                <h1>Great You've Picked Your Match. Will They Match Back??</h1>
            </div>
        )
    }

    return(
        <div>
            <h1>Pick Someone To Match With</h1>
            <div className="Players">
                {
                    roomInfo.players.map((player, idx) => {
                        if (player.id === socket.id) return <></>;
                        return(
                            <button className="Icon-Btn" onClick={() => Choose(idx)}>
                                <div className="PlayerIcon">
                                    <img src={icons[idx%icons.length]} alt={`${player.nick}'s Icon`} />
                                    <h3 className="Icon-Txt">Choose {player.nick}</h3>
                                </div>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}