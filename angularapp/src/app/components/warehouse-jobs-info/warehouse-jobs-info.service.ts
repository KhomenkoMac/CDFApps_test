import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WarehouseJobsInfoService {
  constructor(private readonly _http: HttpClient,  @Inject('API_BASE_URL') private baseUrl?: string) { }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  markBoxAsReceived(boxReference: string): Observable<BoxReceivedResponse> {
    // const FakeResponse : BoxReceivedResponse =  {
    //   jobNumber: "test",
    //   isReceived: true
    // }
    console.log(this.baseUrl);
    
    return this._http.patch<BoxReceivedResponse>(`${this.baseUrl}/WearhouseJobs/${boxReference}/mark-received`, {}).pipe(
      catchError(this.handleError<BoxReceivedResponse>("markBoxAsReceived", undefined))
    )
  }

  updateBoxCondition(boxReference: string, boxCondition: string): Observable<BoxConditionUpdatedResponse>{
    // const FakeResponse : BoxConditionUpdatedResponse =  {
    // }
    return this._http.patch(`${this.baseUrl}/WearhouseJobs/${boxReference}`, {boxReference, boxCondition}).pipe(
      catchError(this.handleError<BoxConditionUpdatedResponse>("updateBoxCondition", undefined))
    )
  }

}

export interface BoxConditionUpdatedResponse{

}

export interface BoxReceivedResponse{
  jobNumber: string;
  isReceived: boolean;
}


