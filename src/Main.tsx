import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Game } from "./Game";
import { IRoom } from "./Interfaces";
import { Lobby } from "./Lobby";
import { Player } from "./Player";
import alien from "./sprites/alien.png";
import bear from "./sprites/bear.png";
import brain from "./sprites/brain.png";
import bruh from "./sprites/bruh.png";
import grimreaper from "./sprites/grimreaper.png";
import vampire from "./sprites/vampire.png";
import { v4 } from "uuid";
import { Messages } from "./Messages";

interface Props {
    roomInfo: IRoom,
    socket: SocketIOClient.Socket
}

export const Main: React.FC<Props> = ({roomInfo, socket}) => {
    const [icons] = useState([alien, bear, brain, bruh, grimreaper, vampire]);
    const [countdown, setCountdown] = useState(120);
    const [countdownInterval, setCountdownInterval] = useState<null | NodeJS.Timeout>(null);

    useEffect(() => {
        if (roomInfo.stage === "game" && countdownInterval === null) {
            setCountdownInterval(setInterval(() => {
                console.log("aight");
                setCountdown(prevCount => prevCount - 1);
            }, 1000))
        }
        if (roomInfo.stage === "showcase" && countdownInterval !== null) {
            clearInterval(countdownInterval);
            setCountdownInterval(null);
        }
    }, [roomInfo]);

    return(
        <div>
            {
                countdownInterval ? <h1>Countdown: {countdown}s Left!!</h1> : <></>
            }
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <h2>Player Slots Remaining: {roomInfo.slotsLeft}</h2>
                        <h1>Room Code: {roomInfo.code}</h1>
                        {
                            roomInfo.started
                            ? <Game roomInfo={roomInfo} socket={socket} icons={icons} />
                            : <Lobby roomInfo={roomInfo} icons={icons} socket={socket} />
                        }
                    </Route>
                    {
                        roomInfo.players.map((player, idx) => {
                            return (
                                <Route path={`/${idx}`} key={v4()}>
                                    <Messages icons={icons} idx={idx} player={player} roomInfo={roomInfo} socket={socket} />
                                </Route>
                            )
                        })
                    }
                </Switch>
            </Router>
        </div>
    )
}