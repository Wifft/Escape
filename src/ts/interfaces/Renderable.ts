import { Vector2, Vector4 } from "@math.gl/core";

import C2D from "../helpers/C2D";

import SpriteSheet from "../SpriteSheet";

export default interface Renderable {
    pos : Vector2;
    size : Vector2;
    sPos? : Vector2;
    sSize? : Vector2;
    hexColor? : number;
    spriteSheet : SpriteSheet
    img : HTMLImageElement
    
    render(context : C2D) : void
}