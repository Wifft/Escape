import C2D from "../helpers/C2D";
import GameScreen from "./GameScreen";

export default abstract class Screen {
    protected context : C2D;
    
    public constructor(context : C2D)
    {
        this.context = context;
    }

    public abstract render(gameScreen? : GameScreen) : void;
}