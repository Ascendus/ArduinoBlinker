import { Board } from "./lib/board";

const board: Board = new Board({
    listenerHandler: {
        directory: `${process.cwd()}/listeners`
    }    
});

board.start();