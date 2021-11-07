import { Vector2 } from "@math.gl/core";

import Level from "../Level";

import Ground from "./Ground";

export default class ChiseledGround extends Ground
{
    public constructor(level : Level, pos : Vector2, variant : number = 0)
    {
        super(level, pos, variant);
    }
}