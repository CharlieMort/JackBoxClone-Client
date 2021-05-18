import React, { useState } from "react";

interface Props {
    socket: SocketIOClient.Socket
}

export const JoinRoom: React.FC<Props> = ({socket}) => {
    const [roomCode, setRoomCode] = useState("");

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRoomCode(e.target.value);
    }

    const JoinRoom = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit("JoinRoom", roomCode);
    }

    return(
        <div>
            <form onSubmit={JoinRoom}>
                <input type="text" placeholder="Enter Room Code..." onChange={onChange} value={roomCode} autoFocus={true} />
                <input type="submit" value="Join Room" />
            </form>
        </div>
    )
}