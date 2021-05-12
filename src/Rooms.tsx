import React, { useState } from "react";

interface Props {
    socket: SocketIOClient.Socket
}

export const Rooms: React.FC<Props> = ({socket}) => {
    const [roomCode, setRoomCode] = useState<string>("");

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setRoomCode(e.target.value);
    }

    const JoinRoom = () => {
        socket.emit("JoinRoom", roomCode);
    }

    const CreateRoom = () => {
        socket.emit("CreateRoom");
    }

    return(
        <div>
            <input type="text" placeholder="Enter Room Code..." onChange={onChange} value={roomCode} />
            <input type="button" value="Join Room" onClick={JoinRoom} />
            <input type="button" value="Create Room" onClick={CreateRoom} />
        </div>
    )
}