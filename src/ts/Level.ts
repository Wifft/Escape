import { Vector2, Vector4 } from "@math.gl/core";

import C2D from "./helpers/C2D";

import Collidable from "./interfaces/Collidable";
import Renderable from "./interfaces/Renderable";

import { ChunkData } from "./types/ChunkData";

import Brick from "./blocks/Brick";
import CrackedBrick from "./blocks/CrackedBrick";
import Ground from "./blocks/Ground";
import CrackedGround from "./blocks/CrackedGround";
import Gear from "./blocks/Gear";

import Mine from "./entities/Mine";
import Player from "./entities/Player";
import Turret from "./entities/Turret";
import Womba from "./entities/Womba";

import Bitmap from "./Bitmap";
import Pixel from "./Pixel";
import Camera from "./Camera";
import { Hearth } from "./items/Hearth";
import { Gun } from "./items/Gun";

export default class Level
{
    public static readonly OFFSET = 32.0;

    public context : C2D;

    public currentChunk : number = 0;
    public chunksData : Array<ChunkData> = Camera.getAllChunks();

    private renderables = new Array<Renderable>();
    private collidables = new Array<Collidable>();

    private pixels = new Array<Pixel>();

    private bitmap : Bitmap = new Bitmap('../../assets/img/level.png');
    
    public constructor(context : C2D)
    {
        this.context = context;
    }

    public init() : void
    {
        this.loadPixels();
        this.addBlocks();
    }

    public refresh() : void
    {
        this.pixels = [];
        this.collidables = [];
        
        this.renderables = this.renderables.filter((r : Renderable) : boolean => r instanceof Player);

        this.loadPixels();
        this.addBlocks();
    }

    public getPlayer() : Player
    {
        return this.renderables.filter((r : Renderable) : boolean => r instanceof Player)[0] as Player;
    }

    private addBlocks() : void
    {
        this.loadPixels().then(
            () : void => {
                this.pixels.forEach(
                    (p : Pixel) : void => {
                        switch (p.colorHex) {
                            case 0xff0000ff:
                                this.add(new Brick(this, p.pos));

                                break;
                            case 0x408080ff:
                                this.add(new Brick(this, p.pos, 1));

                                break;
                            case 0x8ef2f2ff:
                                this.add(new CrackedBrick(this, p.pos));

                                break;
                            case 0xff0080ff:
                                this.add(new CrackedBrick(this, p.pos, 1));

                                break;
                            case 0x008000ff:
                                this.add(new Ground(this, p.pos));

                                break;
                            case 0x400040ff:
                                this.add(new Ground(this, p.pos, 1));

                                break;
                            case 0xc8bfe7ff:
                                this.add(new CrackedGround(this, p.pos));

                                break;
                            case 0xe9cd07ff:
                                this.add(new CrackedGround(this, p.pos, 1));

                                break;
                            case 0xa349a4ff:
                                this.add(new Gear(this, p.pos));
                                
                                break;
                            case 0xc3c3c3ff:
                                this.add(new Turret(this, new Vector2(16.0, 0.0), p.pos, 0));
                                
                                break;
                            case 0xc4c4c4ff:
                                this.add(new Turret(this, new Vector2(16.0 * 3, 0.0), p.pos, 1));
                                
                                break;
                            case 0x33c69aff:
                                this.add(new Mine(this, new Vector2(16.0 * 7, 0.0), p.pos, 1));
                                
                                break;
                            case 0xa4fe1dff:
                                this.add(new Womba(this, new Vector2(16.0 * 6, 0.0), p.pos, 1));
                                
                                break;
                            case 0x8a0b11ff:
                                this.add(new Hearth(this, p.pos));
                                
                                break;
                            case 0x5f363dff:
                                this.add(new Gun(this, p.pos));
                                
                                break;
                        }
                    }
                );
            }
        );
    }

    public add(element : object) : Renderable|Collidable
    {
        this.renderables.push(element as Renderable);
        if ("isCollidable" in element){
            this.collidables.push(element as Collidable);

            return element as Collidable;
        }

        return element as Renderable;
    }

    public remove(r : Renderable)
    {
        this.renderables = this.renderables.filter((target : Renderable) : boolean => r.pos !== target.pos);
    }    

    public getAllRenderables() : Array<Renderable>
    {
        return this.renderables;
    }

    public getAllCollidables() : Array<Collidable>
    {
        return this.collidables;
    }

    public render() : void
    {
        C2D.disableImageSmoothing(this.context);

        this.getAllRenderables().forEach((r : Renderable) : void => r.render());
    }
    
    private async loadPixels() : Promise<void|Pixel>
    {
        return this.bitmap.getImageData(this.chunksData[this.currentChunk].bitmapPos, this.context.canvas).then(
            (bitmapData : Uint8ClampedArray) : void => {                
                const currentPixelPosition = new Vector2(0.0, 0.0);

                for (let i : number = 4.0; i <= bitmapData.length; i += 4.0) {
                    const pixelData : Array<number> = Array.from(bitmapData.subarray(i - 4, i)); 
                    
                    if (currentPixelPosition.x >= 25.0) {
                        currentPixelPosition.x = 0.0;
                        currentPixelPosition.y++;
                    }

                    this.pixels.push(
                        new Pixel(
                            new Vector2(currentPixelPosition.x, currentPixelPosition.y),
                            new Vector4(pixelData)
                        )
                    );

                    currentPixelPosition.x++;
                }

                //Workaround to avoid strange pixels duplication.                
                this.pixels = this.pixels.filter(
                    (value : Pixel, index : number, elements : Array<Pixel>) : boolean => index === elements.findIndex(
                        (p : Pixel) : boolean => p.pos.equals(value.pos.elements)
                    )
                );
            }
        );
    }
}