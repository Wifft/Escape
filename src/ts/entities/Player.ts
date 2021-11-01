import { Vector2, Vector4 } from "@math.gl/core";

import { PseudoKeyCodes } from "../enum/PseudoKeyCodes";

import Renderable from "../interfaces/Renderable";

import KeyboardController from "../controllers/KeyboardController";

import C2D from "../helpers/C2D";

import Collider from "../phys/Collider";

import Level from "../Level";

export default class Player extends KeyboardController implements Renderable {
    public pos : Vector2;
    
    public size : Vector2;
    public color : Vector4;
    
    public jumping : boolean = false;
    public falling : boolean = false;
    public grounded : boolean = true;
    
    private posA : Vector2 = new Vector2();

    private speed : number = 0.25;

    private level : Level;

    public constructor(level : Level, pos : Vector2, size : Vector2, color : Vector4)
    {
        super();

        this.pos = pos;
        
        this.size = size;
        this.color = color;
        this.level = level;
    }

    public render(context : C2D) : void
    {
        C2D.renderRect(context, this.pos, this.size, this.color);
    }

    public tick() : void
    {
        this.keyboardMove();

        for (const collidable of this.level.getAllCollidables()) {
            console.log(Collider.intersects(this, collidable));
            const dir : string|null = Collider.checkCollision(this, collidable);

            switch (dir) {
                case "b":
                    if (this.jumping) {
                        this.falling = true;
                        this.jumping = false;
                    }

                    break;
                case "t":
                    if (this.falling) {
                        this.grounded = true;
                        this.falling = false;
                    }

                    break;
            }
        }

        if (this.falling) this.pos.y += this.speed;

        this.tryJump();
    }

    private keyboardMove() : void
    {
        if (this.keysDown[PseudoKeyCodes.W_KEY] && this.grounded) {
            this.posA = new Vector2(this.pos.x, this.pos.y);
            this.jumping = true;
        }
        if (this.keysDown[PseudoKeyCodes.A_KEY]) this.pos.x -= this.speed;
        if (this.keysDown[PseudoKeyCodes.D_KEY]) this.pos.x += this.speed;
    }

    private tryJump() : void
    {
        const maxHeight : number = 64.0;

        if (this.jumping) {
            this.grounded = false;

            this.pos.y -= this.speed;

            if (this.pos.y < this.posA.y - maxHeight) {
                this.jumping = false;
                this.falling = true;
            }
        }
    }
}