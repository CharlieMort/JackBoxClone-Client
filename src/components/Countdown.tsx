import React, { useEffect, useState } from "react";
import { IRoom } from "../Interfaces";

interface Props {
    startTime: number,
    roomInfo: IRoom
}

export const Countdown: React.FC<Props> = ({startTime, roomInfo}) => {
    const [countdown, setCountdown] = useState<number>(startTime);
    const [countdownInterval, setCountdownInterval] = useState<null | NodeJS.Timeout>(null);

    useEffect(() => {
        if (roomInfo.stage === "game" && countdownInterval === null) {
            setCountdownInterval(setInterval(() => {
                console.log("aight");
                setCountdown(prevCount => prevCount ?  prevCount - 1 : 0);
            }, 1000))
        }
        if (roomInfo.stage === "showcase" && countdownInterval !== null) {
            clearInterval(countdownInterval);
            setCountdownInterval(null);
        }
        return () => {
            if (countdownInterval !== null) {
                clearInterval(countdownInterval);
                setCountdownInterval(null);
            }
        }
    }, [roomInfo, countdownInterval]);

    return(
        <div>
            <h1>{countdown}s Left</h1>
        </div>
    )
}