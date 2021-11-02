import { Vector2, Vector4 } from "@math.gl/core";

import C2D from "../helpers/C2D";

import Player from "../entities/Player";

import Level from "../Level";

export default class GameScreen {
    public static readonly SCALE : number = 32.0;

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

        this.player = this.summonPlayer(); 

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

    private summonPlayer() : Player
    {
        const sPos = new Vector2();
        const sSize = new Vector2();
        
        const pos : Vector2 = new Vector2(Level.OFFSET, this.canvas.height - (Level.OFFSET * 2));
        const size : Vector2 = new Vector2(GameScreen.SCALE, GameScreen.SCALE + (GameScreen.SCALE / 2));
        
        const color : Vector4 = new Vector4(255.0, 255.0, 0.0, 255.0);

        return new Player(this.level, sPos, sSize, pos, size, color);
    }
}