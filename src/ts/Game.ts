import C2D from "./helpers/C2D";

import Runnable from "./interfaces/Runnable";

import Canvas from "./controllers/Canvas";

import GameScreen from "./screens/GameScreen";
import DeathScreen from "./screens/DeathScreen";

class Game extends Canvas implements Runnable {
    private context : C2D;

    private lastTime : number = new Date().getTime();
    private unprocessedFrames : number  = 0.0;

    private gameScreen : GameScreen;

    public constructor(width : number, height : number) {
        super(width, height);

        this.width = width;       
        this.height = height;

        this.context = this.getInstance();
        
        this.gameScreen = new GameScreen(this.context);

        this.run();
    }

    public run() : void
    {
        C2D.disableImageSmoothing(this.context);

        this.gameScreen.init();

        window.requestAnimationFrame(() : void => this.tick());
    }

    public tick() : void
    {
        C2D.clearRect(this.context, this.width, this.height);

        const now : number = new Date().getTime();

        this.unprocessedFrames += (now - this.lastTime) * 60 * 1000; //60 fps

        if (this.unprocessedFrames > 10.0) this.unprocessedFrames = 10.0;
        while (this.unprocessedFrames > 1.0) {
            this.gameScreen.tick();

            this.unprocessedFrames--;
        }

        this.render();

        if (!this.gameScreen.playerDead) window.requestAnimationFrame(() : void => this.tick());
        if (this.gameScreen.playerDead) new DeathScreen(this.context).render();
    }

    private render() : void
    {
        this.gameScreen.render();
    }
}

new Game(800, 480);