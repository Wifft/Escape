import { Vector2 } from "@math.gl/core";

import Level from "../Level";

import Entity from "./Entity";

export default class Enemy extends Entity
{
    public constructor(level : Level, sPos : Vector2, sSize : Vector2, pos : Vector2, size : Vector2)
    {
        super(level, sPos, sSize, pos, size);
    }

    public tick() : void
    {
        if (!super.intersects()) {
            if (this.direction = 0) this.pos.x--;
            else if (this.direction = 1) this.pos.x++;
        }

        if (this.direction = 0) this.direction = 1;
        else if (this.direction = 1) this.direction = 0;
    }
}