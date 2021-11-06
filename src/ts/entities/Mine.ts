import { Vector2 } from "@math.gl/core";

import Level from "../Level";

import Enemy from "./Enemy";

export default class Mine extends Enemy
{
    public override moving : boolean = true;

    public direction : number;

    protected speed : number = 1.50;

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
        this.tryMove();
        
        super.tick();
    }

    protected override updateDirection() : void
    {
        const colFace : string = super.getCollisionFace() as string;

        if (colFace === "l") this.direction = 0;
        else if (colFace === "r") this.direction = 1;
    }
}