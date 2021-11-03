import { Vector2 } from "@math.gl/core";

import Block from "./Block";

export default class Brick extends Block
{
    public override sPos = new Vector2(0.0, 0.0);

    public constructor(pos : Vector2, variant : number)
    {  
        super(pos);

        if (variant === 1) this.sPos = new Vector2(48.0, 0.0);
    }
}