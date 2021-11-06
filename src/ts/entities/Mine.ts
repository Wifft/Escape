import { Vector2 } from "@math.gl/core";

import Level from "../Level";

import Enemy from "./Enemy";

export default class Mine extends Enemy
{
    public direction : number;

    public constructor(level : Level, sPos : Vector2, pos : Vector2, size : Vector2, direction : number)
    {
        super(level, sPos, pos, size);

        this.direction = direction;
    }
}