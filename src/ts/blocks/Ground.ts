import { Vector2  } from "@math.gl/core";

import Level from "../Level";

import Block from "./Block";

export default class Ground extends Block
{
    public sPos = new Vector2(16.0, 0.0);
    
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
                this.sPos = new Vector2(16.0, 0.0);
                
                break;
            case 1:
                this.sPos = new Vector2(48.0, 0.0);

                break;
        }

        super.render();
    }
}