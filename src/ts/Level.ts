import { Vector2, Vector4 } from "@math.gl/core";

import C2D from "./helpers/C2D";

import Collidable from "./interfaces/Collidable";
import Renderable from "./interfaces/Renderable";

import Brick from "./blocks/Brick";
import Wall from "./blocks/Wall";
import Ground from "./blocks/Ground";

import Player from "./entities/Player";

import Bitmap from "./Bitmap";
import Pixel from "./Pixel";

export default class Level
{
    public static OFFSET = 32.0;

    private renderables = new Array<Renderable>();
    private collidables = new Array<Collidable>();

    private pixels = new Array<Pixel>();

    private context : C2D;

    private bitmap : Bitmap = new Bitmap('../../assets/img/bitmap.png');

    public constructor(context : C2D)
    {
        this.context = context;
    }

    public init() : void
    {
        this.loadPixels();
        this.addBlocks();
    }

    public addBlocks() : void
    {
        this.loadPixels().then(
            () : void => {
                this.pixels.forEach(
                    (p : Pixel) : void => {
                        switch (p.colorHex) {
                            case 0xff0000ff:
                                this.add(new Brick(p.pos, new Vector2(32.0, 32.0)));

                                break;
                            case 0x00ff00ff:
                                this.add(new Ground(p.pos, new Vector2(32.0, 32.0)));
                                
                                break;
                            case 0x0000ffff:
                                this.add(new Wall(p.pos, new Vector2(32.0, 32.0)));
                                
                                break;
                        }
                    }
                );
            }
        );
    }

    public add(element : object) : Renderable | Collidable
    {
        this.renderables.push(element as Renderable);
        if ("isCollidable" in element){
            this.collidables.push(element as Collidable);

            return element as Collidable;
        }

        return element as Renderable;
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

        this.getAllRenderables().forEach((r : Renderable) : void => r.render(this.context));
    }
    
    private async loadPixels() : Promise<void|Pixel>
    {
        return this.bitmap.getImageData().then(
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