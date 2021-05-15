import React, { useState, useEffect, useRef } from "react";
import { Conversation } from "./Conversation";
import { IPlayer, IRoom } from "./Interfaces";

interface Props {
    roomInfo: IRoom,
    player: IPlayer,
    socket: SocketIOClient.Socket,
    roomCode: string,
}

function usePrevious(value: string) {
    const ref = useRef("");
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

export const Player: React.FC<Props> = ({roomInfo, player, socket, roomCode}) => {
    const [msg, setMsg] = useState<string>("");
    const prevMsg = usePrevious(msg);
    const [msgRef] = useState<HTMLElement | null>(null);

    const scrollToBottom = () => {
        msgRef?.scrollIntoView({ behavior: "smooth" });
    }

    const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMsg(e.target.value);
    }

    const Submit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMsg("");
        socket.emit("SendMsg", roomCode, msg, player.id);
    }

    useEffect(() => {
        setMsg(prevMsg);
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
            <div>
                <form className="BottomBar" onSubmit={Submit}>
                    <input className="Msg-Box" type="text" autoFocus={true} placeholder="Enter Msg...." value={msg} onChange={OnChange} />
                    <input className="Send" type="submit" value="Send" />
                </form>
            </div>
            <div ref={el => el?.scrollIntoView()} />
        </div>
    );
}