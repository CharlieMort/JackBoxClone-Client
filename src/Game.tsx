import React, { useEffect, useState } from "react";
import { IRoom } from "./Interfaces";
import { Link } from "react-router-dom";

interface Props {
    roomInfo: IRoom,
    socket: SocketIOClient.Socket,
    icons: string[]
}

export const Game: React.FC<Props> = ({roomInfo, socket, icons}) => {
    const [countdown, setCountdown] = useState(0);

    return(
        <div>
            <h1>Countdown: {roomInfo.countdown}s Left!!</h1>
            {
                roomInfo.stage === "game" &&
                <div className="Players">
                    {
                        roomInfo.players.map((player, idx) => {
                            if (player.id === socket.id) return <></>;
                            return(
                                <Link to={`/${idx}`} className="Icon-Btn">
                                    <div className="PlayerIcon">
                                        <img src={icons[idx%icons.length]} alt={`${player.nick}'s Icon`} />
                                        <h3 className="Icon-Txt">Message {player.nick}</h3>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            }
            {
                roomInfo.stage === "showcase" &&
                <div>
                    <h1>Showcase</h1>
                    <h2>{roomInfo.showcaseConvo.recipiantsNicks[0]} VS {roomInfo.showcaseConvo.recipiantsNicks[1]}</h2>
                </div>
            }
        </div>
    )
}

/*
{
    roomInfo.players.map((player: IPlayer) => {
        return <Player roomInfo={roomInfo} player={player} socket={socket} roomCode={roomInfo.code} />
    })
}
*/