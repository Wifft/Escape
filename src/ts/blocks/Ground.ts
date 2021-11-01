import { Vector2, Vector4 } from "@math.gl/core";

import Block from "./Block";

export default class Ground extends Block
{
    public constructor(pos : Vector2, size : Vector2)
    {
        const color : Vector4 = new Vector4(65.0, 195.0, 123.0, 255.0);

        super(pos, size, color);
    }
}