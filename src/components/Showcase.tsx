import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { IRoom } from "../Interfaces";
import { ShowcaseMsgs } from "./ShowcaseMsgs";

interface Props {
    roomInfo: IRoom,
    socket: SocketIOClient.Socket,
    icons: string[]
}

export const Showcase: React.FC<Props> = ({roomInfo, socket, icons}) => {
    const [playerIdxs, setPlayerIdxs] = useState([0,0]);
    
    useEffect(() => {
        if (roomInfo.showcaseConvo !== undefined) {
            let idxs = [0,0];
            for (let i = 0; i<roomInfo.players.length; i++) {
                if (roomInfo.showcaseConvo.recipiants[0] === roomInfo.players[i].id) {
                    idxs[0] = i;
                }
                else if (roomInfo.showcaseConvo.recipiants[1] === roomInfo.players[i].id) {
                    idxs[1] = i;
                }
            }
            setPlayerIdxs(idxs);
        }
    }, []);

    if (roomInfo.showcaseConvo === undefined) return <h1>No One Msged Eachother and thats kinda cringe</h1>

    return(
        <div>
            <h1>Showcase</h1>
            <div className="Showcase-Icons-Wrapper">
                <div className="PlayerIcon" key={v4()}>
                    <img src={icons[playerIdxs[0]%icons.length]} alt={`${roomInfo.showcaseConvo.recipiantsNicks[0]}'s Icon`} />
                    <h3>{roomInfo.showcaseConvo.recipiantsNicks[0]}</h3>
                </div>
                <div className="PlayerIcon" key={v4()}>
                    <img src={icons[playerIdxs[1]%icons.length]} alt={`${roomInfo.showcaseConvo.recipiantsNicks[1]}'s Icon`} />
                    <h3>{roomInfo.showcaseConvo.recipiantsNicks[1]}</h3>
                </div>
            </div>
            <ShowcaseMsgs roomInfo={roomInfo} socket={socket} />
        </div>
    )
}