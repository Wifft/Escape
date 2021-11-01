import { Vector2 } from "@math.gl/core";

export default interface Collidable {
    pos : Vector2;
    size : Vector2;
    isCollidable : boolean;
}