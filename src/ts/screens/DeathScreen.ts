import { Vector2, Vector4 } from "@math.gl/core";
import C2D from "../helpers/C2D";

import Screen from "./Screen";

export default class DeathScreen extends Screen {
    public constructor(context : C2D)
    {
        super(context)
    }

    public override render() : void
    {
        const canvas : HTMLCanvasElement = this.context.canvas;
        this.renderOverlay(canvas);

        const offset : number = 8.0;

        const size : Vector2 = new Vector2(250, 100);
        const pos : Vector2 = new Vector2(
            (canvas.width - size.x) / 2,
            (canvas.height - size.y) / 2
        );

        let color : Vector4 = new Vector4(255.0, 0.0, 0.0, 1.0);
        
        C2D.renderRect(this.context, pos, size, color);
        
        color = new Vector4(0.0, 255.0, 255.0, 1.0);

        pos.add(size.clone().divideScalar(2.0));
        pos.x -= offset * 10.0;
        pos.y += 0.75;
        
        C2D.renderText(this.context, "Game over!", "16px MMRock9", pos, size.x, color);
        
        pos.x -= (offset * 4.0) + (offset / 2);
        pos.y += offset * 3;
        C2D.renderText(this.context, ">Press F5 to try again<", "10px MMRock9", pos, size.x, color);
    }

    private renderOverlay(canvas : HTMLCanvasElement) : void
    {
        C2D.renderRect(
            this.context,
            new Vector2(0.0, 0.0),
            new Vector2(canvas.width, canvas.height),
            new Vector4(0.0, 0.0, 0.0, 0.5)
        );
    }
}