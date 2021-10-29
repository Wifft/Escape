import { Vector4 } from "@math.gl/core";

export default class MathHelper {
    public static range(min : number, max : number) : Array<number>
    {
        const range : Array<number> = [];
        for (let i : number = min; i <= max; i++) range.push(i); 

        return range;
    }
    
    public static isInRange(number : number, range : Array<number>) : boolean
    {
        return number >= range[0] && number <= range[1]; 
    }

    public static randomRange(min : number, max : number) : number
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            c => {
                const r = Math.random() * 16 | 0, v = c == 'x' 
                    ? r 
                    : (r & 0x3 | 0x8);
                return v.toString(16);
            }
        );
    }

    public static rgba2Hex(rgba : Vector4) : number
    {
        let hexNumber : string = ""; 
        for (const element of rgba.elements) hexNumber += MathHelper.rgbaValue2Hex(element);  

        return parseInt("0x" + hexNumber);
    }

    private static rgbaValue2Hex(value : number) : string
    {
        let hex : string = Number(value).toString(16);
        if (hex.length < 2) hex = "0" + hex;

        return hex;
    }    
}