import C2D from "./helpers/C2D";

import Runnable from "./interfaces/Runnable";

import Canvas from "./controllers/Canvas";

import GameScreen from "./screens/GameScreen";

class Game extends Canvas implements Runnable {
    private static readonly MAX_FPS = 60.0;
    
    private context : C2D;

    private then : number = performance.now();

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

        this.lockMousePointer();

        window.requestAnimationFrame((time : number) : void => this.tick(time));
    }

    public tick(now : number) : void
    {
        C2D.clearRect(this.context, this.width, this.height);

        const interval : number = 1000 / Game.MAX_FPS;
        const tolerance : number = 0.1;
        
        const delta : number = now - this.then;

        if (delta >= interval - tolerance) {
            this.then = now - (delta % interval);

            this.gameScreen.tick();
            
            this.render();
        }
        
        if (!this.gameScreen.playerDead) window.requestAnimationFrame((time : number) : void => this.tick(time));
    }

    private render() : void
    {
        this.gameScreen.render();
    }
}

new Game(800, 512);