import { Vector2, Vector4 } from "@math.gl/core";

import Block from "./Block";

export default class Wall extends Block
{
    public constructor(pos : Vector2, size : Vector2)
    {
        const sPos : Vector2 = new Vector2(16.0, 0.0);
        const sSize : Vector2 = new Vector2(16.0, 16.0);
        const color : Vector4 = new Vector4(199.0, 176.0, 101.0, 255.0);

        super(sPos, sSize, pos, size, color);
    }
}