import { Vector2 } from "@math.gl/core";

import Level from "../Level";

import Block from "./Block";

export default class Gear extends Block
{
    protected variant : number = 0;

    public sPos : Vector2 = new Vector2(0.0, 16.0); 

    public constructor(level : Level, pos : Vector2)
    {
        super(level, pos);
    }
}