import { Colors } from './Colors';
export class Player {
    color: Colors;
    id: number;

    constructor(color: Colors, id: number) {
        this.color = color;
        this.id = id;
    }
}
