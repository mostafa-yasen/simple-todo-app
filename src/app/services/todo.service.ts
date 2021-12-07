import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { IApiResponse } from "../models/api.response.model";
import { Observable, throwError } from "rxjs";
import { catchError, map, retry } from 'rxjs/operators';
import { Todo } from "../models/todo.model";

@Injectable()
export class TodoService {
    constructor(private http: HttpClient) { }

    private _url: string = 'http://localhost:9090/api/v1/todos'
    private _token: string | null = sessionStorage.getItem('jwt-token')
    private _headers: HttpHeaders = new HttpHeaders({
        "JWT-Token": this._token || "",
        "Content-Type": "application/json"
    })

    getAll() {
        return this.http.get<IApiResponse>(this._url, {
            "headers": this._headers
        })
        .pipe(
            retry(1),
            map(response => response),
            catchError(this.errorHandler)
        )
    }

    insert(item: Todo) {
        return this.http.post<IApiResponse>(
            this._url,
            item,
            {headers: this._headers}
        ).pipe(
            retry(1),
            map(response => response),
            catchError(this.errorHandler)
        )
    }

    update(item: Todo) {
        return this.http.patch<IApiResponse>(this._url + `/${item._id}`, item, {
            headers: this._headers
        })
            .pipe(
                retry(1),
                map(response => response),
                catchError(this.errorHandler)
            )
    }

    delete(itemId: string) {
        return this.http.delete<IApiResponse>(this._url + `/${itemId}`, {headers: this._headers}).pipe(
            retry(1), map(response => response), catchError(this.errorHandler)
        )
    }

    errorHandler(error: HttpErrorResponse) {
        if (error.error.message) {
            return throwError(`${error.status} ${error.error.message}`)
        }
        return throwError(`${error.status} ${error.statusText}`)
    }
}
