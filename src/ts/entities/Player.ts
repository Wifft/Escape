import { Vector2 } from "@math.gl/core";

import C2D from "../helpers/C2D";

import { Keys } from "../enum/Key";
import Renderable from "../interfaces/Renderable";

import Input from "../controllers/Input";

import Collider from "../phys/Collider";

import Level from "../Level";
import SpriteSheet from "../SpriteSheet";

import Bullet from "./Bullet";
import Entity from "./Entity";
import Gear from "../blocks/Gear";
import GameScreen from "../screens/GameScreen";

export default class Player extends Entity implements Renderable {
    public override spriteSheet : SpriteSheet = new SpriteSheet('../assets/img/player.png');
    public override img : HTMLImageElement;

    public override direction : number|null = null;

    public jumping : boolean = false;
    public falling : boolean = false;
    public grounded : boolean = true;
    public shooting : boolean = false;

    public alive : boolean = true;

    public movingLeft : boolean = false;
    public movingRight : boolean = false;
    
    public speed : number = 0.25;
    public speedA : number = 0.25;
    
    private keysDown : Array<boolean> = new Array<boolean>();

    private posA : Vector2 = new Vector2();

    public constructor(level : Level, sPos : Vector2, sSize : Vector2,  pos : Vector2, size : Vector2)
    {
        super(level, sPos, sSize, pos, size);

        this.level = level;
        this.img = this.spriteSheet.load();

        window.onkeydown = (e : KeyboardEvent) => this.onKeyDown(e);
        window.onkeyup = (e : KeyboardEvent) => this.onKeyUp(e);
    }

    public override render(context : C2D) : void
    {
        let spritePos : number = 0.0;

        if (this.jumping || this.falling) spritePos = GameScreen.SCALE * 1;
        else if (this.movingRight) spritePos = GameScreen.SCALE * 2;
        else if (this.movingLeft) spritePos = GameScreen.SCALE * 3;
        else if (this.direction === 0) spritePos = GameScreen.SCALE * 5;
        else if (this.direction === 1) spritePos = GameScreen.SCALE * 4;

        if (!this.alive) {
            spritePos = GameScreen.SCALE * 6;
            this.size = new Vector2(48.0, GameScreen.SCALE);
            this.sSize = this.size;
        }
        
        this.sPos = new Vector2(spritePos, 0.0);
        this.sSize = this.size;

        C2D.drawImage(context, this.img, this.sPos, this.sSize, this.pos, this.size);
    }

    public tick() : void
    {
        this.keyboardMove();

        const canvas : HTMLCanvasElement = this.level.context.canvas as HTMLCanvasElement;

        const xOffset : number = Level.OFFSET + this.size.x;
        const yOffset : number = Level.OFFSET + this.size.y;

        const min : Vector2 = new Vector2(Level.OFFSET, Level.OFFSET);
        const max : Vector2 = new Vector2(canvas.width - xOffset, canvas.height - yOffset);
        
        if (this.pos.x < min.x) this.pos.x = min.x;
        if (this.pos.x > max.x) this.goToNextChunk(), this.pos.x += 64.0;
        if (this.pos.y < min.y) this.pos.y = min.y;
        if (this.pos.y > max.y) this.pos.y = max.y;
        
        for (const collidable of this.level.getAllCollidables()) {
            const dir : string|null = Collider.checkCollision(this, collidable);

            if (dir !== null) {
                if (collidable instanceof Gear) this.alive = false;
                
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
        }

        if (this.grounded && !this.intersects()) {
            this.grounded = false;
            this.falling = true;
        }

        if (this.falling && !this.grounded) this.pos.y += this.speed;

        this.speed = this.speedA;
        if (this.jumping || this.falling) this.speed = 0.5;

        this.tryJump();
    }

    private keyboardMove() : void
    {
        if (this.keysDown[Keys.W] && this.grounded) {
            this.posA = new Vector2(this.pos.x, this.pos.y);
            this.jumping = true;
        }

        if (this.keysDown[Keys.A]) {
            this.pos.x -= this.speed;
            this.movingLeft = true;
            this.movingRight = false;
            this.direction = 0;
        }
        
        if (this.keysDown[Keys.D]) {
            this.pos.x += this.speed; 
            this.movingLeft = false;
            this.movingRight = true;
            this.direction = 1;
        }

        if (this.keysDown[Keys.E] && !this.shooting) this.tryShoot();

        if (!this.keysDown.find((element : boolean) => element === true)) {
            this.shooting = false;
            this.movingLeft = false;
            this.movingRight = false;
        }
    }

    private tryJump() : void
    {
        const maxHeight : number = 72.0;

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

    public tryShoot() : void
    {
        this.shooting = true;

        const size = new Vector2(16.0, 16.0);

        this.level.add(new Bullet(this.level, this.pos.clone(), size, this.speed, this.direction as number));
    }

    private goToNextChunk() : void
    {
        this.level.currentChunk++;
    }

    private onKeyDown(e : KeyboardEvent) : void
    {
        const keyCode = Input.getPseduoKeyCode(e.code);
        if (keyCode !== null) this.keysDown[keyCode] = true;
    }

    private onKeyUp(e : KeyboardEvent) : void
    {
        const keyCode = Input.getPseduoKeyCode(e.code);
        if (keyCode !== null) this.keysDown[keyCode] = false;
    }
}