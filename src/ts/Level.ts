import { Vector2, Vector3, Vector4 } from "@math.gl/core";
import Bitmap from "./Bitmap";
import Brick from "./blocks/Brick";
import Player from "./entities/Player";
import C2D from "./helpers/C2D";
import Renderable from "./interfaces/Renderable";
import Pixel from "./Pixel";

export default class Level
{
    private renderables = new Array<Renderable>();
    private pixels = new Array<Pixel>();

    private context : C2D;

    private bitmap : Bitmap = new Bitmap('../../assets/img/bitmap.png');

    public constructor(context : C2D) {
        this.context = context;
    }

    public init() : void
    {
        this.loadPixels();
        this.addPlayer();
        this.addBlocks();

        console.log(this.getAllRenderables());
    }

    public addBlocks() : void
    {
        this.loadPixels().then(
            () => {
                this.pixels.forEach(
                    (p : Pixel) => {
                        switch (p.colorHex) {
                            case  0xff0000ff:
                                this.add(new Brick(p.pos.multiplyByScalar(16), new Vector2(16.0, 16.0), new Vector4(189.0, 195.0, 199.0, 255.0)));
                                
                                break;
                        }
                    }
                );
            }
        );
    }

    private async loadPixels() : Promise<void|Pixel>
    {
        return this.bitmap.getImageData().then(
            (bitmapData : Uint8ClampedArray) : void => {                
                const currentPixelPosition = new Vector2(0.0, 0.0);

                for (let i : number = 4; i <= bitmapData.length; i += 4) {
                    const pixelData : Array<number> = Array.from(bitmapData.subarray(i - 4, i)); 
                    
                    if (currentPixelPosition.x >= 50) {
                        currentPixelPosition.x = 0;
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
            }
        );
    }

    private addPlayer() : void 
    {
        const xPos : number = 0.0; 
        const yPos : number = 0.0;
        
        const baseSize : number = 32.0;

        const pos : Vector2 = new Vector2(xPos, yPos);
        const size : Vector2 = new Vector2(baseSize / 2, baseSize);
        const color : Vector4 = new Vector4(255.0, 255.0, 0.0, 255.0);
        
        this.add(new Player(new Vector2(pos.x, pos.y), size, color));
    } 

    public add(renderable : Renderable) : Renderable
    {
        this.renderables.push(renderable);

        return renderable;
    }

    public getAllRenderables() : Array<Renderable>
    {
        return this.renderables;
    }

    public render() : void
    {
        this.getAllRenderables().forEach((r : Renderable) : void => r.render(this.context));
    }
}