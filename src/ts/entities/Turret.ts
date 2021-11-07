import { Vector2 } from "@math.gl/core";

import C2D from "../helpers/C2D";
import MathHelper from "../helpers/MathHelper";

import Level from "../Level";

import Bullet from "./Bullet";
import Enemy from "./Enemy";

export default class Turret extends Enemy {
    public direction : number;

    private shooting : boolean = false;

    private sPosA : Vector2;

    public constructor(level : Level, sPos : Vector2, pos : Vector2, direction : number)
    {
        super(level, sPos, pos);

        this.direction = direction;

        this.sPosA = this.sPos.clone();
    }

    public override render()
    {
        this.tick();

        const offset = Level.OFFSET / 2;
        
        this.sPos = this.sPosA.clone();
        
        if (this.shooting && this.direction === 0) this.sPos.x = offset * 2; 
        else if (this.shooting && this.direction === 1) this.sPos.x = offset * 4; 

        super.render();
    }

    protected override tick() : void
    {
        if (!this.shooting && MathHelper.randomRange(0, 1000) < 5) this.tryShoot();
        else if (this.shooting && MathHelper.randomRange(0, 100) < 3) this.shooting = false;

        super.tick();
    }

    private tryShoot() : void
    {
        this.shooting = true;

        this.level.add(new Bullet(this.level, this.pos.clone().sub(new Vector2(0.0, 8.0)), 0.60, this.direction === 0 ? 3 : 2, this));
        this.level.add(new Bullet(this.level, this.pos.clone().add(new Vector2(0.0, 16.0)), 0.60, this.direction === 0 ? 4 : 5, this));
    }
}