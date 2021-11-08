import { Vector2 } from "@math.gl/core";

import Collider from "../phys/Collider";

import Level from "../Level";

import Entity from "./Entity";
import Player from "./Player";

export default abstract class Enemy extends Entity
{
    public abstract override direction : number;

    protected speed? : number;

    public moving : boolean = false;

    public constructor(level : Level, sPos : Vector2, pos : Vector2)
    {        
        super(level, sPos, pos);
    }

    protected tick() : void
    {
        if (this.health <= 0) this.level.remove(this);
        
        this.hurtsPlayer();
    }

    protected updateDirection() : void
    {
        const colFace : string = super.getCollisionFace() as string;

        if (colFace === "l") this.direction = 0, this.moving = false;
        else if (colFace === "r") this.direction = 1, this.moving = false;
        else if (colFace === "b") this.direction = 2, this.moving = false;
        else if (colFace === "t") this.direction = 3, this.moving = false;
    }

    protected hurtsPlayer() : void
    {
        const player : Player = this.level.getPlayer();

        if (Collider.intersects(player, this as any)) player.getDamage();
    }

    protected tryMove() : void
    {
        this.updateDirection();

        if (this.direction === 0) this.pos.x -= this.speed as number;
        else if (this.direction === 1) this.pos.x += this.speed as number;
        else if (this.direction === 2) this.pos.y -= this.speed as number;
        else if (this.direction === 3) this.pos.y += this.speed as number;
    }
}