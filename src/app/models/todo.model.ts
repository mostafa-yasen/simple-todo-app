export class Todo {
    title: string
    done: boolean
    created:Date
    _id: string

    constructor(_id:string, title: string, done:boolean, created:Date) {
        this._id = _id
        this.title = title
        this.done = done
        this.created = created || new Date();
    }
}