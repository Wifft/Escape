import { Vector2 } from "@math.gl/core";

import Level from "../Level";

import Block from "./Block";

export default class Brick extends Block
{
    public sPos : Vector2 = new Vector2(0.0, 0.0);
    
    protected variant : number;

    public constructor(level : Level, pos : Vector2, variant = 0)
    {  
        super(level, pos);

        this.variant = variant;
    }

    public override render() : void
    {
        switch (this.variant) {
            case 0:
                this.sPos = new Vector2(0.0, 0.0);
                break;
            case 1:
                this.sPos = new Vector2(32.0, 0.0);
                break;
        }

        super.render();
    }
}