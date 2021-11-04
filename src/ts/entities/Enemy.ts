import { Vector2 } from "@math.gl/core";

import Level from "../Level";

import Entity from "./Entity";

export default abstract class Enemy extends Entity
{
    public abstract direction : number;

    public constructor(level : Level, sPos : Vector2, sSize : Vector2, pos : Vector2, size : Vector2)
    {
        super(level, sPos, sSize, pos, size);
    }

    protected updateDirection() : void
    {
        if (super.getCollisionFace() === "l") this.direction = 0;
        else if (super.getCollisionFace() === "r") this.direction = 1;
    }
}