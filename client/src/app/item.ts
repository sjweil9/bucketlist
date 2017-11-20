export class Item {
    _id: string;
    title: string;
    description: string;
    users: string[];
    createdAt: Date;
    updatedAt: Date;
    checked: boolean;

    constructor() {
        this.title = '';
        this.description = '';
        this.users = [];
    }
}
