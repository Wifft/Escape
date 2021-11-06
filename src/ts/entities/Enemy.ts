import { Vector2 } from "@math.gl/core";

import Level from "../Level";
import Collider from "../phys/Collider";

import Entity from "./Entity";
import Player from "./Player";

export default abstract class Enemy extends Entity
{
    public abstract override direction : number;

    protected speed? : number;

    public moving : boolean = false;

    public constructor(level : Level, sPos : Vector2, pos : Vector2, size : Vector2)
    {        
        super(level, sPos, size.clone().divideScalar(2.0), pos, size);
    }

    protected tick() : void
    {
        this.hurtsPlayer();
    }

    protected updateDirection() : void
    {
        const colFace : string = super.getCollisionFace() as string;

        if (colFace === "l") this.direction = 0, this.moving = false;
        else if (colFace === "r") this.direction = 1, this.moving = false;
    }

    protected hurtsPlayer() : void
    {
        for (const renderable of this.level.getAllRenderables()) {
            if (renderable instanceof Player && Collider.intersects(this, renderable as any)) renderable.alive = false;
        }
    }

    protected tryMove() : void
    {
        this.updateDirection();

        if (this.direction === 0) this.pos.x -= this.speed as number;
        else if (this.direction === 1) this.pos.x += this.speed as number;
    }
}