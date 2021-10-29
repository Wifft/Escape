import { Vector2 } from "@math.gl/core";
import Player from "../entities/Player";
import Collidable from "../interfaces/Collidable";

export default class AAABB {
    public static intersects(player : Player, target : Collidable) : boolean
    {
        const combinedRadius : number = target.radius;

        const colPos : Vector2 = target.colVec;
        const dist : Vector2 = colPos.sub(player.pos);

        if (dist.lengthSq() < combinedRadius ** 2) {
            const length : number = dist.len();

            dist.normalize();

            const newPlayerPos : Vector2 = dist.multiply(new Vector2(combinedRadius - length, combinedRadius - length));
            player.pos = newPlayerPos;

            return true;
        }

        return false;
    }
} 