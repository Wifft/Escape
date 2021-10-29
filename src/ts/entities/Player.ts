import { Vector2, Vector4 } from "@math.gl/core";
import KeyboardController from "../controllers/KeyboardController";
import { PseudoKeyCodes } from "../enum/PseudoKeyCodes";
import C2D from "../helpers/C2D";
import Collidable from "../interfaces/Collidable";
import Renderable from "../interfaces/Renderable";
import Level from "../Level";
import AAABB from "../phys/AABB";

export default class Player extends KeyboardController implements Renderable {
    public pos : Vector2;
    public size : Vector2;
    public color : Vector4;

    public radius : number;

    public speed = 0.25;

    private level : Level; 

    public constructor(level : Level, pos : Vector2, size : Vector2, color : Vector4)
    {
        super();

        this.pos = pos;
        this.size = size;
        this.color = color;
        this.level = level;

        this.radius = this.size.x + this.size.y;
    }

    public render(context : C2D) : void
    {
        C2D.renderRect(context, this.pos, this.size, this.color);
    }

    public tick(context : C2D) : void
    {
        this.keyboardMove();

        const canvas : HTMLCanvasElement = context.canvas as HTMLCanvasElement;

        const xOffset : number = Level.OFFSET + this.size.x;
        const yOffset : number = Level.OFFSET + this.size.y;

        const min : Vector2 = new Vector2(Level.OFFSET, Level.OFFSET);
        const max : Vector2 = new Vector2(canvas.width - xOffset, canvas.height - yOffset);
        
        if (this.pos.x < min.x) this.pos.x = min.x;
        if (this.pos.x > max.x) this.pos.x = max.x;
        if (this.pos.y < min.y) this.pos.y = min.y;
        if (this.pos.y > max.y) this.pos.y = max.y;
    }

    private keyboardMove() : void
    {
        if (!this.isColliding()) {
            if (this.keysDown[PseudoKeyCodes.W_KEY]) this.pos.y -= this.speed;
            if (this.keysDown[PseudoKeyCodes.A_KEY]) this.pos.x -= this.speed;
            if (this.keysDown[PseudoKeyCodes.S_KEY]) this.pos.y += this.speed;
            if (this.keysDown[PseudoKeyCodes.D_KEY]) this.pos.x += this.speed;
        }
    }

    private isColliding() : boolean
    {
        for (const collidable of this.level.getAllCollidables()) {
            if (AAABB.intersects(this, collidable)) return true;

        }

        return false;
    }
}