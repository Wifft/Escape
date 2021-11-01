import { Vector2, Vector4 } from "@math.gl/core";

import C2D from "../helpers/C2D";

import { PseudoKeyCodes } from "../enum/PseudoKeyCodes";
import Renderable from "../interfaces/Renderable";

import KeyboardController from "../controllers/KeyboardController";

import Collider from "../phys/Collider";

import Level from "../Level";
import SpriteSheet from "../SpriteSheet";

export default class Player extends KeyboardController implements Renderable {
    public pos : Vector2;
    
    public size : Vector2;
    public color : Vector4;
    public spriteSheet = new SpriteSheet('../assets/img/player.png');

    public jumping : boolean = false;
    public falling : boolean = false;
    public grounded : boolean = true;

    public movingLeft : boolean = false;
    public movingRight : boolean = false;
    public shooting : boolean = false;
    
    public speed : number = 0.25;

    private posA : Vector2 = new Vector2();

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
        let spritePos : number = 0.0;
        if (this.jumping) spritePos = 32.0;
        else if (this.movingRight) spritePos = 64.0;
        else if (this.movingLeft) spritePos = 96.0;

        const img : HTMLImageElement = this.spriteSheet.load();
        const sPos = new Vector2(spritePos, 0.0);
        const sSize = this.size;

        C2D.drawImage(context, img, sPos, sSize, this.pos, this.size);
    }

    public tick() : void
    {
        this.keyboardMove();
        
        for (const collidable of this.level.getAllCollidables()) {
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
                case null:
                    if (this.grounded) {
                        this.grounded = false;
                        this.falling = true;
                    }

                    break;
            }
        }

        if (this.falling && !this.grounded) this.pos.y += this.speed;

        this.tryJump();
    }

    private keyboardMove() : void
    {
        if (this.keysDown[PseudoKeyCodes.W_KEY] && (!this.jumping || !this.falling)) {
            this.posA = new Vector2(this.pos.x, this.pos.y);
            this.jumping = true;
        }
        if (this.keysDown[PseudoKeyCodes.A_KEY]) this.pos.x -= this.speed, this.movingLeft = true, this.movingRight = false;
        if (this.keysDown[PseudoKeyCodes.D_KEY]) this.pos.x += this.speed, this.movingLeft = false, this.movingRight = true;

        if (!this.keysDown.find((element : boolean) => element === true)) this.movingLeft = false, this.movingRight = false;
    }

    private tryJump() : void
    {
        const maxHeight : number = 64.0;

        if (this.jumping) {
            this.grounded = false;
            this.falling = false;

            this.pos.y -= this.speed;

            if (this.pos.y < this.posA.y - maxHeight) {
                this.jumping = false;
                this.falling = true;
            }
        }
    }
}