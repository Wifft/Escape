import { Vector2, Vector4 } from "@math.gl/core";

import C2D from "../helpers/C2D";

import Renderable from "../interfaces/Renderable";

import Collider from "../phys/Collider";

import Level from "../Level";
import SpriteSheet from "../SpriteSheet";

export default abstract class Entity implements Renderable
{
    public sPos : Vector2;
    public sSize : Vector2;

    public pos : Vector2;
    public size : Vector2;
    public color : Vector4;

    public spriteSheet = new SpriteSheet('../assets/img/entities.png');
    public img : HTMLImageElement;

    protected level : Level;

    public direction : number|null = 0;

    public constructor(level : Level, sPos : Vector2, sSize : Vector2, pos : Vector2, size : Vector2, color : Vector4)
    {   this.sPos = sPos;
        this.sSize = sSize;

        this.pos = pos;
        this.size = size;
        
        this.color = color;

        this.img = this.spriteSheet.load();

        this.level = level;
    }

    public render(context : C2D) : void
    {
        C2D.drawImage(context, this.img, this.sPos, this.sSize.clone().sub(new Vector2(1.0, 0.0)), this.pos, this.size);
    }

    public isColliding() : boolean
    {
        for (const collidable of this.level.getAllCollidables()) {
            const colliding : string|null = Collider.checkCollision(this, collidable);
            if (colliding !== null) return true;
        }

        return false;
    }

    public intersects() : boolean
    {
        for (const collidable of this.level.getAllCollidables()) {
            if (Collider.intersects(this, collidable)) return true;
        }

        return false;
    }
}