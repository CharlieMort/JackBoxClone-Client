import React from "react";
import { IConvo } from "./Interfaces";

interface Props {
    conversation: IConvo,
    id: string
}

export const Conversation: React.FC<Props> = ({conversation, id}) => {
    return(
        <div className="Conversation">
            {
                conversation.msgs.map((msg) => {
                    return(
                        <div className={`Msg ${id === msg.sender ? "mine" : "theirs"}`}>
                            <h2 className="Msg-txt">{msg.txt}</h2>
                            <h4 className="Msg-sender">From {msg.senderNick}</h4>
                        </div>
                    )
                })
            }
        </div>
    );
}