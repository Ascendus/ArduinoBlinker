import { Board as BaseBoard, BoardOption } from "johnny-five";
import { ListenerHandler, ListenerHandlerOptions } from "./ListenerHandler";

export type BoardOptions = BoardOption & {
    listenerHandler: ListenerHandlerOptions
}

export class Board extends BaseBoard {
    public listenerHandler: ListenerHandler;

    public constructor(options: BoardOptions) {
        super(options as Omit<BoardOptions, "directory"> || undefined);
        this.listenerHandler = new ListenerHandler(this, options.listenerHandler);
    }

    public start(): void {
        this.listenerHandler.start();
    }
}