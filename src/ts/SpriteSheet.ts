import C2D from "./helpers/C2D";

export default class SpriteSheet {
    public width : number = 0;
    public height : number = 0;

    public loaded : boolean = true;

    private url : string;

    public constructor(url : string)
    {
        this.url = url;
    }

    public load() : HTMLImageElement
    {
        const img : HTMLImageElement = new Image();

        img.onload = _ => {
            this.width = img.width;
            this.height = img.height;
            this.loaded = true;
        }

        img.src = this.url ? this.url : '';

        return img;
    }
}