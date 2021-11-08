import { Vector2 } from "@math.gl/core";

import Level from "../Level";
import Collider from "../phys/Collider";

import Enemy from "./Enemy";
import Entity from "./Entity";
import Player from "./Player";

export default class Bullet extends Entity {
    public override size : Vector2 = new Vector2(12.0, 12.0);

    public speed : number;
    
    public source : Entity;
    
    public constructor(level : Level, pos : Vector2, speed : number, direction : number, source : Entity)
    {
        super(level, new Vector2(0.0, 0.0), pos);

        this.level = level;
        this.speed = speed * 4;
        this.direction = direction;

        this.source = source;
    }

    public render() : void
    {
       this.tick();

        if (this.source instanceof Player) this.sPos.x = (Level.OFFSET / 2) * 12;
        
        super.render();
    }

    private tick() : void
    {
        if (!super.isInChunk() || (super.intersects() && this.source instanceof Player)) this.level.remove(this);
        else if (this.source instanceof Player) {
            for (const renderable of this.level.getAllRenderables()) {
                if (renderable instanceof Enemy && Collider.intersects(this, renderable as any)) {
                    renderable.health--;

                    this.level.remove(this);
                }
            }
        } else if (!(this.source instanceof Player)) {
            const player : Player = this.level.getPlayer();

            if (Collider.intersects(player, this as any)) {
                player.getDamage();

                this.level.remove(this);
            }
        }

        this.setDirection(this.direction);
    }

    private setDirection(direction : number|null) : void
    {
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
    }
}