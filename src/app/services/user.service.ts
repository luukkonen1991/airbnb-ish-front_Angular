import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../models/User';

let httpHeaders = {
    headers: new HttpHeaders({
        'Content-type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userUrl: string = 'http://localhost:5000/api/v1/users';
    token: string;

    constructor(private http: HttpClient) { }

    getAllUsers(limit?: any): Observable<User> {
        let api = this.userUrl;
        let token = sessionStorage.getItem('token');
        let options = {
            params: new HttpParams().set('limit', limit),
            headers: httpHeaders.headers.set('Authorization', `Bearer ${token}`)
        };
        return this.http.get<User>(api, options).pipe(catchError(this.handleError));
    }

    deleteUser(_id: string): Observable<User> {
        const url = `${this.userUrl}/${_id}`;
        let token = sessionStorage.getItem('token');
        httpHeaders.headers = httpHeaders.headers.set('Authorization', `Bearer ${token}`);
        return this.http.delete<User>(url, httpHeaders).pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }
}
