import Bitmap from "./Bitmap";
import CanvasController from "./controllers/CanvasController";
import C2D from "./helpers/C2D";
import Runnable from "./interfaces/Runnable";
import Level from "./Level";

class Game extends CanvasController implements Runnable {
    private level : Level;
    private context : C2D;

    public constructor(width : number, height : number) {
        super(width, height);

        this.width = width;       
        this.height = height;

        this.context = this.getCanvasInstance();

        this.level = new Level(this.context);

        this.run();
    }

    public run() : void
    {
        this.init();

        window.requestAnimationFrame(() : void => this.render());
    }

    private init() : void
    {
        C2D.disableImageSmoothing(this.context);

        this.level.init();
    }

    private render() : void
    {
        this.level.render();

        window.requestAnimationFrame(() : void => this.render());
    }
}

new Game(800, 400);