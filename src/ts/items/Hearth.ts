import { Vector2 } from "@math.gl/core";

import Player from "../entities/Player";

import Level from "../Level";

import Item from "./Item";

export class Hearth extends Item
{
    public sPos : Vector2 = new Vector2(0.0, 0.0);

    public constructor(level : Level, pos : Vector2)
    {
        super(level, pos);
    }

    public override render() : void
    {
        this.tick((p : Player) => p.health++);

        super.render();
    }
}