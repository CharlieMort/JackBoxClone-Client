import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { IRoom } from "../Interfaces";

interface Props {
    socket: SocketIOClient.Socket,
    roomInfo: IRoom | undefined
}

export const JoinOptions: React.FC<Props> = ({socket, roomInfo}) => {
    const history = useHistory();
    const [choice, setChoice] = useState<string>();

    useEffect(() => {
        console.log(choice);
        if (choice === "host") {
            history.push("/host");
        }
    }, [roomInfo])

    const JoinRoom = () => {
        history.push("/game");
    }

    const CreateRoom = () => {
        socket.emit("CreateRoom");
        setChoice("host");
    }

    return(
        <div>
            <input type="button" value="Join Room" onClick={JoinRoom} />
            <input type="button" value="Host Room" onClick={CreateRoom} />
        </div>
    )
}