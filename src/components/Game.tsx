import React, { useEffect, useState } from "react";
import { IRoom } from "../Interfaces";
import { useHistory } from "react-router-dom";

interface Props {
    roomInfo: IRoom,
    socket: SocketIOClient.Socket,
    icons: string[]
}

export const Game: React.FC<Props> = ({roomInfo, socket, icons}) => {
    const [alerts, setAlerts] = useState<boolean[]>([false]);
    const history = useHistory();

    useEffect(() => {
        let na: boolean[] = [];
        for (let i = 0; i<roomInfo.players.length; i++) {
            na.push(false);
            setAlerts(na);
        }
        socket.on("NewMsg", (senderIdx:number) => {
            console.log(senderIdx);
            let newAlerts = [];
            for (let i = 0; i<roomInfo.players.length; i++) {
                newAlerts.push(alerts[i] ? true : false);
            }
            newAlerts[senderIdx] = true;
            console.log(newAlerts);
            setAlerts(newAlerts);
        })
    },[])

    const GoToConvo = (idx:number) => {
        let newAlerts = [...alerts];
        newAlerts[idx] = false;
        setAlerts(newAlerts);
        history.push(`/game/${idx}`);
    }

    return(
        <div>
            {
                roomInfo.stage === "game" &&
                <div className="Players">
                    {
                        roomInfo.players.map((player, idx) => {
                            if (player.id === socket.id) return <></>;
                            return(
                                <button className="Icon-Btn" onClick={() => GoToConvo(idx)}>
                                    <div className="PlayerIcon">
                                        <img src={icons[idx%icons.length]} alt={`${player.nick}'s Icon`} />
                                        <h3 className="Icon-Txt">Message {player.nick}</h3>
                                        {
                                            alerts[idx] && <h3>New Msg</h3>
                                        }
                                    </div>
                                </button>
                            )
                        })
                    }
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