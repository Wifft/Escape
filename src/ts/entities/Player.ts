import { Vector2 } from "@math.gl/core";

import C2D from "../helpers/C2D";
import MathHelper from "../helpers/MathHelper";

import { Keys } from "../enum/Key";

import Input from "../controllers/Input";

import GameScreen from "../screens/GameScreen";

import { ChunkData } from "../types/ChunkData";

import Collider from "../phys/Collider";

import Gear from "../blocks/Gear";

import Level from "../Level";
import SpriteSheet from "../SpriteSheet";

import Bullet from "./Bullet";
import Entity from "./Entity";

export default class Player extends Entity {
    public override size : Vector2 = new Vector2(GameScreen.SCALE, GameScreen.SCALE + (GameScreen.SCALE / 2));
    public override sSize : Vector2 = new Vector2(GameScreen.SCALE, GameScreen.SCALE + (GameScreen.SCALE / 2));

    public override spriteSheet : SpriteSheet = new SpriteSheet('../assets/img/player.png');
    public override img : HTMLImageElement;

    public override health : number = 50;

    public override direction : number|null = null;

    public jumping : boolean = false;
    public falling : boolean = false;
    public grounded : boolean = true;
    public hurted : boolean = false;
    public shooting : boolean = false;
    public hasGun : boolean = false;

    public alive : boolean = true;

    public movingLeft : boolean = false;
    public movingRight : boolean = false;

    public speed : Vector2 = new Vector2(5.0, 6.0);
    public speedA : Vector2;
    
    private keysDown : Array<boolean> = new Array<boolean>();

    private posA : Vector2 = new Vector2();

    public constructor(level : Level, sPos : Vector2,  pos : Vector2)
    {
        super(level, sPos, pos);

        this.level = level;
        this.img = this.spriteSheet.load();

        this.speedA = this.speed.clone();

        window.onkeydown = (e : KeyboardEvent) => this.onKeyDown(e);
        window.onkeyup = (e : KeyboardEvent) => this.onKeyUp(e);
    }

    public override render() : void
    {
        let spritePos : number = 0.0;
        
        this.sPos = new Vector2(192.0, 48.0);
        if (this.alive) {
            if (this.jumping || this.falling) spritePos = GameScreen.SCALE * 1;
            else if (this.movingRight) spritePos = GameScreen.SCALE * 2;
            else if (this.movingLeft) spritePos = GameScreen.SCALE * 3;
            else if (this.direction === 0) spritePos = GameScreen.SCALE * 5;
            else if (this.direction === 1) spritePos = GameScreen.SCALE * 4;
            
            this.sPos = new Vector2(spritePos, 0.0);
            if (this.hurted) this.sPos = new Vector2(spritePos, this.size.y);
            else if (this.hasGun) this.sPos = new Vector2(spritePos, this.size.y * 2);
            else if (this.hurted && this.hasGun) this.sPos = new Vector2(spritePos, this.size.y * 3);
        }

        this.sSize = this.size;

        C2D.drawImage(this.level.context, this.img, this.sPos, this.sSize, this.pos, this.size);
    }

    public tick() : void
    {
        if (this.health <= 0) this.alive = false;       
        
        this.keyboardMove();

        const canvas : HTMLCanvasElement = this.level.context.canvas as HTMLCanvasElement;

        const offset : number = Level.OFFSET / 2;

        const min : Vector2 = new Vector2(offset, offset);
        const max : Vector2 = new Vector2(canvas.width - offset, canvas.height - offset);
     
        const currentChunkData : ChunkData = this.level.chunksData[this.level.currentChunk];

        if (Array.isArray(currentChunkData.escapePoint) && !(currentChunkData.escapePoint instanceof Vector2)) {
            for (const point of currentChunkData.escapePoint) {
                if (MathHelper.isInRange(this.pos.x, [point.x - GameScreen.SCALE, point.x]) 
                    && MathHelper.isInRange(this.pos.y, [point.y - GameScreen.SCALE, point.y])) this.goToNextChunk();
            }
        }
        else if (MathHelper.isInRange(this.pos.x, [currentChunkData.escapePoint.x - GameScreen.SCALE, currentChunkData.escapePoint.x]) 
            && MathHelper.isInRange(this.pos.y, [currentChunkData.escapePoint.y - GameScreen.SCALE, currentChunkData.escapePoint.y])) this.goToNextChunk();

        if (this.pos.x < min.x) this.pos.x = min.x;
        if (this.pos.x > max.x) this.pos.x = max.x;
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

        if (this.falling && !this.grounded) this.pos.y += this.speed.x;

        this.speed = this.speedA;

        this.tryJump();
    }

    public getDamage() : void
    {
        this.hurted = true;

        this.health--;

        setTimeout(() => this.hurted = false, 1000 / 2);
    }

    private keyboardMove() : void
    {
        if (this.keysDown[Keys.W] && this.grounded) {
            this.posA = new Vector2(this.pos.x, this.pos.y);
            this.jumping = true;
        }

        if (this.keysDown[Keys.A]) {
            this.pos.x -= this.speed.x;
            this.movingLeft = true;
            this.movingRight = false;
            this.direction = 0;
        }
        
        if (this.keysDown[Keys.D]) {
            this.pos.x += this.speed.x; 
            this.movingLeft = false;
            this.movingRight = true;
            this.direction = 1;
        }

        if (this.keysDown[Keys.E] && this.hasGun && !this.shooting && this.direction !== null) this.tryShoot();

        if (!this.keysDown.find((element : boolean) => element === true)) {
            this.shooting = false;
            this.movingLeft = false;
            this.movingRight = false;
        }
    }

    private tryJump() : void
    {
        const maxHeight : number = 96.0;

        if (this.jumping) {
            this.grounded = false;
            this.falling = false;

            this.pos.y -= this.speed.y;

            if (this.pos.y < this.posA.y - maxHeight) {
                this.jumping = false;
                this.falling = true;
            }
        }
    }

    public tryShoot() : void
    {
        this.shooting = true;

        this.level.add(new Bullet(this.level, this.pos.clone(), 0.5, this.direction as number, this));
    }

    private goToNextChunk() : void
    {
        this.level.currentChunk++;

        this.pos = this.level.chunksData[this.level.currentChunk].spawnPoint.clone();

        this.level.refresh();
    }

    private onKeyDown(e : KeyboardEvent) : void
    {
        const keyCode = Input.getPseduoKeyCode(e.code);
        if (keyCode !== null) this.keysDown[keyCode] = true;
    }

    private onKeyUp(e : KeyboardEvent) : void
    {
        const keyCode = Input.getPseduoKeyCode(e.code);
        if (keyCode !== null) this.keysDown[keyCode] = false
    }
}