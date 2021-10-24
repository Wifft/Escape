import { Vector2, Vector4 } from "@math.gl/core";
import C2D from "../helpers/C2D";
import Renderable from "../interfaces/Renderable";

export default class Ground implements Renderable
{
    public pos : Vector2    
    public size : Vector2
    public color : Vector4

    public constructor(pos : Vector2, size : Vector2, color : Vector4) {
        this.pos = pos;
        this.size = size;
        this.color = color;
    }

    public render(context : C2D) : void
    {        
        C2D.renderRect(context, this.pos, this.size, this.color);
    }
}