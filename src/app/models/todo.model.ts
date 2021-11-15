export class Todo {
    title: string
    done: boolean
    created:Date
    _id: string
    __v:number

    constructor(_id:string, title: string, done:boolean, created:Date, __v:number) {
        this._id = _id
        this.title = title
        this.done = done
        this.created = created || new Date();
        this.__v = __v
    }
}