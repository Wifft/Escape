import { Vector2 } from "@math.gl/core";

import Level from "../Level";

import Brick from "./Brick";

export default class ChiseledBrick extends Brick
{
    public constructor(level : Level, pos : Vector2, variant : number = 0)
    {
        super(level, pos, variant);
    }
}