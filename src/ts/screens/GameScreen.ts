import { Vector2, Vector4 } from "@math.gl/core";

import C2D from "../helpers/C2D";

import Player from "../entities/Player";

import Level from "../Level";
import SpriteSheet from "../SpriteSheet";

export default class GameScreen {
    private context : C2D;
    
    private level : Level;
    private player : Player|null = null;
    
    private canvas : HTMLCanvasElement;

    public constructor(context : C2D)
    {
        this.context = context;
        this.level = new Level(this.context);
        this.canvas = context.canvas;
    }

    public init() : void
    {
        this.level.init();

        const basePlayerSize : number = 32.0;
        this.player = new Player(
            this.level,
            new Vector2(Level.OFFSET, this.canvas.height - Level.OFFSET - (basePlayerSize * 2)),
            new Vector2(basePlayerSize, basePlayerSize + (basePlayerSize / 2)),
            new Vector4(255.0, 255.0, 0.0, 255.0)
        );

        this.level.add(this.player);
    }   

    public tick() : void
    {
        const player : Player = this.player as Player;
        player.tick();
    }

    public render() : void
    {
        this.level.render();
    }
}