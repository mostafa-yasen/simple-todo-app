import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IApiResponse } from "../models/api.response.model";
import { Observable, throwError } from "rxjs";
import { catchError, map, retry } from 'rxjs/operators';


@Injectable()
export class IdentityService {
    constructor(private http: HttpClient) { }

    private _url: String = 'http://localhost:9090/api/v1'
    headers: Array<Object> | null = []

    login(email: String, password: String) { // : Observable<IApiResponse>
        var body = {
            email,
            password
        }
        return this.http.post<IApiResponse>(this._url + '/users/login', body, {observe: 'response'}).pipe(
            retry(1),
            map(response => {
                const token = response.headers.get("jwt-token")
                if (token) {
                    sessionStorage.setItem('jwt-token', token)
                    sessionStorage.setItem('logged-in', 'true')
                } else {
                    sessionStorage.setItem('logged-in', 'false')
                }

                return response.body
            }),
            catchError(this.errorHandler)
        )
    }

    register(email: String, fullName: String, password: String) {
        let body = {
            email, fullName, password
        }
        return this.http.post<IApiResponse>(this._url + '/users/register', body).pipe(
            retry(1),
            map(response => response),
            catchError(this.errorHandler)
        )
    }

    errorHandler(error: HttpErrorResponse) {
        console.log(error)
        if (error.error.message) {
            return throwError(`${error.status} ${error.error.message}`)
        }

        return throwError(`${error.status} ${error.statusText}`)
    }
}
