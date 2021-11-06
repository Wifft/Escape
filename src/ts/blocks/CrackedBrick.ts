import { Vector2 } from "@math.gl/core";
import C2D from "../helpers/C2D";

import Brick from "./Brick";

export default class CrackedBrick extends Brick
{
    public constructor(pos : Vector2, variant : number = 0)
    {
        super(pos, variant);
    }

    public override render(context : C2D) : void
    {
        switch (this.variant) {
            case 0:
                this.sPos = new Vector2(64.0, 0.0);
                break;
            case 1:
                this.sPos = new Vector2(96.0, 0.0);
                break;
        }

        C2D.drawImage(context, this.img, this.sPos, this.sSize.clone().sub(new Vector2(1.0, 0.0)), this.pos, this.size);;
    }
}