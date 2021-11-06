import { Vector2 } from "@math.gl/core";
import C2D from "../helpers/C2D";

import Block from "./Block";

export default class Brick extends Block
{
    public sPos : Vector2 = new Vector2(0.0, 0.0);
    
    protected variant : number;

    public constructor(pos : Vector2, variant = 0)
    {  
        super(pos);

        this.variant = variant;
    }

    public override render(context : C2D) : void
    {
        switch (this.variant) {
            case 0:
                this.sPos = new Vector2(0.0, 0.0);
                break;
            case 1:
                this.sPos = new Vector2(32.0, 0.0);
                break;
        }

        super.render(context);
    }
}