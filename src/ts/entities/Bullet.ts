import { Vector2, Vector4 } from "@math.gl/core";

import Renderable from "../interfaces/Renderable";

import Level from "../Level";

import Entity from "./Entity";

export default class Bullet extends Entity {
    public level : Level;

    public speed : number;
    
    public constructor(level : Level, pos : Vector2, size : Vector2, speed : number, direction : number)
    {
        const sPos : Vector2 = new Vector2(0.0, 0.0);
        const sSize : Vector2 = new Vector2(16.0, 16.0);
        const color : Vector4 = new Vector4(189.0, 195.0, 199.0, 255.0);

        super(level, sPos, sSize, pos, size, color);

        this.level = level;
        this.speed = speed * 4;
        this.direction = direction;
    }

    public render() : void
    {
        if (super.intersects()) this.level.remove(this as Renderable); 

        this.direction === 0 ? this.pos.x -= this.speed : this.pos.x += this.speed;
        
        super.render(this.level.context);
    }
}