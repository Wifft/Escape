import { Vector2 } from "@math.gl/core";

import Level from "../Level";
import Collider from "../phys/Collider";

import Entity from "./Entity";
import Player from "./Player";

export default abstract class Enemy extends Entity
{
    public abstract override direction : number;

    public constructor(level : Level, sPos : Vector2, pos : Vector2, size : Vector2)
    {
        const sSize : Vector2 = size.clone().divideScalar(2.0);
        
        super(level, sPos, sSize, pos, size);
    }

    protected tick() : void
    {
        this.hurtsPlayer();
    }

    protected updateDirection() : void
    {
        const colFace : string = super.getCollisionFace() as string;

        if (colFace === "l") this.direction = 0;
        else if (colFace === "r") this.direction = 1;
    }

    protected hurtsPlayer() : void
    {
        for (const renderable of this.level.getAllRenderables()) {
            if (renderable instanceof Player && Collider.intersects(this, renderable as any)) renderable.alive = false;
        }
    } 
}