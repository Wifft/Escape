import { Vector2 } from "@math.gl/core";

import C2D from "./helpers/C2D";

import GameScreen from "./screens/GameScreen";

export default class Bitmap {
    private uri : string;

    public constructor(uri : string)
    {
        this.uri = uri;
    }

    public async getImageData(sPos : Vector2, parentCanvas : HTMLCanvasElement) : Promise<Uint8ClampedArray>
    {
        return this.loadFile().then(
            async (file : File) : Promise<Uint8ClampedArray> => {
                const bitmap : ImageBitmap = await createImageBitmap(file);
                const canvas : HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
                const context : C2D = canvas.getContext('2d') as C2D;

                canvas.width = parentCanvas.width / GameScreen.SCALE;
                canvas.height = parentCanvas.height / GameScreen.SCALE;

                context.drawImage(bitmap, sPos.x, sPos.y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                
                return context.getImageData(0, 0, canvas.width, canvas.height).data; 
            }
        );
    }

    private async loadFile() : Promise<File>
    {
        const src : Response = await fetch(this.uri);
        const blob : Blob = await src.blob();
        const file : File = new File([blob], 'level.png', blob);

        return file;
    }
}
