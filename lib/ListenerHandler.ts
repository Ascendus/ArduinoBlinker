import { Board } from "johnny-five";
import { Collection } from "@discordjs/collection";
import { EventEmitter } from "stream";
import { Listener } from "./Listener";

import { readdirSync } from "fs";

declare module "stream" {
    class EventEmitter {
        public constructor(options: EventEmitterOptions);
        public emit(eventName: ListenerHandlerEvent | symbol, ...args: any[]): boolean
        public addListener(eventName: ListenerHandlerEvent | symbol, listener: (...args: any[]) => void): this;
        public removeListener(eventName: ListenerHandlerEvent | symbol, listener: (...args: any[]) => void): this;
        public removeAllListeners(event?: ListenerHandlerEvent | symbol): this;
        public on(eventName: ListenerHandlerEvent | symbol, listener: (...args: any[]) => void): this;
        public once(eventName: ListenerHandlerEvent | symbol, listener: (...args: any[]) => void): this;
        public off(eventName: ListenerHandlerEvent | symbol, listener: (...args: any[]) => void): this;
        public eventNames(): (ListenerHandlerEvent | symbol)[];
        public getMaxListeners(): number;
        public listenerCount(eventName: ListenerHandlerEvent | symbol): number;
        public listeners(eventName: ListenerHandlerEvent | symbol): Function[];
        public prependListener(eventName: ListenerHandlerEvent | symbol, listener: (...args: any[]) => void): this;
        public prependOnceListener(eventName: ListenerHandlerEvent | symbol, listener: (...args: any[]) => void): this;
        public rawListeners(eventName: ListenerHandlerEvent | symbol): Function[];
        public setMaxListeners(n: number): this;
    }

    interface EventEmitterOptions {
        /**
         * Enables automatic capturing of promise rejection.
         */
        captureRejections?: boolean | undefined;
    }
}

export type ListenerHandlerEvent = "register" | "load";

export interface ListenerHandlerOptions {
    directory: string;
}

export class ListenerHandler extends EventEmitter {
    public board: Board;
    public directory: string;
    public setListeners: Collection<string, Listener>;

    public constructor(board: Board, options: ListenerHandlerOptions) {
        super({ captureRejections: true });
        this.board = board;
        this.directory = options.directory;
        this.setListeners = new Collection();

        this.addListener("load", (listener: Listener): boolean => process.stdout.write(`${new Date().toLocaleTimeString()} | [ Listener Handler ] Loaded ${listener.event}`));
        this.addListener("register", (listener: Listener): boolean => process.stdout.write(`${new Date().toLocaleTimeString()} | [ Listener Handler ] Registered ${listener.event}`));
    }

    public register(listener: Listener): void {
        this.setListeners.set(listener.event, listener);
        this.emit("register", listener);
    }

    public load(): void {
        const directory: string[] = readdirSync(this.directory).filter((file: string) => file.endsWith(".ts"));
        directory.forEach((listenerFile: string): void => {
            const listenerPath = `${this.directory}/${listenerFile}`;
            const ListenerModule: typeof Listener = (require(listenerPath) as { default: typeof Listener }).default;

            if (!(ListenerModule.constructor instanceof Listener)) return;

            const listener: Listener = new ListenerModule(this.board, {
                callback: ListenerModule.prototype.callback,
                event: ListenerModule.prototype.event
            });

            this.register(listener);
            this.emit("load", listener);
        });
    }

    public start(): void {
        this.load();
        this.setListeners.forEach((listener: Listener): void => {
            switch (listener.event) {
                case "connect": this.board.on("connect", listener.callback); break;
                case "ready": this.board.on("ready", listener.callback); break;
            }
        });
    }
}