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

    public spriteSheet = new SpriteSheet('../assets/img/entities.png');
    public img : HTMLImageElement;

    protected level : Level;

    public direction : number|null = 0;

    public constructor(level : Level, sPos : Vector2, sSize : Vector2, pos : Vector2, size : Vector2)
    {   this.sPos = sPos;
        this.sSize = sSize;

        this.pos = pos;
        this.size = size;
        
        this.img = this.spriteSheet.load();

        this.level = level;
    }

    public render(context : C2D) : void
    {
        C2D.drawImage(context, this.img, this.sPos, this.sSize.clone().sub(new Vector2(1.0, 0.0)), this.pos, this.size);
    }

    protected isColliding() : boolean
    {
        for (const collidable of this.level.getAllCollidables()) {
            const colliding : string|null = Collider.checkCollision(this, collidable);
            if (colliding !== null) return true;
        }

        return false;
    }

    protected getCollisionFace() : string|null
    {
        for (const collidable of this.level.getAllCollidables()) {
            const colliding : string|null = Collider.checkCollision(this, collidable);
            if (colliding !== null) return colliding;
        }

        return null;
    }

    protected intersects() : boolean
    {
        for (const collidable of this.level.getAllCollidables()) {
            if (Collider.intersects(this, collidable)) return true;
        }

        return false;
    }

    public isInChunk() : boolean
    {
        const canvas : HTMLCanvasElement = this.level.context.canvas as HTMLCanvasElement;

        const offset : number = Level.OFFSET / 2.0;

        const min : Vector2 = new Vector2(offset, offset);
        const max : Vector2 = new Vector2(canvas.width - offset, canvas.height - offset);
        
        return this.pos.x > min.x && this.pos.x < max.x && this.pos.y > min.y && this.pos.y < max.y;
    }
}