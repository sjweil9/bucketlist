import { Item } from './item';

export class User {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    items: Item[];

    constructor() {
        this._id = '';
        this.name = '';
        this.items = [];
    }
}
