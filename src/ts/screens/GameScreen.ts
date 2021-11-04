import { Vector2 } from "@math.gl/core";

import C2D from "../helpers/C2D";

import Player from "../entities/Player";

import Level from "../Level";

import Screen from "./Screen";

export default class GameScreen extends Screen {
    public static readonly SCALE : number = 32.0;
    
    public playerDead : boolean = false;
    
    private level : Level;
    private player : Player|null = null;

    public constructor(context : C2D)
    {
        super(context);

        this.level = new Level(context);
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
        if (player.alive) player.tick();
        else player.pos.y += 4.0, this.playerDead = true
    }

    public override render() : void
    {
        this.level.render();
    }

    private summonPlayer() : Player
    {
        const sPos = new Vector2();
        const sSize = new Vector2();
        
        const pos : Vector2 = new Vector2(384.0, 128.0);
        const size : Vector2 = new Vector2(GameScreen.SCALE, GameScreen.SCALE + (GameScreen.SCALE / 2));
        
        return new Player(this.level, sPos, sSize, pos, size);
    }
}