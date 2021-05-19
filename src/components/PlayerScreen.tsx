import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { v4 } from "uuid";
import { Game } from "./Game";
import { IRoom } from "../Interfaces";
import { JoinRoom } from "./JoinRoom";
import { Nickname } from "./Nickname";
import { MsgWindow } from "./MsgWindow";
import { Matches } from "./Matches";
import { PickMatch } from "./PickMatch";

interface Props {
    socket: SocketIOClient.Socket,
    roomInfo: IRoom | undefined,
    icons: string[]
}

export const PlayerScreen: React.FC<Props> = ({socket, roomInfo, icons}) => {
    const [nicked, setNicked] = useState<boolean>(false);

    if (!nicked) return <Nickname socket={socket} setNicked={setNicked} />
    if (!roomInfo) return <JoinRoom socket={socket} />

    return(
        <div>
            <Router>
                <Switch>
                    <Route path="/game" exact>
                        {
                            roomInfo.started
                                ? roomInfo.stage === "game" 
                                    ? <Game roomInfo={roomInfo} socket={socket} icons={icons} />
                                    : roomInfo.stage === "matches"
                                        ? <PickMatch icons={icons} roomInfo={roomInfo} socket={socket} />
                                        : roomInfo.stage === "match_showcase"
                                            ? <h1>Did Your Match Pick You Back???</h1>
                                            : <h1>Look at host screen... Im gonna leek your dms</h1>
                                : <h1>You Joined But The Game Hasnt Started Yet</h1>
                        }
                    </Route>
                    {
                        roomInfo.players.map((player, idx) => {
                            return (
                                <Route path={`/game/${idx}`} key={v4()}>
                                    {   
                                    roomInfo.stage === "game" 
                                        ? <MsgWindow icons={icons} idx={idx} player={player} roomInfo={roomInfo} socket={socket} />
                                        : <Redirect to="/game" />
                                    }
                                </Route>
                            )
                        })
                    }
                </Switch>
            </Router>
        </div>
    )
}