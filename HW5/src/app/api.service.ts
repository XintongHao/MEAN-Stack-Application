import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const apiURL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }
  /*
  * TODO: This part should have returned the google user's profile in localhost:4200/profile
  * */
  googleLogin(): void {
    const URL = `${apiURL}/auth/google`;
    window.location.assign(URL);
    // const httpOptions = {
    //   headers: new HttpHeaders(
    //     {'Content-Type': 'application/json',
    //                'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    //     })
    // };
    // return this.http.post(URL, httpOptions)
    //   .pipe(
    //     map(this.extractData),
    //     catchError(this.handleError)
    //   );
  }

  getUsers(): Observable<any> {
    const URL = `${apiURL}/userList`;
    return this.http.get(URL)
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };
}
