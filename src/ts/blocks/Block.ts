import { Vector2, Vector4 } from "@math.gl/core";

import C2D from "../helpers/C2D";
import MathHelper from "../helpers/MathHelper";

import Collidable from "../interfaces/Collidable";
import Renderable from "../interfaces/Renderable";
import SpriteSheet from "../SpriteSheet";

export default abstract class Block implements Renderable, Collidable {
    public sPos : Vector2;
    public sSize : Vector2;
    public pos : Vector2;
    public size : Vector2;
    public color : Vector4;

    public hexColor : number;

    public isCollidable : boolean;

    public spriteSheet = new SpriteSheet('../assets/img/blocks.png')

    public constructor(sPos : Vector2, sSize : Vector2, pos : Vector2, size : Vector2, color : Vector4)
    {
        this.sPos = sPos;
        this.sSize = sSize;
        this.pos = pos.multiplyByScalar(32.0);
        this.size = size;
        
        this.color = color;

        this.hexColor = MathHelper.rgba2Hex(color);
        this.isCollidable = true;
    }

    public render(context : C2D) : void
    {        
        const img : HTMLImageElement = this.spriteSheet.load();

        C2D.drawImage(context, img, this.sPos, this.sSize, this.pos, this.size);
    }
}