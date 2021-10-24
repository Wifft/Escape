import C2D from "./helpers/C2D";

export default class Bitmap {
    private uri : string;

    public constructor(uri : string) {
        this.uri = uri;
    }

    public async getImageData() : Promise<Uint8ClampedArray>
    {
        return this.loadFile().then(
            async (fileData : Array<any>) : Promise<Uint8ClampedArray> => {
                const bitmap : ImageBitmap = await createImageBitmap(fileData[1]);
                const canvas : HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
                const context : C2D = canvas.getContext('2d') as C2D;

                canvas.width = bitmap.width;
                canvas.height = bitmap.height;

                context.drawImage(bitmap, 0, 0);
                
                return context.getImageData(0, 0, canvas.width, canvas.height).data; 
            }
        );

    }

    private async loadFile() : Promise<Array<any>>
    {
        const src : Response = await fetch(this.uri);
        const blob : Blob = await src.blob();
        const file : File = new File([blob], 'bitmap.png', blob);

        return [
            blob,
            file
        ];
    }
}