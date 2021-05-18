import React, { useEffect, useState } from "react";
import { IRoom } from "../Interfaces";

interface Props {
    startTime: number,
    roomInfo: IRoom,
    stage: string,
    nextStage: string
}

export const Countdown: React.FC<Props> = ({startTime, roomInfo, stage, nextStage}) => {
    const [countdown, setCountdown] = useState<number>(startTime);
    const [countdownInterval, setCountdownInterval] = useState<null | NodeJS.Timeout>(null);

    useEffect(() => {
        if (roomInfo.stage === stage && countdownInterval === null) {
            setCountdownInterval(setInterval(() => {
                setCountdown(prevCount => prevCount ?  prevCount - 1 : 0);
            }, 1000))
        }
        if (roomInfo.stage === nextStage && countdownInterval !== null) {
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