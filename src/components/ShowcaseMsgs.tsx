import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { IRoom } from "../Interfaces";

interface Props {
    roomInfo: IRoom
}

export const ShowcaseMsgs: React.FC<Props> = ({roomInfo}) => {
    const [msgIdx, setMsgIdx] = useState<number>(0);
    const [msgInterval, setMsgInterval] = useState<null | NodeJS.Timeout>(null);

    useEffect(() => {
        setMsgInterval(setInterval(() => {
            setMsgIdx(prevIdx => prevIdx + 1)
            if (msgIdx > roomInfo.showcaseConvo.msgs.length) {
                if (msgInterval) clearInterval(msgInterval);
            }
        }, 2000))

        return () => {
            if (msgInterval) clearInterval(msgInterval);
        }
    }, []);

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