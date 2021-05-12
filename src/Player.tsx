import React, { useState, useEffect, useRef } from "react";
import { Conversation } from "./Conversation";
import { IPlayer, IRoom } from "./Interfaces";

interface Props {
    roomInfo: IRoom,
    player: IPlayer,
    socket: SocketIOClient.Socket,
    roomCode: string,
}

export const Player: React.FC<Props> = ({roomInfo, player, socket, roomCode}) => {
    const [msg, setMsg] = useState<string>("");
    const [msgRef, setMsgRef] = useState<HTMLElement | null>(null);

    const scrollToBottom = () => {
        msgRef?.scrollIntoView({ behavior: "smooth" });
    }

    const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMsg(e.target.value);
    }

    const Submit = () => {
        setMsg("");
        socket.emit("SendMsg", roomCode, msg, player.id);
    }

    useEffect(() => {
        scrollToBottom()
    }, [roomInfo]);

    return(
        <div className="Player">
            {
                roomInfo.conversations.map((convo) => {
                    if (convo.recipiants.includes(socket.id) && convo.recipiants.includes(player.id)) {
                        return <Conversation conversation={convo} id={socket.id} />
                    }
                    return <></>
                })
            }
            <input className="Msg-Box" type="text" placeholder="Enter Msg...." value={msg} onChange={OnChange} />
            <input className="Send" type="button" value="Send" onClick={Submit} />
            <div ref={el => el?.scrollIntoView()} />
        </div>
    );
}