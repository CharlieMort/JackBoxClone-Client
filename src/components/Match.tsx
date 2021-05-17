import React from "react";
import { IRoom } from "../Interfaces";

interface Props {
    roomInfo: IRoom,
    socket: SocketIOClient.Socket,
    icons: string[]
}

export const Match: React.FC<Props> = ({roomInfo, socket, icons}) => {
    return(
        <div>
            <h1>Pick Someone To Match With</h1>
            <div className="Players">
                {
                    roomInfo.players.map((player, idx) => {
                        if (player.id === socket.id) return <></>;
                        return(
                            <button className="Icon-Btn">
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