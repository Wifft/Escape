import { Vector2, Vector4 } from "@math.gl/core";

export default class C2D extends CanvasRenderingContext2D {
    public static renderRect(
        context : CanvasRenderingContext2D, 
        pos : Vector2, 
        size : Vector2, 
        color : Vector4, 
        stroked : boolean = false
    ) : void {
        this.resetFillStyle(context);
        
        context.fillStyle = this.getColor(color).toString();
        context.fillRect(pos.x, pos.y, size.x, size.y);
        if (stroked) context.strokeRect(pos.x, pos.y, size.x, size.y);

        this.resetFillStyle(context);
    }

    public static renderCircle(
        context : CanvasRenderingContext2D, 
        pos : Vector2, 
        size : Vector2, 
        color : any,
        stroked : boolean = false,
        filled : boolean = true
    ) : void {
        this.resetFillStyle(context);

        context.beginPath();
        context.fillStyle = this.getColor(color).toString();
        context.arc(pos.x, pos.y, size.x + size.y ?? 0, 0, 2 * Math.PI);

        if (filled) context.fill();
        if (stroked) context.stroke();

        this.resetFillStyle(context);
    }

    public static renderText(
        context : CanvasRenderingContext2D, 
        text : string, 
        font : string, 
        pos : Vector2,
        width : number
    ) : void {
        context.font = font;
        context.fillText(text, pos.x, pos.y, width);

        this.resetTextSettings(context);
    }

    public static renderShadows(
        context : CanvasRenderingContext2D, 
        color : string, 
        blur : number, 
        xOffset : number, 
        yOffset : number
    ) : void {
        
        context.shadowColor = color;
        context.shadowBlur = blur;
        context.shadowOffsetX = xOffset;
        context.shadowOffsetY = yOffset;
    } 

    public static drawImage(
        context : CanvasRenderingContext2D, 
        source : string, 
        pos : Vector2,
        size : Vector2
    ) : void {
        const backgroundImage = new Image();
        backgroundImage.src = source;

        context.drawImage(backgroundImage, pos.x, pos.y, size.x, size.y);
    }

    public static disableImageSmoothing(context : CanvasRenderingContext2D) : void 
    {
        context.imageSmoothingEnabled = false;
    }

    public static resetImageSmoothing(context : CanvasRenderingContext2D) : void 
    {
        context.imageSmoothingEnabled = true;
    }

    public static resetShadows(context : CanvasRenderingContext2D) : void 
    {
        context.shadowColor = "rgba(0, 0, 0, 0.0)";
        context.shadowBlur = 0.0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
    }

    public static resetFillStyle(context : CanvasRenderingContext2D) : void 
    {
        context.fillStyle = "rgb(0, 0, 0)";
    }

    public static resetTextSettings(context : CanvasRenderingContext2D) : void 
    {
        context.font = "10px sans-serif";
    }

    public static getColor(color : Vector4)  : string
    {
        return `rgb(${color.x}, ${color.y}, ${color.z})`;
    }
} 
