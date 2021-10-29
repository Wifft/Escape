import { PseudoKeyCodes } from "../enum/PseudoKeyCodes";

export default abstract class KeyboardController {
    protected keysDown : Array<boolean> = new Array<boolean>();

    public constructor()
    {
        window.onkeydown = (e : KeyboardEvent) => this.onKeyDown(e);
        window.onkeyup = (e : KeyboardEvent) => this.onKeyUp(e);
    }

    private onKeyDown(e : KeyboardEvent) : void
    {
        const keyCode = this.getPseduoKeyCode(e.code);
        if (keyCode !== null) this.keysDown[keyCode] = true;
    }

    private onKeyUp(e : KeyboardEvent) : void
    {
        const keyCode = this.getPseduoKeyCode(e.code);
        if (keyCode !== null) this.keysDown[keyCode] = false;
    }

    private getPseduoKeyCode(code : string) : number|null
    {
        let keyCode = null;

        switch (code) {
            case 'KeyW':
                keyCode = PseudoKeyCodes.W_KEY;

                break;
            case 'KeyA':
                keyCode = PseudoKeyCodes.A_KEY;

                break;
            case 'KeyS':
                keyCode = PseudoKeyCodes.S_KEY;    

                break;
            case 'KeyD':
                keyCode = PseudoKeyCodes.D_KEY;

                break;
            case 'KeySpace':
                keyCode = PseudoKeyCodes.SPACE_KEY;

                break;
        }

        return keyCode;
    }
}