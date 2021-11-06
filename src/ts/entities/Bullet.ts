import { Vector2 } from "@math.gl/core";

import Renderable from "../interfaces/Renderable";

import Level from "../Level";
import Collider from "../phys/Collider";

import Entity from "./Entity";
import Player from "./Player";

export default class Bullet extends Entity {
    public speed : number;
    
    public source : Entity;
    
    public constructor(level : Level, pos : Vector2, size : Vector2, speed : number, direction : number, source : Entity)
    {
        const sPos : Vector2 = new Vector2(0.0, 0.0);
        const sSize : Vector2 = new Vector2(16.0, 16.0);

        super(level, sPos, sSize, pos, size);

        this.level = level;
        this.speed = speed * 4;
        this.direction = direction;

        this.source = source;
    }

    public render() : void
    {
        if (!super.isInChunk() || (super.intersects() && this.source instanceof Player)) this.level.remove(this as Renderable);
        if (!(this.source instanceof Player)) {
            for (const renderable of this.level.getAllRenderables()) {
                if (renderable instanceof Player && Collider.intersects(this, renderable as any)) renderable.alive = false;
            }
        }

        switch(this.direction) {
            case 0:
                this.pos.x -= this.speed;

                break;
            case 1:
                this.pos.x += this.speed;

                break;
            case 2:
                this.pos.x -= this.speed;
                this.pos.y -= this.speed;
                
                break;
            case 3:
                this.pos.x += this.speed;
                this.pos.y -= this.speed;

                break;
            case 4:
                this.pos.x += this.speed;
                this.pos.y += this.speed;

                break;
            case 5:
                this.pos.x -= this.speed;
                this.pos.y += this.speed;

                break;
        }
        
        super.render(this.level.context);
    }
}