import { Board, Led } from "johnny-five";
import { Listener } from "../lib/Listener";

export default class ConnectListener extends Listener {
    public constructor(board: Board) {
        super(board, {
            callback: (): void => {
                const led: Led = new Led(13);

                board.repl.inject({
                    led: led
                });

                setInterval((): void => {
                    led.blink();
                }, 1000);
            },
            event: "connect"
        });
    }
}