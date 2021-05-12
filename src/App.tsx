import React, { useEffect, useState } from 'react';
import './App.css';
import socketIO from "socket.io-client";
import { Nickname } from "./Nickname";
import { Rooms } from './Rooms';
import { IRoom } from "./Interfaces";
import { Main } from "./Main";

const ENDPOINT: string = "http://localhost:5000";
const socket = socketIO(ENDPOINT);

function App() {
  const [nicked, setNicked] = useState<boolean>(false);
  const [roomInfo, setRoomInfo] = useState<IRoom | null>();

  useEffect(() => {
    socket.on("RoomInfo", (data: IRoom) => {
      setRoomInfo(data);
    })
  },[])

  return (
    <div className="App">
      <h1>Curious Dating</h1>
      {
        roomInfo 
        ? <Main roomInfo={roomInfo} socket={socket} />
        : nicked
          ? <Rooms socket={socket} />
          : <Nickname socket={socket} setNicked={setNicked} />
      }
    </div>
  );
}

export default App;
