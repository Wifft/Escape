import { Vector2, Vector4 } from "@math.gl/core";
import Game from "../Game";
import C2D from "../helpers/C2D";
import Timer from "../Timer";
import GameScreen from "./GameScreen";

import Screen from "./Screen";

export default class DeathScreen extends Screen {
    private game : Game;
    
    private opacity : number = 0.0;

    public constructor(context : C2D, game : Game)
    {
        super(context);

        this.game = game;
    }

    public override render(gameScreen : GameScreen) : void
    {
        const canvas : HTMLCanvasElement = this.context.canvas;
        this.renderOverlay(canvas);

        window.requestAnimationFrame(() => this.render(gameScreen));
    }

    private renderOverlay(canvas : HTMLCanvasElement) : void
    {

        if (this.opacity <= 1.0) {                    
            C2D.renderRect(
                this.context,
                new Vector2(0.0, 0.0),
                new Vector2(canvas.width, canvas.height),
                new Vector4(0.0, 0.0, 0.0, this.opacity)
            );

            this.opacity += 0.01;
        }

        console.log(this.opacity);

        if (this.opacity >= 1.0) {
            this.game.gameScreen.playerDead = false;

            this.game.gameScreen.level.refresh();
            this.game.tick();
        }
    }
}