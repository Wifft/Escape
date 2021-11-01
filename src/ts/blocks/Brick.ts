import { Vector2, Vector4 } from "@math.gl/core";

import Block from "./Block";

export default class Brick extends Block
{
    public constructor(pos : Vector2, size : Vector2)
    {  
        const color = new Vector4(189.0, 195.0, 199.0, 255.0);

        super(pos, size, color);
    }
}