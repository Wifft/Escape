import { Vector2, Vector4 } from "@math.gl/core";

import C2D from "./helpers/C2D";

import Level from "./Level";

export default class Timer
{
    public lastTime : number = new Date().getTime();
    public numSeconds : number = 0;

    public render(context : C2D) : void
    {
        const canvas : HTMLCanvasElement = context.canvas;

        const currentTime : number = new Date().getTime();
        if (currentTime - this.lastTime >= 1000) {
            this.lastTime = currentTime;
            this.numSeconds++;
        }

        const pos : Vector2 = new Vector2((canvas.width / 2.0) - Level.OFFSET, Level.OFFSET / 2.0);
        const color : Vector4 = new Vector4(255.0, 255.0, 255.0, 1.0);

        let minutes : number = Math.floor(this.numSeconds / 60);
        minutes = (minutes < 10 ? '0' + minutes : minutes) as number;

        let seconds : number = this.numSeconds - minutes * 60;
        seconds = (seconds < 10 ? '0' + seconds : seconds) as number;

        C2D.renderText(context, `${minutes} ${seconds}`, '16px MMRock9', pos, context.canvas.width, color);
    }    
}