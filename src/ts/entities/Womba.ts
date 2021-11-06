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

    public moving : boolean = false;
    
    private speed : number = 0.50; 

    public constructor(level : Level, sPos : Vector2, pos : Vector2, size : Vector2, direction : number)
    {
        super(level, sPos, pos, size);

        this.direction = direction;
    }

    public override render() : void
    {
        this.tick();

        super.render(this.level.context);
    }

    protected override tick() : void
    {
        if (MathHelper.randomRange(0, 256) === 0) this.moving = true;

        if (this.moving) this.tryMove();
        
        super.tick();
    }

    private tryMove() : void
    {
        super.updateDirection();

        if (this.direction === 0) this.pos.x -= this.speed;
        else if (this.direction === 1) this.pos.x += this.speed;
    }
}