import { Todo } from "./todo.model";

export interface IApiResponse {
    code: number,
    error_code: string,
    message: string,
    _message: string,
    data: any
}