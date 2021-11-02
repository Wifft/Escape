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
    public size : Vector2 = new Vector2(32.0, 32.0);
    
    public color : Vector4;
    public hexColor : number;

    public isCollidable : boolean;

    public spriteSheet : SpriteSheet = new SpriteSheet('../assets/img/blocks.png');
    public img : HTMLImageElement;

    public constructor(sPos : Vector2, pos : Vector2, color : Vector4)
    {
        this.sPos = sPos;
        this.sSize = this.size.clone().divideScalar(2.0);
        this.pos = pos;
        
        this.color = color;

        this.hexColor = MathHelper.rgba2Hex(color);
        this.isCollidable = true;

        this.img = this.spriteSheet.load();
    }

    public render(context : C2D) : void
    {
        C2D.drawImage(context, this.img, this.sPos, this.sSize.clone().sub(new Vector2(1.0, 0.0)), this.pos, this.size);
    }
}