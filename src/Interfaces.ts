export interface IPlayer {
    id: string,
    nick: string,
    isHost: boolean,
    score: number,
    idx: number
}

export interface IMsg {
    txt: string,
    sender: string,
    senderNick: string
}

export interface IConvo {
    recipiants: string[],
    recipiantsNicks: string[],
    msgs: IMsg[]
}

export interface IRoom {
    players: IPlayer[],
    code: string,
    slotsLeft: number,
    conversations: IConvo[],
    started: boolean,
    round: number,
    maxRounds: number,
    stage: string,
    countdownTimer: any,
    countdown: number,
    showcaseConvo: IConvo,
    matches: {
        [key: string]: {
            id: string,
            nick: string,
            idx: number
        }
    },
    matchOutcomes: [{
        players: IPlayer[],
        outcome: string
    }],
    leaderBoard: IPlayer[],
    roundNum: number
}