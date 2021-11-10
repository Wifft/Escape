import { Vector2 } from "@math.gl/core";

import C2D from "../helpers/C2D";

import Player from "../entities/Player";

import Level from "../Level";
import Timer from "../Timer";

import Screen from "./Screen";

export default class GameScreen extends Screen {
    public static readonly SCALE : number = 32.0;
    
    public playerDead : boolean = false;
    
    private level : Level;
    private player : Player|null = null;

    private timer : Timer = new Timer();

    private deathTimeout : number = 1.000;    

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
        const player : Player = this.level.getPlayer() as Player;

        if (!player.alive) {
            this.deathTimeout -= 0.0008; 
            if (this.deathTimeout <= 0)  {
                this.level.refresh();
    
                player.pos = this.level.chunksData[this.level.currentChunk].spawnPoint.clone();
                
                player.alive = true;
                player.health = 25.0;
    
                this.deathTimeout = 1.000;
            }
        }

        if (player.alive) player.tick();
    }

    public override render() : void
    {   
        this.level.render();
        this.timer.render(this.context, this.level.currentChunk === 25);
    }

    private summonPlayer() : Player
    {
        const sPos = new Vector2();
        
        const pos : Vector2 = this.level.chunksData[this.level.currentChunk].spawnPoint.clone();
        
        return new Player(this.level, sPos, pos);
    }
}