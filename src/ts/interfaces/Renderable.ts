import { Vector2, Vector4 } from "@math.gl/core";

import C2D from "../helpers/C2D";
import SpriteSheet from "../SpriteSheet";

export default interface Renderable {
    pos : Vector2;
    size : Vector2;
    color : Vector4;
    hexColor? : number;
    spriteSheet : SpriteSheet
    
    render(context : C2D) : void
}