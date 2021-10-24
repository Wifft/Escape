import { Vector2, Vector4 } from "@math.gl/core";
import C2D from "../helpers/C2D";
import MathHelper from "../helpers/MathHelper";

export default class Brick
{
    public pos : Vector2;
    public size : Vector2;
    public color : Vector4;

    public hexColor : number;

    public constructor(pos : Vector2, size : Vector2, color : Vector4) {
        this.pos = pos;
        this.size = size;
        this.color = color;
        this.hexColor = MathHelper.rgba2Hex(color);
    }

    public render(context : C2D) : void
    {        
        C2D.renderRect(context, this.pos, this.size, this.color);
    }
}