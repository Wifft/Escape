import { Vector2 } from "@math.gl/core";

import Brick from "./Brick";

export default class ChiseledBrick extends Brick
{
    public constructor(pos : Vector2, variant : number = 0)
    {
        super(pos, variant);
    }
}