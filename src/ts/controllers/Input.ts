import { Keys } from "../enum/Key";

export default class KeyboardController {
    public static getPseduoKeyCode(code : string) : number|null
    { 
        let keyCode : number|null = null;

        switch (code) {
            case 'KeyW':
                keyCode = Keys.W;

                break;
            case 'KeyA':
                keyCode = Keys.A;

                break;
            case 'KeyS':
                keyCode = Keys.S;    

                break;
            case 'KeyD':
                keyCode = Keys.D;

                break;
            case 'KeyE':
                keyCode = Keys.E;

                break;
        }

        return keyCode;
    }
}