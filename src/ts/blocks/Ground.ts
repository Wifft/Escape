import { Vector2  } from "@math.gl/core";
import C2D from "../helpers/C2D";

import Block from "./Block";

export default class Ground extends Block
{
    public sPos = new Vector2(16.0, 0.0);
    
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
                this.sPos = new Vector2(16.0, 0.0);
                
                break;
            case 1:
                this.sPos = new Vector2(48.0, 0.0);

                break;
        }

        super.render(context);
    }
}