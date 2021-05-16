import React from "react";
import { v4 } from "uuid";
import { IConvo } from "../Interfaces";

interface Props {
    conversation: IConvo,
    id: string
}

export const Msgs: React.FC<Props> = ({conversation, id}) => {
    return(
        <div className="Conversation">
            {
                conversation.msgs.map((msg) => {
                    return(
                        <div className={`Msg ${id === msg.sender ? "mine" : "theirs"}`} key={v4()}>
                            <h2 className="Msg-txt">{msg.txt}</h2>
                            <h4 className="Msg-sender">From {msg.senderNick}</h4>
                        </div>
                    )
                })
            }
        </div>
    );
}