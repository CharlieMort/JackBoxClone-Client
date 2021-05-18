import React, { useState } from "react";

interface Props {
    socket: SocketIOClient.Socket,
    setNicked: React.Dispatch<React.SetStateAction<boolean>>
}

export const Nickname: React.FC<Props> = ({socket, setNicked}) => {
    const [nick, setNick] = useState<string>("");

    const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNick(e.target.value);
    }

    const Submit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit("CreateNickname", nick);
        setNicked(true);
    }

    return(
        <div>
            <h3>Enter Nickname</h3>
            <form onSubmit={Submit}>
                <input type="text" placeholder="Enter Nickname Here..." onChange={OnChange} value={nick} autoFocus={true} />
                <input type="button" value="submit" />
            </form>
        </div>
    )
}