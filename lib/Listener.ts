import { Board } from "johnny-five";

export type ListenerEvent = "connect" | "ready";

export interface ListenerOptions {
    callback: () => void;
    event: ListenerEvent;
}

export class Listener {
    public board: Board;
    public callback: () => void;
    public event: ListenerEvent;

    public constructor(board: Board, options: ListenerOptions) {
        this.board = board;
        this.callback = options.callback;
        this.event = options.event;
    }
}