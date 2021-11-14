export class Todo {
    title: string;
    done: boolean;
    created:Date;

    constructor(title: string, done:boolean, created:Date) {
        this.title = title
        this.done = done
        this.created = created || new Date();
    }
}