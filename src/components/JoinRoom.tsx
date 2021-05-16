import React, { useState } from "react";

interface Props {
    socket: SocketIOClient.Socket
}

export const JoinRoom: React.FC<Props> = ({socket}) => {
    const [roomCode, setRoomCode] = useState("");

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRoomCode(e.target.value);
    }

    const JoinRoom = () => {
        socket.emit("JoinRoom", roomCode);
    }

    return(
        <div>
            <input type="text" placeholder="Enter Room Code..." onChange={onChange} value={roomCode} />
            <input type="button" value="Join Room" onClick={JoinRoom} />
        </div>
    )
}