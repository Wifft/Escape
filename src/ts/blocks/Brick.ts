import { Vector2, Vector4 } from "@math.gl/core";
import Collidable from "../interfaces/Collidable";

import Block from "./Block";

export default class Brick extends Block implements Collidable
{
    public radius : number;
    public colVec : Vector2;

    public constructor(pos : Vector2, size : Vector2)
    {  
        const color = new Vector4(189.0, 195.0, 199.0, 255.0);

        super(pos, size, color);

        this.radius = this.size.x + this.size.y
        this.colVec = new Vector2(this.pos.x, this.pos.y);
    }
}