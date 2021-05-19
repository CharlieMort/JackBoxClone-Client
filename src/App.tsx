import React, { useEffect, useState } from 'react';
import './App.css';
import socketIO from "socket.io-client";
import { IRoom } from "./Interfaces";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import { HostScreen } from './components/HostScreen';
import { JoinOptions } from './components/JoinOptions';
import { PlayerScreen } from './components/PlayerScreen';
import alien from "./sprites/alien.png";
import bear from "./sprites/bear.png";
import brain from "./sprites/brain.png";
import bruh from "./sprites/bruh.png";
import grimreaper from "./sprites/grimreaper.png";
import vampire from "./sprites/vampire.png";

const ENDPOINT: string = "http://localhost:5000";
const socket = socketIO(ENDPOINT); // Remember to remove when buidling

const App: React.FC = () => {
  const [icons] = useState([alien, bear, brain, bruh, grimreaper, vampire]);
  const [roomInfo, setRoomInfo] = useState<IRoom>();

  useEffect(() => {
    socket.on("RoomInfo", (data: IRoom) => {
      console.log(data);
      setRoomInfo(data);
    })
  },[])

  return (
    <div className="App">
      <h1>Liam uwu</h1> 
      <Router>
        <Switch>
          <Route path="/" exact>
            <JoinOptions socket={socket} roomInfo={roomInfo} />
          </Route>
          <Route path="/game">
            <PlayerScreen socket={socket} roomInfo={roomInfo} icons={icons} />
          </Route>
          {
            !roomInfo && <Redirect to="/" />
          }
          <Route path="/host">
            {
              roomInfo && <HostScreen socket={socket} roomInfo={roomInfo} icons={icons} />
            }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
