export interface IPlayer {
    id: string,
    nick: string,
    isHost: boolean
}

export interface IMsg {
    txt: string,
    sender: string,
    senderNick: string
}

export interface IConvo {
    recipiants: string[],
    msgs: IMsg[]
}

export interface IRoom {
    players: IPlayer[],
    code: string,
    slotsLeft: number,
    conversations: IConvo[],
    started: boolean
}