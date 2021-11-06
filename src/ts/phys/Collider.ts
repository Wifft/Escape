import { Vector2 } from "@math.gl/core";

import Collidable from "../interfaces/Collidable";

import Player from "../entities/Player";
import Entity from "../entities/Entity";

export default class Collider {
    public static checkCollision(source : Entity|Player, target : Collidable) : string|null
    {
        const xd : number = (source.pos.x + (source.size.x / 2)) - (target.pos.x + (target.size.x / 2));
        const yd : number = (source.pos.y + (source.size.y / 2)) - (target.pos.y + (target.size.y / 2));

        const dist : Vector2 = new Vector2(xd, yd);
        
        const hSize : Vector2 = new Vector2(
            (source.size.x / 2) + (target.size.x / 2),
            (source.size.y / 2) + (target.size.y / 2)
        )

        let dir : string|null = null;

        if (Math.abs(dist.x) < hSize.x && Math.abs(dist.y) < hSize.y) {
            const xo : number = hSize.x - Math.abs(dist.x);
            const yo : number = hSize.y - Math.abs(dist.y);

            if (xo >= yo) {
                if (source instanceof Player) {
                    if (source.falling) { 
                        source.grounded = true;
                        source.falling = false;
                    }
                }

                dist.y > 0 ? dir = "b" : dir = "t";
                dist.y > 0 ? source.pos.y += yo : source.pos.y -= yo;

                return dir;
            }

            dist.x > 0 ? dir = "r" : dir = "l";
            dist.x > 0 ? source.pos.x += xo : source.pos.x -= xo;
        }
        
        return dir;
    }

    public static intersects(source : Entity|Player, target : Collidable) : boolean
    {
        return source.pos.x < target.pos.x + target.size.x
            && source.pos.x + source.size.x > target.pos.x
            && (source instanceof Player ? source.pos.y + 0.25 : source.pos.y) < target.pos.y + target.size.y
            && (source instanceof Player ? source.pos.y + 0.25 : source.pos.y) + source.size.y > target.pos.y;
    }
} 