import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { IRoom } from "../Interfaces";

interface Props {
    roomInfo: IRoom,
    socket: SocketIOClient.Socket
}

export const ShowcaseMsgs: React.FC<Props> = ({roomInfo, socket}) => {
    const [msgIdx, setMsgIdx] = useState<number>(0);
    const [msgInterval, setMsgInterval] = useState<null | NodeJS.Timeout>(null);

    useEffect(() => {
        setMsgInterval(setInterval(() => {
            setMsgIdx(prevIdx => prevIdx + 1);
        }, 2000))

        return () => {
            if (msgInterval !== null) clearInterval(msgInterval);
        }
    }, []);

    useEffect(() => {
        console.log(`IDX-${msgIdx} COUNT-${roomInfo.showcaseConvo.msgs.length}`)
        if (msgIdx > roomInfo.showcaseConvo.msgs.length) {
            socket.emit("ToMatchShowcase", roomInfo.code);
            if (msgInterval !== null) clearInterval(msgInterval);
        }
    }, [msgIdx])

    return(
        <div className="Conversation">
            {
                roomInfo.showcaseConvo.msgs.slice(0, msgIdx).map((msg) => {
                    return(
                        <div className={`Msg ${roomInfo.showcaseConvo.recipiants[0] === msg.sender ? "mine" : "theirs"}`} key={v4()}>
                            <h2 className="Msg-txt">{msg.txt}</h2>
                            <h4 className="Msg-sender">From {msg.senderNick}</h4>
                        </div>
                    )
                })
            }
            <div ref={el => el?.scrollIntoView()} />
        </div>
    )
}