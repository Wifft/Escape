import { Vector2 } from "@math.gl/core";
import Block from "./Block";

export default class Gear extends Block
{
    public sPos : Vector2 = new Vector2(0.0, 16.0); 

    public constructor(pos : Vector2)
    {
        super(pos);
    }
}