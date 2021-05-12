import React from "react";
import { Link } from "react-router-dom";
import { IPlayer } from "./Interfaces";
import alien from "./sprites/alien.png";

interface Props {
    player: IPlayer,
    idx: number,
    id: string,
    alert: boolean
}

export const PlayerButton: React.FC<Props> = ({player, idx, id, alert}) => {
    return(
        <div>
            <button>
                <img src={alien}></img>
                <h2>Msg {player.nick}</h2>
                {
                    alert && <h2> | Btw New Msg | </h2>
                }
            </button>
        </div>
    )
}