import { Vector2 } from "@math.gl/core";

import C2D from "../helpers/C2D";

import Level from "../Level";

import Ground from "./Ground";

export default class CrackedGround extends Ground
{
    public constructor(level : Level, pos : Vector2, variant : number = 0)
    {
        super(level, pos, variant);
    }

    public override render() : void
    {
        switch (this.variant) {
            case 0:
                this.sPos = new Vector2(80.0, 0.0);
            
                break;
            case 1:
                this.sPos = new Vector2(112.0, 0.0);
            
                break;
            case 2:
                this.sPos = new Vector2(144.0, 0.0);
            
                break;
        }

        C2D.drawImage(this.level.context, this.img, this.sPos, this.sSize, this.pos, this.size);
    }
}