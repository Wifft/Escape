import { Vector2 } from "@math.gl/core";

import C2D from "../helpers/C2D";

import Renderable from "../interfaces/Renderable";

import Collider from "../phys/Collider";

import Player from "../entities/Player";

import Level from "../Level";
import SpriteSheet from "../SpriteSheet";

export default abstract class  Item implements Renderable {
    public abstract sPos : Vector2;

    public sSize : Vector2;

    public pos : Vector2;
    public size : Vector2;

    public spriteSheet = new SpriteSheet('../assets/img/items.png');
    public img : HTMLImageElement;

    protected level : Level;

    public constructor(level : Level, pos : Vector2) {

        this.pos = pos.addScalar(16.0);
        this.size = new Vector2(16.0, 16.0);
        
        this.sSize = this.size.clone();
        
        this.img = this.spriteSheet.load();

        this.level = level;
    }

    public render() : void
    {
        C2D.drawImage(this.level.context, this.img, new Vector2(Math.floor(this.sPos.x), Math.floor(this.sPos.y)), this.sSize, this.pos, this.size);
    }

    protected tick(action : (p : Player) => void) : void
    {
        for (const renderable of this.level.getAllRenderables()) {
            if (renderable instanceof Player) {
                if (Collider.intersects(renderable, this as any)) {
                    action(renderable);

                    this.level.remove(this);
                }
            } 
        }
    }
}