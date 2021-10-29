import { Vector2, Vector4 } from "@math.gl/core";

export default class C2D extends CanvasRenderingContext2D {
    public static renderRect(context : C2D, pos : Vector2, size : Vector2, color : Vector4, stroked : boolean = false) : void
    {
        this.resetFillStyle(context);
        
        context.fillStyle = this.getColor(color).toString();
        context.fillRect(pos.x, pos.y, size.x, size.y);
        if (stroked) context.strokeRect(pos.x, pos.y, size.x, size.y);

        this.resetFillStyle(context);
    }

    public static renderCircle(context : C2D, pos : Vector2, size : Vector2, color : Vector4, stroked : boolean = false, filled : boolean = true) : void
    {
        this.resetFillStyle(context);

        context.beginPath();
        context.fillStyle = this.getColor(color).toString();
        context.arc(pos.x, pos.y, size.x + size.y ?? 0, 0, 2 * Math.PI);

        if (filled) context.fill();
        if (stroked) context.stroke();

        this.resetFillStyle(context);
    }

    public static renderText(context : C2D, text : string, font : string, pos : Vector2, width : number) : void {
        context.font = font;
        context.fillText(text, pos.x, pos.y, width);

        this.resetTextSettings(context);
    }

    public static renderShadows(context : C2D, color : string, blur : number, offset : Vector2) : void
    {
        context.shadowColor = color;
        context.shadowBlur = blur;
        context.shadowOffsetX = offset.x;
        context.shadowOffsetY = offset.y;
    } 

    public static drawImage(context : C2D, source : string, pos : Vector2, size : Vector2) : void
    {
        const backgroundImage = new Image();
        backgroundImage.src = source;

        context.drawImage(backgroundImage, pos.x, pos.y, size.x, size.y);
    }

    public static disableImageSmoothing(context : C2D) : void 
    {
        context.imageSmoothingEnabled = false;
    }

    public static clearRect(context : C2D, width : number, height : number) : void
    {
        context.clearRect(0, 0, width, height);
    }

    public static resetImageSmoothing(context : C2D) : void 
    {
        context.imageSmoothingEnabled = true;
    }

    public static resetShadows(context : C2D) : void 
    {
        context.shadowColor = "rgba(0, 0, 0, 0.0)";
        context.shadowBlur = 0.0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
    }

    public static resetFillStyle(context : C2D) : void 
    {
        context.fillStyle = "rgb(0, 0, 0)";
    }

    public static resetTextSettings(context : C2D) : void 
    {
        context.font = "10px sans-serif";
    }

    public static getColor(color : Vector4)  : string
    {
        return `rgb(${color.x}, ${color.y}, ${color.z})`;
    }
} 
