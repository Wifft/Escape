import { Vector2 } from "@math.gl/core";

import Collidable from "../interfaces/Collidable";

import Player from "../entities/Player";

export default class Collider {
    public static checkCollision(player : Player, target : Collidable) : string|null
    {
        const xd : number = (player.pos.x + (player.size.x / 2)) - (target.pos.x + (target.size.x / 2));
        const yd : number = (player.pos.y + (player.size.y / 2)) - (target.pos.y + (target.size.y / 2));

        const dist : Vector2 = new Vector2(xd, yd);
        
        const hSize : Vector2 = new Vector2(
            (player.size.x / 2) + (target.size.x / 2),
            (player.size.y / 2) + (target.size.y / 2)
        )

        let dir : string|null = null;

        if (Math.abs(dist.x) < hSize.x && Math.abs(dist.y) < hSize.y) {
            const xo : number = hSize.x - Math.abs(dist.x);
            const yo : number = hSize.y - Math.abs(dist.y);

            if (xo >= yo) {
                if (player.falling) { 
                    player.grounded = true;
                    player.falling = false;
                }
                
                dist.y > 0 ? dir = "b" : dir = "t";
                dist.y > 0 ? player.pos.y += yo : player.pos.y -= yo;

                console.log(dir);

                return dir;
            }

            dist.x > 0 ? dir = "r" : dir = "l";
            dist.x > 0 ? player.pos.x += xo : player.pos.x -= xo;
        }

        return dir;
    }

    public static intersects(player : Player, target : Collidable) : boolean
    {
        return player.pos.x < target.pos.x + target.size.x
            && player.pos.x + player.size.x > target.pos.x
            && player.pos.y < target.pos.y + target.size.y
            && player.pos.y + player.size.y > target.pos.y;
    }
} 