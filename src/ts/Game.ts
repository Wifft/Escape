import Runnable from "./interfaces/Runnable";

import CanvasController from "./controllers/CanvasController";

import C2D from "./helpers/C2D";

import Level from "./Level";
import Player from "./entities/Player";
import { Vector2, Vector4 } from "@math.gl/core";

class Game extends CanvasController implements Runnable {
    private context : C2D;
    private level : Level;
    private player : Player;

    private lastTime : number = new Date().getTime();
    private unprocessedFrames : number  = 0.0;

    public constructor(width : number, height : number) {
        super(width, height);

        this.width = width;       
        this.height = height;

        this.context = this.getCanvasInstance();

        this.level = new Level(this.context);
        this.player = new Player(
            this.level,
            new Vector2(Level.OFFSET, Level.OFFSET),
            new Vector2(16.0, 16.0 * 2),
            new Vector4(255.0, 255.0, 0.0, 255.0)
        );

        this.run();
    }

    public run() : void
    {
        C2D.disableImageSmoothing(this.context);

        this.level.init(this.player);

        window.requestAnimationFrame(() : void => this.tick());
    }

    private tick() : void
    {
        C2D.clearRect(this.context, this.width, this.height);

        const now : number = new Date().getTime();

        this.unprocessedFrames += (now - this.lastTime) * 60 * 1000; //60 fps

        if (this.unprocessedFrames > 10.0) this.unprocessedFrames = 10.0;
        while (this.unprocessedFrames > 1.0) {
            this.player.tick(this.context);

            this.unprocessedFrames--;
        }

        this.render();

        window.requestAnimationFrame(() : void => this.tick());
    }

    private render() : void
    {
        this.level.render();
    }
}

new Game(800, 400);