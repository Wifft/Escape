import { Vector2 } from "@math.gl/core";

import C2D from "../helpers/C2D";

import Renderable from "../interfaces/Renderable";

import Collider from "../phys/Collider";

import Level from "../Level";
import SpriteSheet from "../SpriteSheet";
import GameScreen from "../screens/GameScreen";

export default abstract class Entity implements Renderable
{
    public sPos : Vector2;
    public sSize : Vector2 = new Vector2(GameScreen.SCALE / 2, GameScreen.SCALE / 2);

    public pos : Vector2;
    public size : Vector2 = new Vector2(GameScreen.SCALE, GameScreen.SCALE);

    public spriteSheet = new SpriteSheet('../assets/img/entities.png');
    public img : HTMLImageElement;

    public direction : number|null = 0;
    public health : number = 3.0;
    
    protected level : Level;

    public constructor(level : Level, sPos : Vector2, pos : Vector2)
    {   this.sPos = sPos;

        this.pos = pos;
        
        this.img = this.spriteSheet.load();

        this.level = level;
    }

    public render() : void
    {
        C2D.drawImage(this.level.context, this.img, new Vector2(Math.floor(this.sPos.x), Math.floor(this.sPos.y)), this.sSize, this.pos, this.size);
    }

    protected isColliding() : boolean
    {
        for (const collidable of this.level.getAllCollidables()) {
            if (Collider.checkCollision(this, collidable) !== null) return true;
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