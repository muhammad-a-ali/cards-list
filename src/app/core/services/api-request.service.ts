import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiRequestService {
  private apiURL = "https://swapi.dev/api/people/";

  constructor(private httpClient: HttpClient) { }

  /**
   * Sends an `Get` request and returns a strem of people data.
   * @param params The request params object.
   * @return An `Observable` of the response.
   */
  public get(params: any = {}): Observable<any> {
    return this.httpClient.get<any>(this.apiURL, { params: params }).pipe(catchError(this.handleError));
  }


  /**
   * Handles http error response. 
   * @param error The http error response.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
