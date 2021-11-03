import { Vector2  } from "@math.gl/core";

import Block from "./Block";

export default class Ground extends Block
{
    public override sPos = new Vector2(32.0, 0.0);

    public constructor(pos : Vector2)
    {  
        super(pos);
    }
}