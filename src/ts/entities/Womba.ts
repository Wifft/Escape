import { Vector2 } from "@math.gl/core";

import MathHelper from "../helpers/MathHelper";

import Level from "../Level";

import Enemy from "./Enemy";

/**
 * Class name suggested by Kitoss
 */
export default class Womba extends Enemy
{
    public direction : number;

    protected speed : number = 1.25; 

    public constructor(level : Level, sPos : Vector2, pos : Vector2, size : Vector2, direction : number)
    {
        super(level, sPos, pos, size);

        this.direction = direction;
    }

    public override render() : void
    {
        this.tick();

        this.sPos = new Vector2(16 * 6, 0.0)
        if (this.moving) this.sPos = new Vector2(16 * 5, 0.0);

        super.render(this.level.context);
    }

    protected override tick() : void
    {
        if (MathHelper.randomRange(0, 256) === 0) this.moving = true;

        if (this.moving) this.tryMove();
        
        super.tick();
    }
}