import { Vector2 } from "@math.gl/core";
import MathHelper from "../helpers/MathHelper";

import Level from "../Level";
import Bullet from "./Bullet";

import Enemy from "./Enemy";
import Player from "./Player";

export default class Entrenched extends Enemy
{
    public direction : number = 0;

    public shooting : boolean = false;

    public sPosA : Vector2;

    public constructor(level : Level, sPos : Vector2, pos : Vector2)
    {
        super(level, sPos, pos);

        this.sPosA = this.sPos.clone();
    }

    public override render() : void
    {
        this.tick();
    
        const player : Player = this.level.getPlayer();
        if (player.pos.x < this.pos.x) this.direction = 0;
        else if (player.pos.x > this.pos.x) this.direction = 1;

        if (this.direction === 0) this.sPos.x = !this.shooting ? 16 * 8 : 16 * 9; 
        else if (this.direction === 1) this.sPos.x = this.shooting ? 16 * 10 : 16 * 11;

        super.render();
    }

    protected override tick() : void
    {
        
        if (!this.shooting && MathHelper.randomRange(0, 1000) < 5) this.tryShoot();
        else if (this.shooting && MathHelper.randomRange(0, 100) < 3) this.shooting = false;

        super.tick();
    }

    private tryShoot() : void
    {
        this.shooting = true;

        this.level.add(new Bullet(this.level, this.pos.clone().sub(new Vector2(0.0, 8.0)), 0.60, this.direction, this));
    }
}