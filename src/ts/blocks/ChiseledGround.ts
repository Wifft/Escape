import { Vector2 } from "@math.gl/core";

import Ground from "./Ground";

export default class ChiseledGround extends Ground
{
    public constructor(pos : Vector2, variant : number = 0)
    {
        super(pos, variant);
    }
}