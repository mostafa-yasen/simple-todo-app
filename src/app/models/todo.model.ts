export class Todo {
    title: string;
    done: boolean;
    created:Date|null;

    constructor(title: string, done:boolean, created:Date|null) {
        this.title = title
        this.done = done
        this.created = created || new Date();
    }
}